import { isProductionSite } from "@/config/seo";

/**
 * Google Tag Manager container for the marketing site.
 * GA4 (G-RZTJ7RESHD) is configured inside GTM — not in application code.
 */
export function getGtmId(): string | undefined {
  const id = process.env.NEXT_PUBLIC_GTM_ID?.trim();
  return id || undefined;
}

/**
 * True only on the real production marketing deployment.
 * Reuses Sprint 1 indexing guards — preview, local dev and staging stay off.
 */
export function isAnalyticsEnabled(): boolean {
  return isProductionSite() && Boolean(getGtmId());
}
