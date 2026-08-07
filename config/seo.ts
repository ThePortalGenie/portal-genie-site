import type { Metadata } from "next";
import { company } from "./company";

/** Official canonical marketing origin — never derived from request host or VERCEL_URL. */
export const PRODUCTION_SITE_URL = "https://www.theportalgenie.com" as const;

export const seo = {
  siteName: company.officialName,
  defaultDescription: company.tagline,
  productionSiteUrl: PRODUCTION_SITE_URL,
} as const;

/** Routes approved for production indexing and the initial XML sitemap. */
export const INDEXABLE_ROUTES = [
  "/",
  "/why-the-portal-genie",
  "/features",
  "/pricing",
  "/customer-success",
  "/book-a-demo",
  "/privacy-policy",
  "/terms-and-conditions",
] as const;

export type IndexableRoute = (typeof INDEXABLE_ROUTES)[number];

/** Public routes that must not appear in organic search on production. */
export const NOINDEX_ROUTES = [
  "/resources",
  "/platform",
  "/about",
  "/contact",
  "/documentation",
  "/product-updates",
  "/faq",
  "/youtube",
  "/xerocon",
] as const;

export type NoIndexRoute = (typeof NOINDEX_ROUTES)[number];

/**
 * Production indexing activates when:
 *
 * 1. `VERCEL_ENV === "production"` on Vercel, OR
 * 2. `NODE_ENV === "production"` AND `NEXT_PUBLIC_SITE_URL` exactly matches
 *    the canonical production origin (non-Vercel production hosting).
 *
 * Preview, development, local dev, and unknown environments default to
 * non-indexable (`noindex, nofollow`).
 */
export function isProductionSite(): boolean {
  if (process.env.VERCEL_ENV === "production") {
    return true;
  }

  if (
    process.env.NODE_ENV === "production" &&
    process.env.NEXT_PUBLIC_SITE_URL === PRODUCTION_SITE_URL
  ) {
    return true;
  }

  return false;
}

/** Canonical origin for metadataBase — always the production www URL. */
export function getMetadataBase(): URL {
  return new URL(PRODUCTION_SITE_URL);
}

/** Absolute canonical URL for an indexable path (no trailing slash except `/`). */
export function getCanonicalUrl(path: IndexableRoute): string {
  if (path === "/") {
    return `${PRODUCTION_SITE_URL}/`;
  }

  return `${PRODUCTION_SITE_URL}${path}`;
}

export function robotsForIndexablePage(): NonNullable<Metadata["robots"]> {
  if (!isProductionSite()) {
    return { index: false, follow: false };
  }

  return { index: true, follow: true };
}

/** Production: noindex, follow. Non-production: noindex, nofollow. */
export function robotsForNoIndexPage(): NonNullable<Metadata["robots"]> {
  if (!isProductionSite()) {
    return { index: false, follow: false };
  }

  return { index: false, follow: true };
}

/** Layout-level default robots for non-production environments. */
export function getDefaultLayoutRobots(): Metadata["robots"] | undefined {
  if (isProductionSite()) {
    return undefined;
  }

  return { index: false, follow: false };
}

export function indexablePageMetadata(
  path: IndexableRoute,
  metadata: Omit<Metadata, "alternates" | "robots">,
): Metadata {
  return {
    ...metadata,
    alternates: {
      canonical: path,
    },
    robots: robotsForIndexablePage(),
  };
}

export function noIndexPageMetadata(
  metadata: Omit<Metadata, "robots"> & {
    alternates?: Metadata["alternates"];
  },
): Metadata {
  return {
    ...metadata,
    robots: robotsForNoIndexPage(),
  };
}

/**
 * Non-www → www redirect is expected at the domain / hosting layer (e.g. Vercel
 * domain settings), not in this Next.js app. Verify during production launch.
 */
export const WWW_REDIRECT_NOTE =
  "Configure a permanent redirect from https://theportalgenie.com to https://www.theportalgenie.com at the domain/hosting level.";

/**
 * Application login, registration and account routes on app.theportalgenie.com
 * are outside this marketing repository — audit indexing controls separately.
 */
export const APP_SITE_INDEXING_NOTE =
  "Marketing sitemap excludes app.theportalgenie.com. Application-side robots/noindex must be configured on the app subdomain separately.";
