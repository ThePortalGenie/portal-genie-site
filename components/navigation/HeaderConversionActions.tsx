"use client";

import Link from "next/link";
import { headerActions } from "@/content/navigation";
import { TrackedButtonLink } from "@/components/analytics/TrackedButtonLink";
import { decorateAppUrl } from "@/lib/analytics/attribution";
import { trackLoginClick } from "@/lib/analytics/track";

export function HeaderConversionActions() {
  const loginHref = decorateAppUrl(headerActions.login.href);

  return (
    <>
      <Link
        href={loginHref}
        onClick={() =>
          trackLoginClick({
            ctaLocation: "header",
            linkUrl: loginHref,
          })
        }
        className="hidden h-11 items-center text-sm font-medium leading-none text-portal-navy transition-colors duration-200 hover:text-portal-blue lg:inline-flex"
      >
        {headerActions.login.label}
      </Link>

      <div className="hidden items-center gap-2 lg:flex xl:gap-3">
        <TrackedButtonLink
          href={headerActions.startFree.href}
          variant="secondary"
          className="whitespace-nowrap px-3.5 xl:px-6"
          track={{ type: "trial_cta", ctaLocation: "header" }}
        >
          {headerActions.startFree.label}
        </TrackedButtonLink>
        <TrackedButtonLink
          href={headerActions.bookDemo.href}
          className="whitespace-nowrap px-3.5 xl:px-6"
          track={{ type: "book_demo", ctaLocation: "header" }}
        >
          {headerActions.bookDemo.label}
        </TrackedButtonLink>
      </div>
    </>
  );
}
