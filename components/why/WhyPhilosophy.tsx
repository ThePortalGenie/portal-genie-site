"use client";

import {
  HeartHandshake,
  Minimize2,
  Palette,
  ShieldCheck,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import { whyPage } from "@/content/why";
import { Card, CardDescription, CardTitle } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";
import { ScrollReveal } from "@/components/features/ScrollReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Section } from "@/components/ui/Section";
import { useScrollReveal, SCROLL_REVEAL_STAGGER_MS } from "@/hooks/useScrollReveal";

const iconMap: Record<string, LucideIcon> = {
  "minimize-2": Minimize2,
  "shield-check": ShieldCheck,
  "heart-handshake": HeartHandshake,
  palette: Palette,
  "trending-up": TrendingUp,
};

export function WhyPhilosophy() {
  const { philosophy } = whyPage;
  const { ref: gridRef, isVisible } = useScrollReveal(0.1);

  return (
    <Section background="background">
      <ScrollReveal>
        <SectionHeader
          title={philosophy.headline}
          description={philosophy.description}
          align="left"
          className="max-w-2xl"
        />
      </ScrollReveal>

      <div
        ref={gridRef}
        className="mt-12 grid gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-8"
      >
        {philosophy.principles.map((principle, index) => {
          const Icon = iconMap[principle.icon];

          return (
            <Card
              key={principle.title}
              variant="surface"
              reveal={isVisible}
              revealDelay={index * SCROLL_REVEAL_STAGGER_MS}
            >
              <IconBadge icon={Icon} />
              <CardTitle>{principle.title}</CardTitle>
              <CardDescription>{principle.description}</CardDescription>
            </Card>
          );
        })}
      </div>
    </Section>
  );
}
