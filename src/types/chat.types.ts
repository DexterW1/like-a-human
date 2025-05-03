export const WRITING_STYLE_ENUM = {
  PERSONALIZED: "personalized",
  WORK: "work",
  GENERAL: "general",
} as const;

export type WritingStyleType =
  (typeof WRITING_STYLE_ENUM)[keyof typeof WRITING_STYLE_ENUM];
