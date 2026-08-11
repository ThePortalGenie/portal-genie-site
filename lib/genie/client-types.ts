export type GenieSource = {
  title: string;
  url: string;
};

export type GenieChatSuccessResponse = {
  answer: string;
  sources: GenieSource[];
};

export type GenieChatMessageRole = "user" | "assistant";

export type GenieChatMessage = {
  id: string;
  role: GenieChatMessageRole;
  content: string;
  sources?: GenieSource[];
  isError?: boolean;
  isStreaming?: boolean;
  isInterrupted?: boolean;
};
