import { cn } from "@/lib/utils";
import { UIMessage } from "ai";
import { motion } from "framer-motion";
import { Bot, Copy, CopyCheck, UserIcon } from "lucide-react";
import React, { ReactNode } from "react";
import Markdown from "react-markdown";
import { Button } from "../ui/button";
import CopyCheckButton from "./CopycheckButton";

type ChatMessageProps = {
  message: UIMessage;
  // chatId: string;
  // role: string;
  // content: string | ReactNode;
  status: string;
  isLastMessage?: boolean;
  aiThinking: boolean;
};
const ChatMessage = ({
  message,
  status,
  isLastMessage,
  aiThinking,
}: ChatMessageProps) => {
  console.log("message", message);
  const shouldAnimate =
    isLastMessage && aiThinking && message.role === "assistant";
  const copyToClipboard = () => {
    if (typeof message.content === "string") {
      navigator.clipboard.writeText(message.content);
    }
  };
  return (
    <motion.div
      className={cn(
        "flex flex-row items-center gap-4 px-4 w-full first-of-type:pt-12",
        message.role === "assistant" ? "justify-start" : "justify-end"
      )}
      initial={{ y: 5, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}>
      {message.role === "assistant" && (
        <CopyCheckButton copyToClipboard={copyToClipboard} />
      )}

      {message.content && typeof message.content === "string" && (
        <div
          className={cn(
            "text-zinc-800 dark:text-zinc-300 flex flex-col gap-2 relative",
            message.role === "user" &&
              "bg-input p-4 rounded-3xl sm:max-w-md max-w-full"
          )}>
          {shouldAnimate ? (
            <div className="flex flex-row items-center gap-2">
              <div className="h-4 w-4 animate-pulse bg-white rounded-full" />
              <div className="h-4 w-4 animate-pulse bg-white rounded-full" />
              <div className="h-4 w-4 animate-pulse bg-white rounded-full" />
            </div>
          ) : (
            <Markdown>{message.content}</Markdown>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default React.memo(ChatMessage);
