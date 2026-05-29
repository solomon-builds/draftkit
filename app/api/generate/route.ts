import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const { description, businessType } = await req.json();

  if (!description || description.length < 10) {
    return NextResponse.json({ error: 'Please describe the process in more detail' }, { status: 400 });
  }

  const Groq = (await import('groq-sdk')).default;
  const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

  const prompt = `You are an expert operations writer for ${businessType || 'service'} businesses.

Write a professional Standard Operating Procedure (SOP) document for the following process:
"${description}"

Format the SOP as follows:
- Title: [Clear SOP title]
- Purpose: [1-2 sentence purpose statement]
- Required Tools/Materials: [bullet list]
- Safety Notes: [any relevant safety items, or "N/A"]
- Procedure: [numbered steps, each clear and actionable, 6-12 steps]
- Quality Check: [2-3 verification points]

Write in clear, simple language a field technician can follow. Be specific and practical.`;

  const completion = await groq.chat.completions.create({
    model: 'llama-3.1-8b-instant',
    messages: [{ role: 'user', content: prompt }],
    max_tokens: 1000,
    temperature: 0.3,
  });

  const sop = completion.choices[0]?.message?.content || '';
  return NextResponse.json({ sop });
}
