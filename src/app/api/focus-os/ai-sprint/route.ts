import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const geminiApiKey = process.env.GEMINI_API_KEY;
  if (!geminiApiKey) {
    return NextResponse.json({ 
      error: 'GEMINI_API_KEY is not configured in .env.local on the server.' 
    }, { status: 400 });
  }

  try {
    const { name, goal, tasks } = await request.json();

    if (!name || !goal) {
      return NextResponse.json({ error: 'Sprint name and goal are required' }, { status: 400 });
    }

    const prompt = `
You are Antigravity, an elite technical project manager and high-performance engineering advisor. 
Provide a tactical blueprint and milestone breakdown for the following active sprint mission:

Sprint Name: ${name}
Primary Objective: ${goal}
Daily Protocols: ${Array.isArray(tasks) ? tasks.join(', ') : 'None'}

Please formulate a highly actionable, concise output with:
1. **Critical Milestones**: 3 key phase checkpoints (e.g. Phase 1: Setup & Core Logic, Phase 2: Refactoring & Testing, Phase 3: Integration & Launch) tailored to this specific goal.
2. **Daily Execution Adjustments**: Suggestions on how to optimize their daily protocols (${Array.isArray(tasks) ? tasks.join(', ') : 'None'}) for maximum efficiency.
3. **Common Roadblocks**: 2 specific traps/bugs or conceptual hurdles they are likely to encounter when studying or building this, and how to avoid them.
4. **Final Directive**: One high-impact sentence to align their daily focus.

Keep the tone highly professional, direct, and encouraging. Use clean Markdown formatting.
`;

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

    const aiText = resJson.candidates?.[0]?.content?.parts?.[0]?.text || "Failed to generate sprint advisor blueprint.";
    
    return NextResponse.json({ advice: aiText });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
