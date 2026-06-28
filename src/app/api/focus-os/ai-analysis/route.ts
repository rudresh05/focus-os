import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { format, subDays } from 'date-fns';

export async function GET() {
  const geminiApiKey = process.env.GEMINI_API_KEY;
  if (!geminiApiKey) {
    return NextResponse.json({ 
      error: 'GEMINI_API_KEY is not configured in .env.local on the server.' 
    }, { status: 400 });
  }

  try {
    // 1. Fetch journal entries for the last 7 days
    const today = new Date();
    const startOfPastWeek = subDays(today, 7);
    const startDateStr = format(startOfPastWeek, 'yyyy-MM-dd');
    const endDateStr = format(today, 'yyyy-MM-dd');

    const { data: journalLogs, error: journalError } = await supabaseAdmin
      .from('journals')
      .select('*')
      .gte('date', startDateStr)
      .lte('date', endDateStr)
      .order('date', { ascending: false });

    if (journalError) {
      return NextResponse.json({ error: `Journals fetch error: ${journalError.message}` }, { status: 500 });
    }

    if (!journalLogs || journalLogs.length === 0) {
      return NextResponse.json({ 
        analysis: "### No Data Found\n\nYou haven't logged any daily journal entries in the past 7 days. Log some entries first so Gemini can analyze your output!" 
      });
    }

    // 2. Format logs into a clean text payload for the prompt
    let formattedLogsText = "";
    journalLogs.forEach((log: any) => {
      const date = log.date;
      const d = log.data || {};
      formattedLogsText += `
--- ENTRY DATE: ${date} ---
Stage: ${d.stage || 'None'}
Topic studied: ${d.topic || 'None'}
Work done: ${d.work || 'None'}
Learned: ${d.learned || 'None'}
Built: ${d.built || 'None'}
Coded from memory: ${d.recall || 'None'}
DSA progress: Attempted: ${d.dsaAttempted || '0'}, Solved: ${d.dsaSolved || '0'}
Wins: ${d.wins || 'None'}
Leaks: Time waste: ${d.waste || 'None'}, Avoided: ${d.avoided || 'None'}, Stuck on: ${d.stuck || 'None'}
Reality Check: Standard: ${d.standard || 'None'}, Holding pattern: ${d.holding || 'None'}
Metrics: Deep work: ${d.deepWork || '0'}h, Gym: ${d.gym || 'None'}, DSA solved metric: ${d.dsa || '0'}, Topics done: ${d.topics || '0'}, Energy: ${d.energy || 'None'}/10
Mood: ${d.mood || 'None'}
Tomorrow plan: ${d.tomorrow || 'None'}
Non-negotiables: 1. ${d.obj1 || 'None'}, 2. ${d.obj2 || 'None'}, 3. ${d.obj3 || 'None'}
Key Lesson: ${d.lesson || 'None'}
Pattern: ${d.pattern || 'None'}
Honest sentence to self: "${d.honest || 'None'}"
`;
    });

    // 3. Compose Gemini AI prompt
    const prompt = `
You are Antigravity, a high-performance executive coach and engineering auditor. 
Analyze the following daily journal logs representing the user's progress over the past week.

Focus areas for analysis:
1. **Yesterday's Audit**: Critique what they did on their most recent day. Did they focus on high-impact tasks?
2. **Weekly Performance**: Summarize their overall consistency, growth velocity, and highlight major wins.
3. **Leaks & Anti-Patterns**: Identify major time leaks, avoided tasks, and behavioral bottlenecks holding them back.
4. **Reality Check**: Give a brutal, honest assessment on whether their weekly output matches their standard of Rs 1L/month and long-term financial freedom.
5. **Directives for Next Week**: Provide 3 clear, actionable objectives for the coming days to maintain momentum or break out of bad patterns.

Be direct, highly concise, and do not sugarcoat critiques. Format your response cleanly using Markdown.

Daily Logs Data:
${formattedLogsText}
`;

    // 4. Send request directly to Gemini API via Fetch
    const geminiUrl = `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash-lite:generateContent?key=${geminiApiKey}`;
    
    const response = await fetch(geminiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ]
      })
    });

    const resJson = await response.json();

    if (!response.ok) {
      return NextResponse.json({ 
        error: `Gemini API Error: ${resJson.error?.message || response.statusText}` 
      }, { status: response.status });
    }

    const aiText = resJson.candidates?.[0]?.content?.parts?.[0]?.text || "Failed to generate audit text.";
    
    return NextResponse.json({ analysis: aiText });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
