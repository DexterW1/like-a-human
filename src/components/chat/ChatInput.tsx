"use client";

import { Textarea } from "../ui/textarea";

type ChatInputProps = {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

export default function ChatInput({
  onSubmit,
  value,
  onChange,
}: ChatInputProps) {
  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // prevent newline
      const form = e.currentTarget.form;
      if (form) {
        form.requestSubmit(); // programmatically submit the form
      }
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <Textarea
        className=" w-full p-2 border rounded  resize-none overflow-y-auto max-h-32"
        value={value}
        placeholder="Say something..."
        onChange={onChange}
        onKeyDown={handleKeyDown}
        rows={1}
      />
    </form>
  );
}
