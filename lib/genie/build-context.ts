import "server-only";

import { GENIE_MAX_CONTEXT_CHARS } from "@/config/genie";
import type { RetrievedArticle } from "@/lib/genie/types";

function truncateMarkdown(markdown: string, maxChars: number): string {
  if (markdown.length <= maxChars) {
    return markdown;
  }

  return `${markdown.slice(0, maxChars).trimEnd()}\n\n[Content truncated for length.]`;
}

/**
 * Formats retrieved articles into a single context block for OpenAI.
 * Respects a total character budget so context stays bounded as the KB grows.
 */
export function buildKnowledgeContext(articles: RetrievedArticle[]): string {
  if (articles.length === 0) {
    return "";
  }

  const perArticleBudget = Math.max(
    500,
    Math.floor(GENIE_MAX_CONTEXT_CHARS / articles.length),
  );

  let remainingBudget = GENIE_MAX_CONTEXT_CHARS;
  const sections: string[] = [];

  for (const article of articles) {
    const budget = Math.min(perArticleBudget, remainingBudget);
    if (budget <= 0) {
      break;
    }

    const body = truncateMarkdown(article.markdown, budget);
    remainingBudget -= body.length;

    sections.push(
      [
        `## ${article.title}`,
        `Category: ${article.category}`,
        `URL: ${article.url}`,
        "",
        body,
      ].join("\n"),
    );
  }

  return sections.join("\n\n---\n\n");
}
