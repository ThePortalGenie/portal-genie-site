import type { KnowledgeArticle } from "@/content/knowledge/types";
import {
  buildArticleStructuredData,
  buildFaqArticleStructuredData,
} from "@/lib/knowledge/article-structured-data";
import { serializeStructuredData } from "@/config/structured-data";

type ArticleStructuredDataProps = {
  article: KnowledgeArticle;
};

export function ArticleStructuredData({ article }: ArticleStructuredDataProps) {
  const data =
    article.id === "faq"
      ? buildFaqArticleStructuredData(article)
      : buildArticleStructuredData(article);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeStructuredData(data) }}
    />
  );
}
