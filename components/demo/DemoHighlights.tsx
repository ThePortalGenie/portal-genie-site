"use client";

import { Layers, MessageSquare, Users, type LucideIcon } from "lucide-react";
import { demoPage } from "@/content/demo";
import { Card, CardDescription, CardTitle } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";
import { ScrollReveal } from "@/components/features/ScrollReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Container } from "@/components/ui/Container";
import { useScrollReveal, SCROLL_REVEAL_STAGGER_MS } from "@/hooks/useScrollReveal";

const iconMap: Record<string, LucideIcon> = {
  users: Users,
  layers: Layers,
  "message-square": MessageSquare,
};

export function DemoHighlights() {
  const { highlights } = demoPage;
  const { ref: gridRef, isVisible } = useScrollReveal(0.1);

  return (
    <section className="border-y border-muted/15 bg-surface">
      <Container>
        <ScrollReveal>
          <SectionHeader
            title={highlights.headline}
            align="left"
            className="max-w-xl pt-12 md:pt-16"
          />
        </ScrollReveal>

        <div
          ref={gridRef}
          className="mt-10 grid gap-6 pb-12 md:grid-cols-3 md:pb-16 lg:gap-8"
        >
          {highlights.cards.map((card, index) => {
            const Icon = iconMap[card.icon];

            return (
              <Card
                key={card.title}
                variant="background"
                reveal={isVisible}
                revealDelay={index * SCROLL_REVEAL_STAGGER_MS}
              >
                <IconBadge icon={Icon} />
                <CardTitle>{card.title}</CardTitle>
                <CardDescription>{card.description}</CardDescription>
              </Card>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
