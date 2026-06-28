import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { sendJournalEmail } from '@/lib/email';

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('journals')
      .select('*')
      .order('date', { ascending: false });

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data || []);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { date, data: journalData } = body;

    if (!date) {
      return NextResponse.json({ error: 'Date is required' }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin
      .from('journals')
      .upsert([
        {
          date,
          data: journalData || {},
          updated_at: new Date().toISOString(),
        },
      ], { onConflict: 'date' })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Trigger email send
    if (date && journalData) {
      try {
        await sendJournalEmail(date, journalData);
      } catch (emailErr) {
        console.error("Failed to send journal email:", emailErr);
      }
    }

    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    const { error } = await supabaseAdmin
      .from('journals')
      .delete()
      .eq('id', id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
