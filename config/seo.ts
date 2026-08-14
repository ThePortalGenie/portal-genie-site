import type { Metadata } from "next";
import { company } from "./company";
import { site } from "./site";

/** Official canonical marketing origin — never derived from request host or VERCEL_URL. */
export const PRODUCTION_SITE_URL = "https://www.theportalgenie.com" as const;

export const seo = {
  siteName: company.officialName,
  defaultDescription: company.tagline,
  productionSiteUrl: PRODUCTION_SITE_URL,
} as const;

/**
 * Social sharing image — add this file before launch.
 * Required path: public/images/social/portal-genie-og.png (1200×630).
 * See Sprint 1B report for brand asset guidance.
 */
export const SOCIAL_SHARE_IMAGE = {
  path: "/images/social/portal-genie-og.png",
  width: 1200,
  height: 630,
} as const;

/** Absolute logo URL for Organization schema and brand references. */
export const ORGANIZATION_LOGO_URL = `${PRODUCTION_SITE_URL}${site.logo.src}`;

const socialShareImageMetadata = {
  url: SOCIAL_SHARE_IMAGE.path,
  width: SOCIAL_SHARE_IMAGE.width,
  height: SOCIAL_SHARE_IMAGE.height,
  alt: seo.siteName,
} as const;

function resolveMetadataTitle(metadata: Metadata): string {
  const { title } = metadata;

  if (typeof title === "string") {
    return title;
  }

  if (title && typeof title === "object") {
    if ("absolute" in title && typeof title.absolute === "string") {
      return title.absolute;
    }

    if ("default" in title && typeof title.default === "string") {
      return title.default;
    }
  }

  return seo.siteName;
}

function resolveMetadataDescription(metadata: Metadata): string {
  return typeof metadata.description === "string"
    ? metadata.description
    : seo.defaultDescription;
}

/** Builds Open Graph and Twitter metadata for an indexable marketing page. */
export function buildSocialMetadata(
  path: IndexableRoute,
  metadata: Metadata,
): Pick<Metadata, "openGraph" | "twitter"> {
  const pageTitle = resolveMetadataTitle(metadata);
  const pageDescription = resolveMetadataDescription(metadata);
  const ogTitle =
    typeof metadata.openGraph?.title === "string"
      ? metadata.openGraph.title
      : pageTitle;
  const ogDescription =
    typeof metadata.openGraph?.description === "string"
      ? metadata.openGraph.description
      : pageDescription;
  const canonicalUrl = getCanonicalUrl(path);

  return {
    openGraph: {
      type: "website",
      siteName: seo.siteName,
      url: canonicalUrl,
      title: ogTitle,
      description: ogDescription,
      images: [socialShareImageMetadata],
      ...metadata.openGraph,
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: ogDescription,
      images: [SOCIAL_SHARE_IMAGE.path],
      ...metadata.twitter,
    },
  };
}

/** Site-wide Open Graph / Twitter defaults for the root layout. */
export function getRootSocialMetadata(): Pick<Metadata, "openGraph" | "twitter"> {
  return buildSocialMetadata("/", {
    title: seo.siteName,
    description: seo.defaultDescription,
  });
}

/** Routes approved for production indexing and the initial XML sitemap. */
export const INDEXABLE_ROUTES = [
  "/",
  "/why-the-portal-genie",
  "/features",
  "/pricing",
  "/customer-success",
  "/book-a-demo",
  "/contact",
  "/resources",
  "/privacy-policy",
  "/terms-and-conditions",
] as const;

export type IndexableRoute = (typeof INDEXABLE_ROUTES)[number];

/** Public routes that must not appear in organic search on production. */
export const NOINDEX_ROUTES = [
  "/platform",
  "/about",
  "/documentation",
  "/product-updates",
  "/faq",
  "/youtube",
  "/xerocon",
  "/xerocon/activate",
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
  const social = buildSocialMetadata(path, metadata);

  return {
    ...metadata,
    ...social,
    alternates: {
      canonical: getCanonicalUrl(path),
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

/** Canonical metadata for a public Resource Centre article at /resources/{slug}. */
export function indexableResourceArticleMetadata(
  slug: string,
  metadata: Omit<Metadata, "alternates" | "robots">,
): Metadata {
  const canonicalUrl = `${PRODUCTION_SITE_URL}/resources/${slug.replace(/^\/+|\/+$/g, "")}`;
  const pageTitle = resolveMetadataTitle(metadata);
  const pageDescription = resolveMetadataDescription(metadata);
  const ogTitle =
    typeof metadata.openGraph?.title === "string"
      ? metadata.openGraph.title
      : pageTitle;
  const ogDescription =
    typeof metadata.openGraph?.description === "string"
      ? metadata.openGraph.description
      : pageDescription;

  return {
    ...metadata,
    alternates: {
      canonical: canonicalUrl,
    },
    robots: robotsForIndexablePage(),
    openGraph: {
      type: "article",
      siteName: seo.siteName,
      url: canonicalUrl,
      title: ogTitle,
      description: ogDescription,
      images: [socialShareImageMetadata],
      ...metadata.openGraph,
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: ogDescription,
      images: [SOCIAL_SHARE_IMAGE.path],
      ...metadata.twitter,
    },
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
