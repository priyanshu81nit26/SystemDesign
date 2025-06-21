// app/api/chat/route.js (App Router)
const key = process.env.GEMINI_API_KEY;
export async function POST(req) {
    const { message } = await req.json();
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${key}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: message }] }],
      }),
    });
    const data = await response.json();
    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, no response';
  
    return Response.json({ reply });
  }