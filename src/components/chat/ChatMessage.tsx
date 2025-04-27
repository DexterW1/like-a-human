import { cn } from "@/lib/utils";
import { UIMessage } from "ai";
import { motion } from "framer-motion";
import { Bot, UserIcon } from "lucide-react";
import React, { ReactNode } from "react";
import Markdown from "react-markdown";

type ChatMessageProps = {
  chatId: string;
  role: string;
  content: string | ReactNode;
  status: string;
};
const ChatMessage = ({ chatId, role, content, status }: ChatMessageProps) => {
  return (
    <motion.div
      className={cn(
        "flex flex-row gap-4 px-4 w-full first-of-type:pt-20",
        role === "assistant" ? "justify-start" : "justify-end"
      )}
      initial={{ y: 5, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}>
      {content && typeof content === "string" && (
        <div
          className={cn(
            "text-zinc-800 dark:text-zinc-300 flex flex-col gap-2",
            role === "user" && "bg-input p-4 rounded-3xl max-w-md"
          )}>
          {status === "submitted" && role === "assistant" && (
            <div className="flex flex-row items-center gap-2">
              <p className="text-sm text-zinc-500">AI is thinking...</p>
            </div>
          )}
          <Markdown>{content}</Markdown>
        </div>
      )}
    </motion.div>
  );
};

export default ChatMessage;
