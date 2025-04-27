"use client";

import { useChat } from "@ai-sdk/react";
import ChatInput from "./ChatInput";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, status } =
    useChat();
  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      {messages.map((message) => (
        <div key={message.id} className="whitespace-pre-wrap">
          {message.role === "user" ? "User: " : "AI: "}
          {message.parts.map((part, i) => {
            switch (part.type) {
              case "text":
                return <div key={`${message.id}-${i}`}>{part.text}</div>;
            }
          })}
        </div>
      ))}
      <ChatInput
        onChange={handleInputChange}
        onSubmit={handleSubmit}
        value={input}
        status={status}
      />
    </div>
  );
}
