"use client";

import { useChat } from "@ai-sdk/react";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";
import { motion } from "framer-motion";
import { Button } from "../ui/button";

export default function Chat() {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    status,
    setMessages,
  } = useChat();

  const isEmpty = messages.length === 0;
  const handleReset = () => {
    setMessages([]);
  };
  return (
    <div className="flex flex-col w-full h-full">
      {!isEmpty && <div>project header</div>}

      <div className="flex flex-col h-full w-full mx-auto md:px-0 px-4 max-w-3xl">
        {isEmpty ? (
          <div className="flex flex-col justify-center -mt-32 flex-1 gap-8">
            <div className="space-y-4">
              <p className="md:text-8xl text-5xl font-bold italic text-center">
                Like a human
              </p>
              <p className="text-center text-zinc-500 text-sm md:text-lg">
                Paste your text and let AI help you re-write it—so it sounds
                just like a human wrote it. Perfect for making your messages,
                emails, or posts more natural and authentic.
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
            <div className="flex flex-col flex-1 overflow-y-auto pb-10">
              <div className="max-w-3xl mx-auto flex flex-col gap-9">
                {messages.map((message, index) => (
                  <ChatMessage
                    key={message.id}
                    chatId={message.id}
                    role={message.role}
                    content={message.content}
                    status={status}
                    isLastMessage={index === messages.length - 1}
                  />
                ))}
              </div>
            </div>
            <motion.div className="mb-4 max-w-3xl mx-auto w-full">
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
    </div>
  );
}
