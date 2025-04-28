import { cn } from "@/lib/utils";
import { UIMessage } from "ai";
import { motion } from "framer-motion";
import { Bot, Copy, CopyCheck, UserIcon } from "lucide-react";
import React, { ReactNode } from "react";
import Markdown from "react-markdown";
import { Button } from "../ui/button";
import CopyCheckButton from "./CopycheckButton";

type ChatMessageProps = {
  chatId: string;
  role: string;
  content: string | ReactNode;
  status: string;
  isLastMessage?: boolean;
  aiThinking: boolean;
};
const ChatMessage = ({
  chatId,
  role,
  content,
  status,
  isLastMessage,
  aiThinking,
}: ChatMessageProps) => {
  const shouldAnimate = isLastMessage && aiThinking && role === "assistant";
  const copyToClipboard = () => {
    if (typeof content === "string") {
      navigator.clipboard.writeText(content);
    }
  };
  return (
    <motion.div
      className={cn(
        "flex flex-row items-center gap-4 px-4 w-full first-of-type:pt-16",
        role === "assistant" ? "justify-start" : "justify-end"
      )}
      initial={{ y: 5, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}>
      {role === "assistant" && (
        <CopyCheckButton copyToClipboard={copyToClipboard} />
      )}

      {content && typeof content === "string" && (
        <div
          className={cn(
            "text-zinc-800 dark:text-zinc-300 flex flex-col gap-2 relative",
            role === "user" && "bg-input p-4 rounded-3xl max-w-md"
          )}>
          {shouldAnimate && (
            <div className="flex flex-row items-center gap-2">
              <div className="h-4 w-4 animate-pulse bg-white rounded-full" />
            </div>
          )}
          <Markdown>{content}</Markdown>
        </div>
      )}
    </motion.div>
  );
};

export default ChatMessage;
