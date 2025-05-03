"use client";

import { useChat } from "@ai-sdk/react";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "../ui/button";
import { useState } from "react";
import { Plus } from "lucide-react";

export default function Chat() {
  const [aiThinking, setAiThinking] = useState(false);
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    status,
    setMessages,
  } = useChat({
    onFinish: () => {
      setAiThinking(false);
    },
  });
  const isEmpty = messages.length === 0;
  const handleReset = () => {
    setMessages([]);
  };
  return (
    <AnimatePresence>
      <div className="flex flex-col w-full h-full">
        {!isEmpty && (
          <div className="flex flex-row w-full p-2">
            <Button
              variant={"ghost"}
              onClick={handleReset}
              className="rounded-full">
              <Plus className="h-6 w-6" />
            </Button>
          </div>
        )}

        <div className="flex flex-col h-full w-full mx-auto md:px-0 px-4">
          {isEmpty ? (
            <div className="flex flex-col justify-center -mt-32 flex-1 gap-8 max-w-3xl mx-auto">
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
              <motion.div
                layoutId="chat-input"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className=" rounded-3xl glow-bg-shadow">
                <ChatInput
                  onChange={handleInputChange}
                  onSubmit={handleSubmit}
                  value={input}
                  status={status}
                  setAiThinking={setAiThinking}
                />
              </motion.div>
            </div>
          ) : (
            // WHEN MESSAGES EXIST
            <>
              <div className="flex flex-col flex-1 overflow-y-auto  pb-10 w-full">
                <div className="max-w-3xl mx-auto flex flex-col gap-9 w-full">
                  {messages.map((message, index) => (
                    <ChatMessage
                      key={message.id}
                      chatId={message.id}
                      role={message.role}
                      content={message.content}
                      status={status}
                      isLastMessage={index === messages.length - 1}
                      aiThinking={aiThinking}
                    />
                  ))}
                </div>
              </div>
              <div className="mb-4 max-w-3xl mx-auto w-full ">
                <ChatInput
                  onChange={handleInputChange}
                  onSubmit={handleSubmit}
                  value={input}
                  status={status}
                  setAiThinking={setAiThinking}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </AnimatePresence>
  );
}
