"use client";

import type { PlanName } from "@/lib/analytics/events";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { decorateAppUrl } from "@/lib/analytics/attribution";
import { trackTrialStartClick } from "@/lib/analytics/track";

type XeroconClaimCtaProps = {
  href: string;
  label: string;
  planName: PlanName;
  className?: string;
};

export function XeroconClaimCta({
  href,
  label,
  planName,
  className,
}: XeroconClaimCtaProps) {
  const decoratedHref = decorateAppUrl(href);

  return (
    <ButtonLink
      href={decoratedHref}
      className={className}
      onClick={() =>
        trackTrialStartClick({
          ctaLocation: "xerocon_hero",
          linkUrl: decoratedHref,
          planName,
        })
      }
    >
      {label}
    </ButtonLink>
  );
}
