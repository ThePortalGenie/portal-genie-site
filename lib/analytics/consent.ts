export const CONSENT_COOKIE = "pg_consent";
export const CONSENT_TTL_DAYS = 365;

export type ConsentAnalyticsChoice = "granted" | "denied";

export type StoredConsent = {
  analytics: ConsentAnalyticsChoice;
  updated_at: string;
};

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

function isBrowser(): boolean {
  return typeof window !== "undefined" && typeof document !== "undefined";
}

function gtagConsentCommand(...args: unknown[]): void {
  if (!isBrowser()) {
    return;
  }

  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push(args);
}

/** Consent Mode v2 defaults — must run before GTM loads Google tags. */
export function pushConsentDefaults(): void {
  gtagConsentCommand("consent", "default", {
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    wait_for_update: 500,
  });
}

export function pushConsentUpdate(analyticsGranted: boolean): void {
  const state = analyticsGranted ? "granted" : "denied";

  gtagConsentCommand("consent", "update", {
    analytics_storage: state,
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
}

export function readConsentCookie(): StoredConsent | null {
  if (!isBrowser()) {
    return null;
  }

  const match = document.cookie.match(
    new RegExp(`(?:^|; )${CONSENT_COOKIE}=([^;]*)`),
  );

  if (!match?.[1]) {
    return null;
  }

  try {
    const parsed = JSON.parse(decodeURIComponent(match[1])) as StoredConsent;
    if (
      parsed.analytics !== "granted" &&
      parsed.analytics !== "denied"
    ) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

export function writeConsentCookie(analytics: ConsentAnalyticsChoice): void {
  if (!isBrowser()) {
    return;
  }

  const payload: StoredConsent = {
    analytics,
    updated_at: new Date().toISOString(),
  };

  const maxAge = CONSENT_TTL_DAYS * 24 * 60 * 60;
  const encoded = encodeURIComponent(JSON.stringify(payload));
  document.cookie = `${CONSENT_COOKIE}=${encoded}; path=/; max-age=${maxAge}; samesite=lax`;
}

export function applyStoredConsentFromCookie(): void {
  const stored = readConsentCookie();
  if (!stored) {
    return;
  }

  pushConsentUpdate(stored.analytics === "granted");
}
