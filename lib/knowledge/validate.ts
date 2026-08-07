import {
  KNOWLEDGE_CATEGORIES,
  RELATED_PAGE_PATHS,
  type KnowledgeArticleMetadata,
  type KnowledgeCategory,
} from "@/content/knowledge/types";

const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

function assertIsoDate(value: string, field: string, articleId: string): void {
  if (!ISO_DATE_PATTERN.test(value)) {
    throw new Error(
      `Knowledge article "${articleId}" has invalid ${field} date "${value}". Expected YYYY-MM-DD.`,
    );
  }
}

function assertValidSlug(slug: string, articleId: string): void {
  if (slug.startsWith("/") || slug.endsWith("/")) {
    throw new Error(
      `Knowledge article "${articleId}" slug must not have leading or trailing slashes: "${slug}"`,
    );
  }

  if (slug.startsWith("resources/") || slug === "resources") {
    throw new Error(
      `Knowledge article "${articleId}" slug must not include a /resources prefix: "${slug}"`,
    );
  }
}

function assertValidCategory(
  category: string,
  articleId: string,
): asserts category is KnowledgeCategory {
  if (!(KNOWLEDGE_CATEGORIES as readonly string[]).includes(category)) {
    throw new Error(
      `Knowledge article "${articleId}" has invalid category "${category}".`,
    );
  }
}

/** Lightweight integrity checks run when the registry module loads. */
export function validateKnowledgeRegistry(
  articles: readonly KnowledgeArticleMetadata[],
): void {
  const ids = new Set<string>();
  const slugs = new Set<string>();
  const articleIds = new Set(articles.map((article) => article.id));

  for (const article of articles) {
    if (ids.has(article.id)) {
      throw new Error(`Duplicate knowledge article id: "${article.id}"`);
    }
    ids.add(article.id);

    assertValidSlug(article.slug, article.id);

    if (slugs.has(article.slug)) {
      throw new Error(`Duplicate knowledge article slug: "${article.slug}"`);
    }
    slugs.add(article.slug);

    assertValidCategory(article.category, article.id);
    assertIsoDate(article.lastReviewed, "lastReviewed", article.id);
    assertIsoDate(article.updatedAt, "updatedAt", article.id);

    if (article.indexable && !article.public) {
      throw new Error(
        `Knowledge article "${article.id}" is indexable but public is false.`,
      );
    }

    for (const relatedId of article.relatedArticles) {
      if (!articleIds.has(relatedId)) {
        throw new Error(
          `Knowledge article "${article.id}" references missing relatedArticles id "${relatedId}".`,
        );
      }
    }

    for (const relatedPage of article.relatedPages) {
      if (!(RELATED_PAGE_PATHS as readonly string[]).includes(relatedPage)) {
        throw new Error(
          `Knowledge article "${article.id}" references unknown relatedPages path "${relatedPage}".`,
        );
      }
    }
  }
}
