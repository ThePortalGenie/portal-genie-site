"use client";

import { resourcesPage } from "@/content/resources";
import { ArticleCard } from "@/components/resources/ArticleCard";
import { ScrollReveal } from "@/components/features/ScrollReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Section } from "@/components/ui/Section";
import { useScrollReveal, SCROLL_REVEAL_STAGGER_MS } from "@/hooks/useScrollReveal";

export function FeaturedResources() {
  const { featured } = resourcesPage;
  const { ref: gridRef, isVisible } = useScrollReveal(0.1);

  return (
    <Section background="background" id="guides">
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
        {featured.articles.map((article, index) => (
          <ArticleCard
            key={article.title}
            category={article.category}
            title={article.title}
            summary={article.summary}
            readingTime={article.readingTime}
            href={article.href}
            reveal={isVisible}
            revealDelay={index * SCROLL_REVEAL_STAGGER_MS}
          />
        ))}
      </div>
    </Section>
  );
}
