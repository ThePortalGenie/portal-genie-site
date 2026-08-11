export type GenieSource = {
  title: string;
  url: string;
};

export type GenieChatSuccessResponse = {
  answer: string;
  sources: GenieSource[];
};

export type GenieErrorResponse = {
  error: string;
  code: string;
};

export type RetrievedArticle = {
  title: string;
  url: string;
  category: string;
  markdown: string;
  score: number;
};

export type KnowledgeRetrievalResult =
  | { relevant: false; articles: [] }
  | { relevant: true; articles: RetrievedArticle[] };
