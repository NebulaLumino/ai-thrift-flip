import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY, baseURL: "https://api.deepseek.com/v1" });
export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();
    const completion = await client.chat.completions.create({
      model: "deepseek-chat",
      messages: [{ role: "user", content: `You are a thrift flip expert. Transform secondhand items for: ${prompt}. Include sourcing tips, DIY alteration ideas, estimated flip value, materials needed, and step-by-step transformation guide.` }],
      max_tokens: 600,
    });
    return NextResponse.json({ result: completion.choices[0].message.content });
  } catch (e: any) { return NextResponse.json({ error: e.message }, { status: 500 }); }
}
