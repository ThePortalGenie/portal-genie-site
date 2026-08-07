"use client";

import type { MouseEvent } from "react";
import { pricingPage, pricingPromotion } from "@/content/pricing";
import { ScrollReveal } from "@/components/features/ScrollReveal";
import { TrackedButtonLink } from "@/components/analytics/TrackedButtonLink";
import { Container } from "@/components/ui/Container";
import { scrollToPricingPlans } from "@/components/pricing/scrollToPricingPlans";
import { trackTrialCtaClick } from "@/lib/analytics/track";

export function PricingCta() {
  const { finalCta } = pricingPage;

  function handleStartFreeClick(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    trackTrialCtaClick({
      ctaLocation: "pricing_final",
      destination: "pricing_plans",
    });
    scrollToPricingPlans("smooth");
    window.history.replaceState(null, "", `#${pricingPromotion.targetId}`);
  }

  return (
    <section className="bg-background py-12 md:py-20 lg:py-[120px]">
      <Container>
        <ScrollReveal>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-[1.75rem] font-semibold tracking-tight text-portal-navy sm:text-3xl md:text-4xl">
              {finalCta.headline}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-portal-navy/75 sm:mt-6 sm:text-lg">
              {finalCta.description}
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:items-center sm:justify-center md:mt-10">
              <TrackedButtonLink
                href={finalCta.primaryCta.href}
                variant="primary"
                className="w-full sm:w-auto"
                onClick={handleStartFreeClick}
              >
                {finalCta.primaryCta.label}
              </TrackedButtonLink>
              <TrackedButtonLink
                href={finalCta.secondaryCta.href}
                variant="secondary"
                className="w-full sm:w-auto"
                track={{ type: "book_demo", ctaLocation: "pricing_final" }}
              >
                {finalCta.secondaryCta.label}
              </TrackedButtonLink>
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
