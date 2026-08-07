import { PRODUCTION_SITE_URL } from "@/config/seo";
import type { DataLayerEvent } from "@/lib/analytics/events";

const PRODUCTION_HOST = new URL(PRODUCTION_SITE_URL).hostname;

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

function isClientTrackingContext(): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  // Belt-and-suspenders: never push from local/preview even if a prod build runs locally.
  return window.location.hostname === PRODUCTION_HOST;
}

/**
 * Push a structured event to `window.dataLayer` for GTM to consume.
 * No-ops when server-side, off-production, or when dataLayer is unavailable.
 */
export function pushDataLayerEvent(event: DataLayerEvent): void {
  if (!isClientTrackingContext()) {
    return;
  }

  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push(event);
}
