export {
  getAllKnowledgeArticles,
  getArticleMarkdownBySlug,
  getArticleMetadataById,
  getArticleMetadataBySlug,
  getBotKnowledge,
  getBotKnowledgeWithContent,
  getKnowledgeArticleBySlug,
  listIndexablePublicArticles,
  listPublicArticles,
  listPublicArticlesByCategory,
  listPublicArticlesWithContent,
  resolveRelatedArticles,
} from "@/lib/knowledge/load-article";

export { getArticleMarkdownPath, getResourcesUrlPath } from "@/lib/knowledge/paths";

export {
  getCategoryDisplayName,
  KNOWLEDGE_CATEGORY_LABELS,
} from "@/lib/knowledge/categories";

export {
  getRelatedPageLabel,
  RELATED_PAGE_LABELS,
} from "@/lib/knowledge/related-pages";

export { validateKnowledgeRegistry } from "@/lib/knowledge/validate";

export type {
  KnowledgeArticle,
  KnowledgeArticleMetadata,
  KnowledgeCategory,
  RelatedPagePath,
} from "@/content/knowledge/types";

export {
  KNOWLEDGE_CATEGORIES,
  RELATED_PAGE_PATHS,
} from "@/content/knowledge/types";

export { knowledgeArticles } from "@/content/knowledge/registry";
