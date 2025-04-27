"use client";

import { useChat } from "@ai-sdk/react";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";
import { motion } from "framer-motion";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, status } =
    useChat();

  const isEmpty = messages.length === 0;

  return (
    <div className="flex flex-col w-full h-full max-w-3xl mx-auto stretch">
      {isEmpty ? (
        <div className="flex flex-col justify-center flex-1">
          <h1 className="text-2xl font-bold mb-6">Start a conversation</h1>
          <motion.div>
            <ChatInput
              onChange={handleInputChange}
              onSubmit={handleSubmit}
              value={input}
              status={status}
            />
          </motion.div>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-9 flex-1 overflow-y-auto pb-12">
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                chatId={message.id}
                role={message.role}
                content={message.content}
              />
            ))}
          </div>
          <motion.div className="mb-4">
            <ChatInput
              onChange={handleInputChange}
              onSubmit={handleSubmit}
              value={input}
              status={status}
            />
          </motion.div>
        </>
      )}
    </div>
  );
}
