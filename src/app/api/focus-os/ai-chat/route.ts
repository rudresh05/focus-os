import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const geminiApiKey = process.env.GEMINI_API_KEY;
  if (!geminiApiKey) {
    return NextResponse.json({ 
      error: 'GEMINI_API_KEY is not configured in .env.local on the server.' 
    }, { status: 400 });
  }

  try {
    const { history } = await request.json();

    if (!history || !Array.isArray(history)) {
      return NextResponse.json({ error: 'Chat history array is required' }, { status: 400 });
    }

    // Map history to Gemini's format: { role: 'user' | 'model', parts: [{ text: '...' }] }
    // Note: Gemini uses 'model' instead of 'assistant'
    const contents = history.map((msg: any) => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [
        {
          text: msg.text
        }
      ]
    }));

    const geminiUrl = `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash-lite:generateContent?key=${geminiApiKey}`;

    const response = await fetch(geminiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ contents })
    });

    const resJson = await response.json();

    if (!response.ok) {
      return NextResponse.json({ 
        error: `Gemini API Error: ${resJson.error?.message || response.statusText}` 
      }, { status: response.status });
    }

    const aiText = resJson.candidates?.[0]?.content?.parts?.[0]?.text || "No response received.";
    
    return NextResponse.json({ text: aiText });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
