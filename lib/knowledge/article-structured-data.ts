import { PRODUCTION_SITE_URL } from "@/config/seo";
import type { KnowledgeArticle } from "@/content/knowledge/types";
import { getCategoryDisplayName } from "@/lib/knowledge/categories";
import { getResourcesUrlPath } from "@/lib/knowledge/paths";

function parseFaqSections(markdown: string) {
  const sections = markdown.split(/\n(?=## )/).slice(1);

  return sections
    .map((section) => {
      const [headingLine, ...bodyLines] = section.split("\n");
      const name = headingLine.replace(/^##\s+/, "").trim();
      const text = bodyLines.join("\n").trim();

      if (!name || !text) {
        return null;
      }

      return { name, text };
    })
    .filter((item): item is { name: string; text: string } => item !== null);
}

export function buildArticleStructuredData(article: KnowledgeArticle) {
  const url = `${PRODUCTION_SITE_URL}${getResourcesUrlPath(article.slug)}`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: `${PRODUCTION_SITE_URL}/`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Resources",
            item: `${PRODUCTION_SITE_URL}/resources`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: getCategoryDisplayName(article.category),
            item: url,
          },
          {
            "@type": "ListItem",
            position: 4,
            name: article.title,
            item: url,
          },
        ],
      },
      {
        "@type": "Article",
        headline: article.title,
        description: article.description,
        dateModified: article.updatedAt,
        datePublished: article.lastReviewed,
        author: {
          "@type": "Organization",
          name: "The Portal Genie",
          url: PRODUCTION_SITE_URL,
        },
        publisher: {
          "@type": "Organization",
          name: "The Portal Genie",
          url: PRODUCTION_SITE_URL,
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": url,
        },
        url,
      },
    ],
  };
}

export function buildFaqArticleStructuredData(article: KnowledgeArticle) {
  const faqItems = parseFaqSections(article.markdown);

  if (faqItems.length === 0) {
    return buildArticleStructuredData(article);
  }

  const articleGraph = buildArticleStructuredData(article);

  return {
    ...articleGraph,
    "@graph": [
      ...articleGraph["@graph"],
      {
        "@type": "FAQPage",
        mainEntity: faqItems.map((item) => ({
          "@type": "Question",
          name: item.name,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.text,
          },
        })),
      },
    ],
  };
}
