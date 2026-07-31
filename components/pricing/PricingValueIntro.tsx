"use client";

import { Check } from "lucide-react";
import { pricingPage } from "@/content/pricing";
import { ScrollReveal } from "@/components/features/ScrollReveal";
import { Container } from "@/components/ui/Container";

export function PricingValueIntro() {
  const { items } = pricingPage.valueIntro;

  return (
    <section className="border-y border-muted/15 bg-surface">
      <Container>
        <ScrollReveal>
          <ul className="grid gap-5 py-8 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4 lg:py-10">
            {items.map((item) => (
              <li key={item} className="flex items-center gap-3">
                <Check
                  className="size-4 shrink-0 text-portal-teal"
                  strokeWidth={2}
                  aria-hidden="true"
                />
                <span className="text-sm text-portal-navy/75">{item}</span>
              </li>
            ))}
          </ul>
        </ScrollReveal>
      </Container>
    </section>
  );
}
