"use client";

import {
  BookOpen,
  Puzzle,
  Rocket,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { resourcesPage } from "@/content/resources";
import { DocumentationCard } from "@/components/resources/DocumentationCard";
import { ScrollReveal } from "@/components/features/ScrollReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Section } from "@/components/ui/Section";
import { useScrollReveal, SCROLL_REVEAL_STAGGER_MS } from "@/hooks/useScrollReveal";

const iconMap: Record<string, LucideIcon> = {
  rocket: Rocket,
  "book-open": BookOpen,
  "shield-check": ShieldCheck,
  puzzle: Puzzle,
};

export function DocumentationPreview() {
  const { documentation } = resourcesPage;
  const { ref: gridRef, isVisible } = useScrollReveal(0.1);

  return (
    <Section background="background" id="documentation">
      <ScrollReveal>
        <SectionHeader
          title={documentation.headline}
          description={documentation.description}
          align="left"
          className="max-w-xl"
        />
      </ScrollReveal>

      <div
        ref={gridRef}
        className="mt-12 grid gap-6 sm:grid-cols-2 lg:gap-8"
      >
        {documentation.items.map((item, index) => {
          const Icon = iconMap[item.icon];

          return (
            <DocumentationCard
              key={item.title}
              icon={Icon}
              title={item.title}
              description={item.description}
              href={item.href}
              reveal={isVisible}
              revealDelay={index * SCROLL_REVEAL_STAGGER_MS}
            />
          );
        })}
      </div>
    </Section>
  );
}
