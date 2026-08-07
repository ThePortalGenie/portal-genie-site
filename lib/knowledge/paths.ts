import path from "node:path";

/** Absolute path to Markdown article bodies on disk. */
export const KNOWLEDGE_ARTICLES_DIR = path.join(
  process.cwd(),
  "content",
  "knowledge",
  "articles",
);

/** Resolves a slug such as `getting-started/intro` to a Markdown file path. */
export function getArticleMarkdownPath(slug: string): string {
  const normalised = slug.replace(/^\/+|\/+$/g, "");

  if (normalised.startsWith("resources/") || normalised === "resources") {
    throw new Error(
      `Knowledge slug must not include a /resources prefix: "${slug}"`,
    );
  }

  return path.join(KNOWLEDGE_ARTICLES_DIR, `${normalised}.md`);
}

/** Future public URL path beneath /resources for a knowledge slug. */
export function getResourcesUrlPath(slug: string): string {
  const normalised = slug.replace(/^\/+|\/+$/g, "");
  return `/resources/${normalised}`;
}
