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
};
const ChatMessage = ({ chatId, role, content }: ChatMessageProps) => {
  return (
    <motion.div
      className={cn(
        "flex flex-row gap-4 px-4 w-full first-of-type:pt-20",
        role === "assistant" ? "justify-start" : "justify-end"
      )}
      initial={{ y: 5, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}>
      {/* <div>{role === "assistant" ? <Bot /> : <UserIcon />}</div> */}
      {content && typeof content === "string" && (
        <div
          className={cn(
            "text-zinc-800 dark:text-zinc-300 flex flex-col gap-2",
            role === "user" && "bg-input p-3 rounded-3xl"
          )}>
          <Markdown>{content}</Markdown>
        </div>
      )}
    </motion.div>
  );
};

export default ChatMessage;
