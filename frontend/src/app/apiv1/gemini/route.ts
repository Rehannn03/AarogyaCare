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
