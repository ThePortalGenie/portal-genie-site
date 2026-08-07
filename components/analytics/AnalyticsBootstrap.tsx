"use client";

import { useEffect } from "react";
import { PRODUCTION_SITE_URL } from "@/config/seo";
import { captureAttributionFromUrl } from "@/lib/analytics/attribution";
import { applyStoredConsentFromCookie } from "@/lib/analytics/consent";

const PRODUCTION_HOST = new URL(PRODUCTION_SITE_URL).hostname;

/**
 * Client bootstrap for attribution capture and consent restore.
 * Runs on production hostname only.
 */
export function AnalyticsBootstrap() {
  useEffect(() => {
    if (window.location.hostname !== PRODUCTION_HOST) {
      return;
    }

    captureAttributionFromUrl();
    applyStoredConsentFromCookie();
  }, []);

  return null;
}
