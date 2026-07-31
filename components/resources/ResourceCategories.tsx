"use client";

import {
  BookOpen,
  FileText,
  HelpCircle,
  Sparkles,
  Star,
  type LucideIcon,
} from "lucide-react";
import { resourcesPage } from "@/content/resources";
import { ResourceCard } from "@/components/resources/ResourceCard";
import { ScrollReveal } from "@/components/features/ScrollReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Container } from "@/components/ui/Container";
import { useScrollReveal, SCROLL_REVEAL_STAGGER_MS } from "@/hooks/useScrollReveal";

const iconMap: Record<string, LucideIcon> = {
  "book-open": BookOpen,
  "file-text": FileText,
  sparkles: Sparkles,
  "help-circle": HelpCircle,
  star: Star,
};

export function ResourceCategories() {
  const { categories } = resourcesPage;
  const { ref: gridRef, isVisible } = useScrollReveal(0.1);

  return (
    <section className="border-y border-muted/15 bg-surface">
      <Container>
        <ScrollReveal>
          <SectionHeader
            title={categories.headline}
            description={categories.description}
            align="left"
            className="max-w-xl pt-12 md:pt-16"
          />
        </ScrollReveal>

        <div
          ref={gridRef}
          className="mt-10 grid gap-6 pb-12 sm:grid-cols-2 md:pb-16 lg:grid-cols-3 lg:gap-8"
        >
          {categories.items.map((item, index) => {
            const Icon = iconMap[item.icon];

            return (
              <ResourceCard
                key={item.title}
                icon={Icon}
                title={item.title}
                description={item.description}
                cta={item.cta}
                reveal={isVisible}
                revealDelay={index * SCROLL_REVEAL_STAGGER_MS}
              />
            );
          })}
        </div>
      </Container>
    </section>
  );
}
