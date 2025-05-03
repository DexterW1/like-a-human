import { getSystemPrompt } from "@/lib/utils";
import { google } from "@ai-sdk/google";
import { streamText } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages, promptStyle } = await req.json();
  console.log("promptStyle", promptStyle);
  const result = streamText({
    model: google("gemini-2.0-flash-lite"),
    system: getSystemPrompt(promptStyle),
    messages,
  });
  return result.toDataStreamResponse();
}
