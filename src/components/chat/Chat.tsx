"use client";

import { useChat } from "@ai-sdk/react";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "../ui/button";
import { useRef, useState, useEffect } from "react";
import { Plus } from "lucide-react";

export default function Chat() {
  const [aiThinking, setAiThinking] = useState(false);
  const [inputHeight, setInputHeight] = useState(0);
  const inputRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const updateHeight = () => {
      if (inputRef.current) {
        setInputHeight(inputRef.current.offsetHeight + 32);
      }
    };

    updateHeight();

    // Add resize observer to watch for height changes
    const observer = new ResizeObserver(updateHeight);
    if (inputRef.current) {
      observer.observe(inputRef.current);
    }

    return () => {
      if (inputRef.current) observer.unobserve(inputRef.current);
    };
  }, [input]);

  const isEmpty = messages.length === 0;
  const handleReset = () => {
    setMessages([]);
  };

  const isInitialEmptyRender = useRef(true);

  useEffect(() => {
    isInitialEmptyRender.current = false;
  }, []);

  const shouldAnimate = isEmpty && isInitialEmptyRender.current;

  return (
    <AnimatePresence>
      <div className="flex flex-col w-full h-full relative">
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

        <div className="flex flex-col w-full mx-auto md:px-0 px-4 h-full">
          {isEmpty ? (
            <div className="flex flex-col justify-center -mt-32 flex-1 gap-8 max-w-3xl mx-auto">
              <div className="space-y-4">
                <motion.p
                  className="md:text-8xl text-5xl font-bold italic text-center"
                  initial={shouldAnimate ? { opacity: 0, y: 40 } : false}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}>
                  Like a human
                </motion.p>
                <motion.p
                  className="text-center text-zinc-500 text-sm md:text-lg"
                  initial={shouldAnimate ? { opacity: 0, y: 20 } : false}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.3 }}>
                  Paste your text and let AI help you re-write it—so it sounds
                  just like a human wrote it. Perfect for making your messages,
                  emails, or posts more natural and authentic.
                </motion.p>
              </div>
              <motion.div
                layoutId="chat-input"
                initial={shouldAnimate ? { opacity: 0 } : false}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.5 }}>
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
            <>
              {/* Dynamic padding based on input height */}
              <div
                className="flex flex-col overflow-y-auto w-full h-full"
                style={{ paddingBottom: `${inputHeight + 40}px` }}>
                <div className="max-w-3xl mx-auto flex flex-col gap-9 w-full py-4">
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

              {/* Fixed input at bottom */}
              <motion.div
                ref={inputRef}
                layoutId="chat-input"
                className="fixed bottom-0 left-0 right-0 pb-4 px-4 md:px-0 z-10 bg-background">
                <div className="max-w-3xl mx-auto w-full">
                  <ChatInput
                    onChange={handleInputChange}
                    onSubmit={handleSubmit}
                    value={input}
                    status={status}
                    setAiThinking={setAiThinking}
                  />
                </div>
              </motion.div>
            </>
          )}
        </div>
      </div>
    </AnimatePresence>
  );
}
