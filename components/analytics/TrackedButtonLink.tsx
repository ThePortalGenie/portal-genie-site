"use client";

import type { ComponentPropsWithoutRef, MouseEvent, ReactNode } from "react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { decorateAppUrl, isAppPortalUrl } from "@/lib/analytics/attribution";
import type { CtaLocation } from "@/lib/analytics/events";
import {
  trackBookDemoClick,
  trackContactSalesClick,
  trackLoginClick,
  trackTrialCtaClick,
  trackTrialStartClick,
  trialCtaDestinationFromHref,
} from "@/lib/analytics/track";

export type TrackedButtonLinkProps = Omit<
  ComponentPropsWithoutRef<"a">,
  "href"
> & {
  href: string;
  variant?: "primary" | "secondary";
  children: ReactNode;
  track?:
    | { type: "book_demo"; ctaLocation: CtaLocation }
    | { type: "trial_cta"; ctaLocation: CtaLocation }
    | { type: "contact_sales"; ctaLocation: CtaLocation }
    | { type: "login"; ctaLocation: CtaLocation }
    | { type: "trial_start"; ctaLocation: CtaLocation; linkUrl: string };
};

export function TrackedButtonLink({
  href,
  track,
  onClick,
  ...props
}: TrackedButtonLinkProps) {
  const resolvedHref =
    track?.type === "login" || track?.type === "trial_start" || isAppPortalUrl(href)
      ? decorateAppUrl(track?.type === "trial_start" ? track.linkUrl : href)
      : href;

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    if (track) {
      switch (track.type) {
        case "book_demo":
          trackBookDemoClick({
            ctaLocation: track.ctaLocation,
            linkUrl: href,
          });
          break;
        case "trial_cta":
          trackTrialCtaClick({
            ctaLocation: track.ctaLocation,
            destination: trialCtaDestinationFromHref(href),
          });
          break;
        case "contact_sales":
          trackContactSalesClick({
            ctaLocation: track.ctaLocation,
            linkUrl: href,
          });
          break;
        case "login":
          trackLoginClick({
            ctaLocation: track.ctaLocation,
            linkUrl: resolvedHref,
          });
          break;
        case "trial_start":
          trackTrialStartClick({
            ctaLocation: track.ctaLocation,
            linkUrl: resolvedHref,
          });
          break;
      }
    }

    onClick?.(event);
  }

  return (
    <ButtonLink href={resolvedHref} onClick={handleClick} {...props} />
  );
}
