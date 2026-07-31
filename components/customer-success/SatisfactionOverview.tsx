"use client";

import { customerSuccessPage } from "@/content/customer-success";
import { StatisticCard } from "@/components/customer-success/StatisticCard";
import { Container } from "@/components/ui/Container";
import { useScrollReveal, SCROLL_REVEAL_STAGGER_MS } from "@/hooks/useScrollReveal";

export function SatisfactionOverview() {
  const { statistics } = customerSuccessPage;
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <section className="border-y border-muted/15 bg-surface">
      <Container>
        <div
          ref={ref}
          className="grid gap-6 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8 lg:py-16"
        >
          {statistics.items.map((item, index) => (
            <StatisticCard
              key={item.label}
              value={item.value}
              label={item.label}
              stars={"stars" in item ? item.stars : undefined}
              icon={"icon" in item ? item.icon : undefined}
              reveal={isVisible}
              revealDelay={index * SCROLL_REVEAL_STAGGER_MS}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
