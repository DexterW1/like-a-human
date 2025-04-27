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
    <div className="flex flex-col w-full h-full max-w-3xl mx-auto stretch overflow-hidden">
      {isEmpty ? (
        <div className="flex flex-col justify-center flex-1 -mt-24 gap-8">
          <div className="space-y-4">
            <p className="md:text-8xl font-bold italic text-center">
              Like a human
            </p>
            <p className="text-center text-lg text-zinc-500 ">
              Paste your text and let AI help you re-write it—so it sounds just
              like a human wrote it. Perfect for making your messages, emails,
              or posts more natural and authentic.
            </p>
          </div>

          <ChatInput
            onChange={handleInputChange}
            onSubmit={handleSubmit}
            value={input}
            status={status}
          />
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-9 flex-1 overflow-y-auto pb-12 pr-4">
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                chatId={message.id}
                role={message.role}
                content={message.content}
                status={status}
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
