import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { WritingStyleType, WRITING_STYLE_ENUM } from "@/types/chat.types";
import {
  personalizedPrompt,
  generalPrompt,
  workPrompt,
} from "./prompts/prompts";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getSystemPrompt(promptStyle: WritingStyleType) {
  switch (promptStyle) {
    case WRITING_STYLE_ENUM.PERSONALIZED:
      return personalizedPrompt;
    case WRITING_STYLE_ENUM.WORK:
      return workPrompt;
    case WRITING_STYLE_ENUM.GENERAL:
      return generalPrompt;
    default:
      return "You are a friendly and helpful assistant.";
  }
}
