import "server-only";

import fs from "node:fs";
import { knowledgeArticles } from "@/content/knowledge/registry";
import type {
  KnowledgeArticle,
  KnowledgeArticleMetadata,
  KnowledgeCategory,
} from "@/content/knowledge/types";
import { getArticleMarkdownPath } from "@/lib/knowledge/paths";

function normaliseSlug(slug: string): string {
  return slug.replace(/^\/+|\/+$/g, "");
}

function findMetadataBySlug(slug: string): KnowledgeArticleMetadata | undefined {
  const normalised = normaliseSlug(slug);
  return knowledgeArticles.find((article) => article.slug === normalised);
}

function findMetadataById(id: string): KnowledgeArticleMetadata | undefined {
  return knowledgeArticles.find((article) => article.id === id);
}

/** Reads raw Markdown for an article slug. Server-only — no Markdown parser required yet. */
export function getArticleMarkdownBySlug(slug: string): string | undefined {
  const metadata = findMetadataBySlug(slug);
  if (!metadata) {
    return undefined;
  }

  const filePath = getArticleMarkdownPath(metadata.slug);

  if (!fs.existsSync(filePath)) {
    throw new Error(
      `Knowledge Markdown file missing for slug "${metadata.slug}": ${filePath}`,
    );
  }

  return fs.readFileSync(filePath, "utf8");
}

/** Returns article metadata for a slug, or undefined if not registered. */
export function getArticleMetadataBySlug(
  slug: string,
): KnowledgeArticleMetadata | undefined {
  return findMetadataBySlug(slug);
}

/** Returns article metadata by stable id. */
export function getArticleMetadataById(
  id: string,
): KnowledgeArticleMetadata | undefined {
  return findMetadataById(id);
}

/** Returns metadata and raw Markdown for a slug. */
export function getKnowledgeArticleBySlug(
  slug: string,
): KnowledgeArticle | undefined {
  const metadata = findMetadataBySlug(slug);
  if (!metadata) {
    return undefined;
  }

  const markdown = getArticleMarkdownBySlug(metadata.slug);
  if (markdown === undefined) {
    return undefined;
  }

  return { ...metadata, markdown };
}

/** All registered article metadata (including non-public entries). */
export function getAllKnowledgeArticles(): readonly KnowledgeArticleMetadata[] {
  return knowledgeArticles;
}

/** Articles intended for future public /resources pages. */
export function listPublicArticles(): KnowledgeArticleMetadata[] {
  return knowledgeArticles.filter((article) => article.public);
}

/** Articles approved for future Genie retrieval. */
export function getBotKnowledge(): KnowledgeArticleMetadata[] {
  return knowledgeArticles.filter((article) => article.botEnabled);
}

/** Public articles approved for future SEO indexing and sitemap inclusion. */
export function listIndexablePublicArticles(): KnowledgeArticleMetadata[] {
  return knowledgeArticles.filter(
    (article) => article.public && article.indexable,
  );
}

/** Public articles in a given category. */
export function listPublicArticlesByCategory(
  category: KnowledgeCategory,
): KnowledgeArticleMetadata[] {
  return knowledgeArticles.filter(
    (article) => article.public && article.category === category,
  );
}

/** Resolves relatedArticles IDs to metadata objects (missing IDs are omitted). */
export function resolveRelatedArticles(
  article: KnowledgeArticleMetadata,
): KnowledgeArticleMetadata[] {
  return article.relatedArticles
    .map((id) => findMetadataById(id))
    .filter((item): item is KnowledgeArticleMetadata => item != null);
}

/** Full bot-enabled articles with Markdown bodies for future retrieval context. */
export function getBotKnowledgeWithContent(): KnowledgeArticle[] {
  return getBotKnowledge()
    .map((metadata) => getKnowledgeArticleBySlug(metadata.slug))
    .filter((article): article is KnowledgeArticle => article != null);
}

/** Full public articles with Markdown bodies for future /resources rendering. */
export function listPublicArticlesWithContent(): KnowledgeArticle[] {
  return listPublicArticles()
    .map((metadata) => getKnowledgeArticleBySlug(metadata.slug))
    .filter((article): article is KnowledgeArticle => article != null);
}
