"use client";

import type { AnalyticsCurrency, PlanName } from "@/lib/analytics/events";
import type { PlanId } from "@/content/pricing";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { decorateAppUrl } from "@/lib/analytics/attribution";
import { trackPlanSelect, trackTrialStartClick } from "@/lib/analytics/track";

type PricingPlanCtaProps = {
  planId: PlanId;
  currency: AnalyticsCurrency;
  href: string;
  label: string;
};

export function PricingPlanCta({
  planId,
  currency,
  href,
  label,
}: PricingPlanCtaProps) {
  const planName = planId as PlanName;
  const decoratedHref = decorateAppUrl(href);

  function handleClick() {
    trackPlanSelect({ planName, currency });
    trackTrialStartClick({
      ctaLocation: "pricing_card",
      linkUrl: decoratedHref,
      planName,
      currency,
    });
  }

  return (
    <ButtonLink
      href={decoratedHref}
      variant="primary"
      className="w-full"
      onClick={handleClick}
    >
      {label}
    </ButtonLink>
  );
}
