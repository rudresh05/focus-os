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
    // 1. Fetch journals for the past 7 days
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
      return NextResponse.json({ error: journalError.message }, { status: 500 });
    }

    if (!journalLogs || journalLogs.length === 0) {
      return NextResponse.json({ 
        error: "No daily journals logged in the past 7 days. Complete at least one journal first." 
      }, { status: 400 });
    }

    // 2. Format logs text
    let formattedLogsText = "";
    journalLogs.forEach((log: any) => {
      const date = log.date;
      const d = log.data || {};
      formattedLogsText += `
Date: ${date}
Topic studied: ${d.topic || 'None'}
Work done: ${d.work || 'None'}
Learned: ${d.learned || 'None'}
Built: ${d.built || 'None'}
Wins: ${d.wins || 'None'}
Leaks: Time waste: ${d.waste || 'None'}, Avoided: ${d.avoided || 'None'}, Stuck on: ${d.stuck || 'None'}
Reality Check Standard: ${d.standard || 'None'}, Holding pattern: ${d.holding || 'None'}
Metrics: Deep work: ${d.deepWork || '0'}h, Gym: ${d.gym || 'None'}, DSA solved: ${d.dsa || '0'}, Energy: ${d.energy || 'None'}/10
`;
    });

    const prompt = `
You are Antigravity, an elite executive coach. 
Analyze the user's daily journal logs from the past week and generate a drafted Weekly Reflection summary.

Daily Logs Data:
${formattedLogsText}

Analyze this and output a JSON object containing:
- whatWorked: A brief, clear summary of their wins and effective habits this week.
- whatFailed: A brief summary of where they fell short (tasks skipped, time wasted, blockages).
- biggestDistraction: The main distraction or time leak identified from their logs.
- nextWeekFocus: A clear, single-sentence directive focus for next week.
`;

    // 3. Request Gemini with JSON schema output
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
        ],
        generationConfig: {
          responseMimeType: "application/json",
          responseSchema: {
            type: "OBJECT",
            properties: {
              whatWorked: { type: "STRING" },
              whatFailed: { type: "STRING" },
              biggestDistraction: { type: "STRING" },
              nextWeekFocus: { type: "STRING" }
            },
            required: ["whatWorked", "whatFailed", "biggestDistraction", "nextWeekFocus"]
          }
        }
      })
    });

    const resJson = await response.json();

    if (!response.ok) {
      return NextResponse.json({ 
        error: `Gemini API Error: ${resJson.error?.message || response.statusText}` 
      }, { status: response.status });
    }

    const jsonText = resJson.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!jsonText) {
      return NextResponse.json({ error: "Failed to extract draft output." }, { status: 500 });
    }

    const draft = JSON.parse(jsonText);
    return NextResponse.json(draft);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
