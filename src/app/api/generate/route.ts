import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { title } = await req.json();
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `You are a project manager assistant. The user wants to do this task: "${title}". 
    Break this down into 3-5 short, actionable subtasks. Format them as a simple list with dashes (-). 
    Keep it professional and technical.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ text });
  } catch (error) {
    return NextResponse.json({ error: "Failed to generate" }, { status: 500 });
  }
}