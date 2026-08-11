import "server-only";

import {
  GENIE_MAX_RETRIEVED_ARTICLES,
  GENIE_MIN_RELEVANCE_SCORE,
} from "@/config/genie";
import type { KnowledgeArticle } from "@/content/knowledge/types";
import { getBotKnowledgeWithContent } from "@/lib/knowledge/load-article";
import { getResourcesUrlPath } from "@/lib/knowledge/paths";
import type { KnowledgeRetrievalResult, RetrievedArticle } from "@/lib/genie/types";

const STOP_WORDS = new Set([
  "a",
  "an",
  "and",
  "are",
  "as",
  "at",
  "be",
  "can",
  "do",
  "does",
  "for",
  "how",
  "i",
  "in",
  "is",
  "it",
  "me",
  "my",
  "of",
  "or",
  "the",
  "to",
  "what",
  "when",
  "where",
  "who",
  "with",
  "you",
  "your",
]);

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, " ")
    .split(/\s+/)
    .filter((word) => word.length >= 2 && !STOP_WORDS.has(word));
}

function countTokenOverlap(queryTokens: string[], fieldTokens: Set<string>): number {
  let matches = 0;

  for (const token of queryTokens) {
    if (fieldTokens.has(token)) {
      matches += 1;
    }
  }

  return matches;
}

function scoreArticle(
  queryLower: string,
  queryTokens: string[],
  article: KnowledgeArticle,
): number {
  let score = 0;

  for (const keyword of article.keywords) {
    const normalisedKeyword = keyword.toLowerCase().trim();
    if (normalisedKeyword.length >= 2 && queryLower.includes(normalisedKeyword)) {
      score += 10;
    }
  }

  const titleTokens = new Set(tokenize(article.title));
  score += countTokenOverlap(queryTokens, titleTokens) * 8;

  const categoryLabel = article.category.replace(/-/g, " ");
  if (queryLower.includes(categoryLabel)) {
    score += 6;
  } else {
    const categoryTokens = new Set(tokenize(categoryLabel));
    score += countTokenOverlap(queryTokens, categoryTokens) * 3;
  }

  const summaryTokens = new Set(tokenize(article.summary));
  score += countTokenOverlap(queryTokens, summaryTokens) * 4;

  const descriptionTokens = new Set(tokenize(article.description));
  score += countTokenOverlap(queryTokens, descriptionTokens) * 3;

  const contentTokens = new Set(tokenize(article.markdown));
  const contentMatches = countTokenOverlap(queryTokens, contentTokens);
  score += Math.min(contentMatches, 10);

  return score;
}

function toRetrievedArticle(
  article: KnowledgeArticle,
  score: number,
): RetrievedArticle {
  return {
    title: article.title,
    url: getResourcesUrlPath(article.slug),
    category: article.category,
    markdown: article.markdown,
    score,
  };
}

/**
 * Deterministic in-memory relevance retrieval over approved bot-enabled articles.
 * Returns up to GENIE_MAX_RETRIEVED_ARTICLES articles above the relevance threshold.
 */
export function retrieveKnowledge(query: string): KnowledgeRetrievalResult {
  const queryLower = query.toLowerCase();
  const queryTokens = tokenize(query);

  if (queryTokens.length === 0) {
    return { relevant: false, articles: [] };
  }

  const articles = getBotKnowledgeWithContent();

  const ranked = articles
    .map((article) => ({
      article,
      score: scoreArticle(queryLower, queryTokens, article),
    }))
    .filter((entry) => entry.score >= GENIE_MIN_RELEVANCE_SCORE)
    .sort((a, b) => b.score - a.score)
    .slice(0, GENIE_MAX_RETRIEVED_ARTICLES);

  if (ranked.length === 0) {
    return { relevant: false, articles: [] };
  }

  return {
    relevant: true,
    articles: ranked.map(({ article, score }) =>
      toRetrievedArticle(article, score),
    ),
  };
}
