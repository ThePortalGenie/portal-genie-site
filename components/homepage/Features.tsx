"use client";

import {
  CreditCard,
  FolderOpen,
  LayoutDashboard,
  MessagesSquare,
  Palette,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { homepage } from "@/content/homepage";
import { Card, CardDescription, CardTitle } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useScrollReveal, SCROLL_REVEAL_STAGGER_MS } from "@/hooks/useScrollReveal";

const iconMap: Record<string, LucideIcon> = {
  "layout-dashboard": LayoutDashboard,
  "folder-open": FolderOpen,
  "credit-card": CreditCard,
  palette: Palette,
  "messages-square": MessagesSquare,
  workflow: Workflow,
};

export function Features() {
  const { eyebrow, headline, description, cards } = homepage.features;
  const { ref: gridRef, isVisible } = useScrollReveal(0.1);

  return (
    <Section background="background">
      <SectionHeader
        eyebrow={eyebrow}
        title={headline}
        description={description}
      />

      <div
        ref={gridRef}
        className="mt-12 grid gap-6 md:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-8"
      >
        {cards.map((card, index) => {
          const Icon = iconMap[card.icon];

          return (
            <Card
              key={card.title}
              interactive
              reveal={isVisible}
              revealDelay={index * SCROLL_REVEAL_STAGGER_MS}
              className="flex h-full flex-col"
            >
              <IconBadge icon={Icon} />
              <CardTitle>{card.title}</CardTitle>
              <CardDescription>{card.description}</CardDescription>
              <ul className="mt-5 flex flex-col gap-2.5 border-t border-muted/15 pt-5">
                {card.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="flex items-start gap-2.5 text-sm text-portal-navy/70"
                  >
                    <span
                      className="mt-2 size-1 shrink-0 rounded-full bg-portal-teal"
                      aria-hidden="true"
                    />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </Card>
          );
        })}
      </div>
    </Section>
  );
}
