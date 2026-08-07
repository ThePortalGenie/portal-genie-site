"use client";

import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import type { CtaLocation } from "@/lib/analytics/events";
import { decorateAppUrl } from "@/lib/analytics/attribution";
import { trackLoginClick } from "@/lib/analytics/track";

type TrackedLoginLinkProps = ComponentPropsWithoutRef<typeof Link> & {
  href: string;
  ctaLocation: CtaLocation;
};

export function TrackedLoginLink({
  href,
  ctaLocation,
  onClick,
  ...props
}: TrackedLoginLinkProps) {
  const loginHref = decorateAppUrl(href);

  return (
    <Link
      href={loginHref}
      onClick={(event) => {
        trackLoginClick({
          ctaLocation,
          linkUrl: loginHref,
        });
        onClick?.(event);
      }}
      {...props}
    />
  );
}
