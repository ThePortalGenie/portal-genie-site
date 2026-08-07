"use client";

import { useCallback, useEffect, useState } from "react";
import { PRODUCTION_SITE_URL } from "@/config/seo";
import {
  pushConsentUpdate,
  readConsentCookie,
  writeConsentCookie,
} from "@/lib/analytics/consent";

const PRODUCTION_HOST = new URL(PRODUCTION_SITE_URL).hostname;

type ConsentBannerProps = {
  /** When true, re-opens the banner (e.g. from footer preferences link). */
  forceOpen?: boolean;
  onClose?: () => void;
};

export function ConsentBanner({
  forceOpen = false,
  onClose,
}: ConsentBannerProps) {
  const [visible, setVisible] = useState(false);
  const [isProductionHost, setIsProductionHost] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const onProd = window.location.hostname === PRODUCTION_HOST;
      setIsProductionHost(onProd);

      if (onProd && (forceOpen || !readConsentCookie())) {
        setVisible(true);
      }
    }, 0);

    return () => window.clearTimeout(timer);
  }, [forceOpen]);

  const close = useCallback(() => {
    setVisible(false);
    onClose?.();
  }, [onClose]);

  const acceptAnalytics = useCallback(() => {
    writeConsentCookie("granted");
    pushConsentUpdate(true);
    close();
  }, [close]);

  const rejectNonEssential = useCallback(() => {
    writeConsentCookie("denied");
    pushConsentUpdate(false);
    close();
  }, [close]);

  if (!isProductionHost || !visible) {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-labelledby="consent-banner-heading"
      aria-describedby="consent-banner-description"
      className="fixed inset-x-0 bottom-0 z-[100] border-t border-muted/20 bg-surface/95 p-4 shadow-[0_-8px_32px_-12px_rgba(17,33,54,0.18)] backdrop-blur-sm sm:p-5"
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
        <div className="min-w-0">
          <p
            id="consent-banner-heading"
            className="text-sm font-semibold text-portal-navy"
          >
            Cookie preferences
          </p>
          <p
            id="consent-banner-description"
            className="mt-1.5 text-sm leading-relaxed text-portal-navy/75"
          >
            We use optional analytics cookies to understand how visitors use our
            website and improve the experience. You can accept or reject
            non-essential cookies. Essential site functionality is unaffected.
          </p>
        </div>
        <div className="flex shrink-0 flex-col gap-2 sm:flex-row sm:items-center">
          <button
            type="button"
            onClick={rejectNonEssential}
            className="inline-flex h-10 items-center justify-center rounded-button border border-muted/40 bg-background px-4 text-sm font-medium text-portal-navy transition-colors duration-200 hover:border-muted/70"
          >
            Reject non-essential
          </button>
          <button
            type="button"
            onClick={acceptAnalytics}
            className="inline-flex h-10 items-center justify-center rounded-button bg-portal-blue px-4 text-sm font-medium text-white transition-colors duration-200 hover:bg-portal-blue/90"
          >
            Accept analytics
          </button>
        </div>
      </div>
    </div>
  );
}
