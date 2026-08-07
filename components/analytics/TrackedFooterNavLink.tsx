"use client";

import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import { links } from "@/config/links";
import { trackBookDemoClick } from "@/lib/analytics/track";

type TrackedFooterNavLinkProps = ComponentPropsWithoutRef<typeof Link> & {
  href: string;
  label: string;
};

export function TrackedFooterNavLink({
  href,
  label,
  ...props
}: TrackedFooterNavLinkProps) {
  return (
    <Link
      href={href}
      onClick={() => {
        if (href === links.bookDemo) {
          trackBookDemoClick({
            ctaLocation: "footer",
            linkUrl: href,
          });
        }
      }}
      {...props}
    >
      {label}
    </Link>
  );
}
