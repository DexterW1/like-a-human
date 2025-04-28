"use client";

import { Button } from "../ui/button";
import { Briefcase, Feather, SendHorizontal, UserRound } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import { ChatRequestOptions } from "ai";
import { useState } from "react";
import { WRITING_STYLE_ENUM, WritingStyleType } from "@/types/chat.types";
import { Tooltip, TooltipTrigger } from "../ui/tooltip";
import { TooltipContent } from "@radix-ui/react-tooltip";

type ChatInputProps = {
  onSubmit: (
    event?: { preventDefault?: () => void },
    chatRequestOptions?: ChatRequestOptions
  ) => void;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  status: string;
  setAiThinking: (value: boolean) => void;
};

export default function ChatInput({
  onSubmit,
  value,
  onChange,
  status,
  setAiThinking,
}: ChatInputProps) {
  const [promptStyle, setPromptStyle] = useState<WritingStyleType>(
    WRITING_STYLE_ENUM.PERSONALIZED
  );
  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      const form = e.currentTarget.form;
      if (form) {
        form.requestSubmit();
      }
      setAiThinking(true);
    }
  }

  return (
    <div className="flex flex-col dark:bg-input/30 rounded-3xl py-3 px-4 border">
      <form
        onSubmit={(event) => {
          onSubmit(event, {
            body: {
              promptStyle,
            },
          });
        }}>
        <Textarea
          className="w-full p-2 rounded-2xl resize-none overflow-y-auto max-h-52 min-h-12 fs-visible:outline-none focus-visible:ring-0 focus-visible:border-ring-0 border-0 bg-transparent dark:bg-transparent mb-2"
          value={value}
          placeholder="Say something..."
          onChange={onChange}
          onKeyDown={handleKeyDown}
          rows={1}
        />
        <div className="flex flex-row items-center justify-between">
          <ToggleGroup
            className="gap-2"
            type="single"
            value={promptStyle}
            onValueChange={(value) => {
              if (value) setPromptStyle(value as WritingStyleType);
            }}>
            <ToggleGroupItem
              className="rounded-md border"
              value={WRITING_STYLE_ENUM.PERSONALIZED}
              aria-label="Toggle PERSONALIZED">
              <UserRound size={16} />
            </ToggleGroupItem>
            <ToggleGroupItem
              className="rounded-md border"
              value={WRITING_STYLE_ENUM.WORK}
              aria-label="Toggle WORK">
              <Briefcase size={16} />
            </ToggleGroupItem>
            <ToggleGroupItem
              className="rounded-md border"
              value={WRITING_STYLE_ENUM.PROFESSIONAL}
              aria-label="Toggle PROFESSIONAL">
              <Feather size={16} />
            </ToggleGroupItem>
          </ToggleGroup>

          <Button type="submit" disabled={!value || status !== "ready"}>
            <SendHorizontal className="-rotate-90" />
          </Button>
        </div>
      </form>
    </div>
  );
}
