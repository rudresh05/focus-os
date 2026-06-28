import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { format, subDays, startOfWeek, endOfWeek, parseISO } from 'date-fns';

export async function GET(request: Request) {
  // Simple auth check to make sure cron or admin is triggering it
  // Vercel Cron sends a specific authorization header: Bearer <CRON_SECRET>
  // Or we can check if it has a custom query parameter or CRON_SECRET for security
  const { searchParams } = new URL(request.url);
  const bypassAuth = searchParams.get('key') === process.env.CRON_SECRET;
  const authHeader = request.headers.get('authorization');
  
  if (process.env.NODE_ENV === 'production' && !bypassAuth && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized request' }, { status: 401 });
  }

  try {
    // 1. Fetch user's email digest preference from database
    const { data: settingData, error: settingError } = await supabaseAdmin
      .from('focus_settings')
      .select('*')
      .eq('key', 'emailUpdates')
      .maybeSingle();

    if (settingError) {
      return NextResponse.json({ error: `Settings fetch error: ${settingError.message}` }, { status: 500 });
    }

    const emailUpdatesEnabled = settingData ? Boolean(settingData.value) : false;

    if (!emailUpdatesEnabled) {
      return NextResponse.json({ message: 'Weekly email digest is disabled in settings.' });
    }

    // Get Admin Email to send the digest to
    const recipient = process.env.NEXT_PUBLIC_ADMIN_EMAIL || process.env.ADMIN_EMAIL;
    if (!recipient) {
      return NextResponse.json({ error: 'Recipient email (NEXT_PUBLIC_ADMIN_EMAIL) is not configured.' }, { status: 500 });
    }

    // 2. Fetch Active Sprint
    const { data: sprintData, error: sprintError } = await supabaseAdmin
      .from('focus_sprints')
      .select('*')
      .eq('is_active', true)
      .maybeSingle();

    // 3. Fetch Tracking data for the past 7 days
    const today = new Date();
    const startOfPastWeek = subDays(today, 7);
    const startDateStr = format(startOfPastWeek, 'yyyy-MM-dd');
    const endDateStr = format(today, 'yyyy-MM-dd');

    const { data: trackingData, error: trackingError } = await supabaseAdmin
      .from('focus_tracking')
      .select('*')
      .gte('date', startDateStr)
      .lte('date', endDateStr)
      .order('date', { ascending: true });

    if (trackingError) {
      return NextResponse.json({ error: `Tracking fetch error: ${trackingError.message}` }, { status: 500 });
    }

    // 4. Calculate weekly statistics
    const logs = trackingData || [];
    const totalDaysTracked = logs.length;
    const successfulDays = logs.filter(day => day.score >= 80).length;
    const weeklyIntegrity = totalDaysTracked > 0 ? Math.round((successfulDays / totalDaysTracked) * 100) : 0;
    
    const averageScore = totalDaysTracked > 0 
      ? Math.round(logs.reduce((sum, day) => sum + day.score, 0) / totalDaysTracked) 
      : 0;

    // Compose HTML Email Content
    const titleText = sprintData ? `Sprint: ${sprintData.name}` : 'Weekly Progress Report';
    
    let logsHtml = '';
    logs.forEach(log => {
      const dateLabel = format(parseISO(log.date), 'EEEE, MMM dd');
      const statusText = log.score >= 80 ? 'Fulfilled (Success)' : 'Missed';
      const statusColor = log.score >= 80 ? '#10B981' : '#EF4444';
      
      logsHtml += `
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 12px; font-size: 14px; color: #475569;">${dateLabel}</td>
          <td style="padding: 12px; font-size: 14px; font-weight: bold; color: #0f172a; text-align: center;">${log.score}%</td>
          <td style="padding: 12px; font-size: 13px; font-weight: bold; color: ${statusColor}; text-align: right;">${statusText}</td>
        </tr>
      `;
    });

    if (logs.length === 0) {
      logsHtml = `
        <tr>
          <td colspan="3" style="padding: 24px; text-align: center; color: #94a3b8; font-size: 14px; font-style: italic;">
            No daily logs tracked this week.
          </td>
        </tr>
      `;
    }

    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Focus OS Weekly Digest</title>
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; padding: 24px; margin: 0;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);">
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #2563eb, #7c3aed); padding: 32px 24px; text-align: center;">
              <span style="font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.3em; color: rgba(255,255,255,0.7); display: block; margin-bottom: 8px;">Focus OS Intelligence</span>
              <h1 style="color: #ffffff; margin: 0; font-size: 26px; font-weight: 900; letter-spacing: -0.03em;">WEEKLY DIGEST</h1>
            </div>

            <!-- Main Content -->
            <div style="padding: 32px 24px;">
              <!-- Sprint Section -->
              ${sprintData ? `
                <div style="margin-bottom: 28px; padding-bottom: 20px; border-bottom: 1px dashed #e2e8f0;">
                  <span style="font-size: 10px; font-weight: bold; text-transform: uppercase; color: #2563eb; tracking-wider: 0.1em;">Active Protocol</span>
                  <h3 style="margin: 4px 0 8px 0; font-size: 18px; font-weight: 800; color: #0f172a;">${sprintData.name}</h3>
                  <p style="margin: 0; font-size: 14px; color: #64748b; font-weight: 500; line-height: 1.5;"><strong>Goal:</strong> ${sprintData.goal}</p>
                </div>
              ` : `
                <div style="margin-bottom: 28px; padding: 16px; background-color: #f1f5f9; border-radius: 12px; text-align: center;">
                  <p style="margin: 0; font-size: 14px; color: #64748b; font-weight: bold;">No active mission/sprint configured currently.</p>
                </div>
              `}

              <!-- Stats Cards -->
              <div style="display: grid; grid-template-cols: 1fr 1fr; gap: 16px; margin-bottom: 32px;">
                <div style="background-color: #eff6ff; border: 1px solid #bfdbfe; border-radius: 12px; padding: 16px; text-align: center;">
                  <span style="font-size: 10px; font-weight: 800; text-transform: uppercase; color: #1e3a8a; display: block; margin-bottom: 4px;">Integrity</span>
                  <span style="font-size: 28px; font-weight: 900; color: #1d4ed8; display: block;">${weeklyIntegrity}%</span>
                </div>
                <div style="background-color: #f5f3ff; border: 1px solid #ddd6fe; border-radius: 12px; padding: 16px; text-align: center;">
                  <span style="font-size: 10px; font-weight: 800; text-transform: uppercase; color: #4c1d95; display: block; margin-bottom: 4px;">Avg Score</span>
                  <span style="font-size: 28px; font-weight: 900; color: #6d28d9; display: block;">${averageScore}%</span>
                </div>
              </div>

              <!-- Daily Summary Table -->
              <h4 style="margin: 0 0 12px 0; font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em; color: #64748b;">Daily Breakdown</h4>
              <table style="width: 100%; border-collapse: collapse;">
                <thead>
                  <tr style="border-bottom: 2px solid #e2e8f0; text-align: left;">
                    <th style="padding: 10px 12px; font-size: 11px; font-weight: bold; text-transform: uppercase; color: #94a3b8;">Date</th>
                    <th style="padding: 10px 12px; font-size: 11px; font-weight: bold; text-transform: uppercase; color: #94a3b8; text-align: center;">Daily Score</th>
                    <th style="padding: 10px 12px; font-size: 11px; font-weight: bold; text-transform: uppercase; color: #94a3b8; text-align: right;">Status</th>
                  </tr>
                </thead>
                <tbody>
                  ${logsHtml}
                </tbody>
              </table>
            </div>

            <!-- Footer -->
            <div style="background-color: #f8fafc; padding: 24px; text-align: center; border-top: 1px solid #e2e8f0;">
              <p style="margin: 0; font-size: 11px; color: #94a3b8; font-weight: 500;">
                Focus OS • Sync Link Secure
              </p>
              <p style="margin: 8px 0 0 0; font-size: 10px; color: #cbd5e1;">
                If you wish to change your notification preferences, update your settings in the Focus OS Workstation.
              </p>
            </div>
          </div>
        </body>
      </html>
    `;

    // 5. Send email via Resend REST API
    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      return NextResponse.json({ error: 'RESEND_API_KEY is not configured.' }, { status: 500 });
    }

    const senderEmail = process.env.SENDER_EMAIL || 'onboarding@resend.dev';

    const mailRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: `Focus OS <${senderEmail}>`,
        to: recipient,
        subject: `Weekly Performance Digest: ${weeklyIntegrity}% Integrity`,
        html: emailHtml,
      }),
    });

    const mailData = await mailRes.json();

    if (!mailRes.ok) {
      return NextResponse.json({ error: 'Resend API error', details: mailData }, { status: mailRes.status });
    }

    return NextResponse.json({ success: true, message: 'Weekly digest email dispatched successfully.', data: mailData });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
