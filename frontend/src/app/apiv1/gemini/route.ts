import {streamText ,Message} from "ai"

import {createGoogleGenerativeAI} from "@ai-sdk/google" 
import { initialMessage } from "@/lib/data";

const google =createGoogleGenerativeAI({
    apiKey:process.env.GEMINI_API_KEY || "",
});

export  const runtime ="edge";

const generatedId=()=>Math.random().toString(36).slice(2,15);

const buildGoogleGenAIPrompt =(messages:Message[]):Message[]=>[
    {
        id:generatedId(),
        role:"user",
        content:initialMessage.content
    },
    ...messages.map((message)=>({
        id:message.id || generatedId(),
        role: message.role,
        content: message.content,
    })),
];

export async function POST(request:Request){
    const {messages} =await request.json();
    const stream=await streamText({
        model:google("gemini-pro"),
        messages:buildGoogleGenAIPrompt(messages),
        temperature:0.7,
    });
    return stream?.toDataStreamResponse();
}

export default async function handler(req, res) {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method Not Allowed" });
    }
  
    const response = await fetch("http://localhost:8000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });
  
    const data = await response.json();
    res.status(response.status).json(data);
  }