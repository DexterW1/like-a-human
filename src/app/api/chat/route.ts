import { getSystemPrompt } from "@/lib/utils";
import { google } from "@ai-sdk/google";
import { streamText, tool } from "ai";
import { z } from "zod";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages, promptStyle } = await req.json();
  console.log("promptStyle", promptStyle);
  const result = streamText({
    model: google("gemini-2.0-flash-lite"),
    system: getSystemPrompt(promptStyle),
    tools: {
      weather: tool({
        description: "Get the weather in a location",
        parameters: z.object({
          location: z.string().describe("The location to get the weather for"),
        }),
        execute: async ({ location }) => ({
          location,
          temperature: 72 + Math.floor(Math.random() * 21) - 10,
        }),
      }),
    },
    maxSteps: 5,
    messages,
  });
  return result.toDataStreamResponse();
}
