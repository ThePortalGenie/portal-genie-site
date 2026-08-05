"use client";

import {
  Headphones,
  HeartHandshake,
  Puzzle,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { customerSuccessPage } from "@/content/customer-success";
import { ThemeCard } from "@/components/customer-success/ThemeCard";
import { ScrollReveal } from "@/components/features/ScrollReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Section } from "@/components/ui/Section";
import { useScrollReveal, SCROLL_REVEAL_STAGGER_MS } from "@/hooks/useScrollReveal";

const iconMap: Record<string, LucideIcon> = {
  headphones: Headphones,
  sparkles: Sparkles,
  puzzle: Puzzle,
  "heart-handshake": HeartHandshake,
};

export function CommonThemes() {
  const { customerSuccessThemes } = customerSuccessPage;
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <Section background="surface">
      <ScrollReveal>
        <SectionHeader
          title={customerSuccessThemes.headline}
          description={customerSuccessThemes.description}
          align="left"
          className="mx-auto max-w-xl text-center md:mx-0 md:text-left"
        />
      </ScrollReveal>

      <div
        ref={ref}
        className="mt-8 grid gap-5 sm:mt-10 sm:grid-cols-2 md:mt-12 md:gap-6 lg:gap-8"
      >
        {customerSuccessThemes.items.map((item, index) => {
          const Icon = iconMap[item.icon];

          return (
            <ThemeCard
              key={item.title}
              icon={Icon}
              title={item.title}
              description={item.description}
              reveal={isVisible}
              revealDelay={index * SCROLL_REVEAL_STAGGER_MS}
            />
          );
        })}
      </div>
    </Section>
  );
}
