"use client";

import type { ReactNode } from "react";
import type { CtaLocation } from "@/lib/analytics/events";
import { trackEmailContactClick } from "@/lib/analytics/track";

type TrackedEmailLinkProps = {
  href: string;
  emailDomain: "theportalgenie.com" | "theportalgenie.com.au";
  ctaLocation: CtaLocation;
  className?: string;
  children: ReactNode;
};

export function TrackedEmailLink({
  href,
  emailDomain,
  ctaLocation,
  className,
  children,
}: TrackedEmailLinkProps) {
  return (
    <a
      href={href}
      className={className}
      onClick={() =>
        trackEmailContactClick({ ctaLocation, emailDomain })
      }
    >
      {children}
    </a>
  );
}
