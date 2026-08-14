"use client";

import { resourcesPage } from "@/content/resources";
import { knowledgeArticles } from "@/content/knowledge/registry";
import type { KnowledgeArticleMetadata } from "@/content/knowledge/types";
import { ArticleCard } from "@/components/resources/ArticleCard";
import { ScrollReveal } from "@/components/features/ScrollReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Section } from "@/components/ui/Section";
import { useScrollReveal, SCROLL_REVEAL_STAGGER_MS } from "@/hooks/useScrollReveal";
import { getCategoryDisplayName } from "@/lib/knowledge/categories";
import { FEATURED_KNOWLEDGE_ARTICLE_IDS } from "@/lib/knowledge/featured";
import { getResourcesUrlPath } from "@/lib/knowledge/paths";

export function FeaturedResources() {
  const { featured } = resourcesPage;
  const { ref: gridRef, isVisible } = useScrollReveal(0.1);
  const articles = FEATURED_KNOWLEDGE_ARTICLE_IDS.map((id) =>
    knowledgeArticles.find((article) => article.id === id),
  ).filter(
    (article): article is KnowledgeArticleMetadata =>
      article != null && article.public,
  );

  return (
    <Section background="surface" id="featured-resources">
      <ScrollReveal>
        <SectionHeader
          title={featured.headline}
          description={featured.description}
          align="left"
          className="max-w-xl"
        />
      </ScrollReveal>

      <div
        ref={gridRef}
        className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8"
      >
        {articles.map((article, index) => (
          <ArticleCard
            key={article.id}
            category={getCategoryDisplayName(article.category)}
            title={article.title}
            summary={article.summary}
            readingTime="5 min read"
            href={getResourcesUrlPath(article.slug)}
            reveal={isVisible}
            revealDelay={index * SCROLL_REVEAL_STAGGER_MS}
          />
        ))}
      </div>
    </Section>
  );
}
