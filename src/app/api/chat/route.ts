import { google } from "@ai-sdk/google";
import { streamText } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();
  console.log("messages", messages);
  const result = streamText({
    model: google("gemini-2.0-flash-lite"),
    messages,
  });
  console.log("result", result);
  return result.toDataStreamResponse();
}
