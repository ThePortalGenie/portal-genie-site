"use client";

import { links } from "@/config/links";
import { buttons } from "@/content/buttons";
import { TrackedButtonLink } from "@/components/analytics/TrackedButtonLink";

export function PlatformBookDemoCta() {
  return (
    <TrackedButtonLink
      href={links.bookDemo}
      className="mt-10 inline-flex h-10 items-center justify-center rounded-button bg-portal-blue px-5 text-sm font-medium text-white transition-colors duration-200 hover:bg-portal-blue/90 sm:px-6"
      track={{ type: "book_demo", ctaLocation: "platform" }}
    >
      {buttons.bookDemo}
    </TrackedButtonLink>
  );
}
