import { isProductionSite } from "@/config/seo";

/** Production GTM container — public, not a secret. Override via NEXT_PUBLIC_GTM_ID. */
export const PRODUCTION_GTM_ID = "GTM-TT39PTQ8";

/**
 * GA4 measurement ID configured inside GTM (not loaded directly in app code).
 * @see PRODUCTION_GTM_ID
 */
export const GA4_MEASUREMENT_ID = "G-RZTJ7RESHD";

/**
 * Google Tag Manager container for the marketing site.
 * GA4 (G-RZTJ7RESHD) is configured inside GTM — not in application code.
 */
export function getGtmId(): string | undefined {
  const fromEnv = process.env.NEXT_PUBLIC_GTM_ID?.trim();
  if (fromEnv) {
    return fromEnv;
  }

  // Production builds must load GTM even when the env var was not injected at build time.
  if (isProductionSite()) {
    return PRODUCTION_GTM_ID;
  }

  return undefined;
}

/**
 * True only on the real production marketing deployment.
 * Reuses Sprint 1 indexing guards — preview, local dev and staging stay off.
 */
export function isAnalyticsEnabled(): boolean {
  return isProductionSite() && Boolean(getGtmId());
}
