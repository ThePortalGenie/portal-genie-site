const ATTRIBUTION_COOKIE = "pg_attribution";
const ATTRIBUTION_TTL_DAYS = 90;
const SESSION_KEY = "pg_attribution_session";

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;

export type UtmParams = Partial<Record<(typeof UTM_KEYS)[number], string>>;

type StoredAttribution = {
  first: UtmParams;
  session: UtmParams;
  captured_at: string;
};

function isBrowser(): boolean {
  return typeof window !== "undefined" && typeof document !== "undefined";
}

/** Lowercase alphanumeric, underscore, hyphen, dot — max 128 chars. */
export function sanitizeUtmValue(raw: string): string | null {
  const trimmed = raw.trim().slice(0, 128);
  if (!trimmed || !/^[a-z0-9_\-.]+$/i.test(trimmed)) {
    return null;
  }

  return trimmed.toLowerCase();
}

export function parseUtmParamsFromSearch(search: string): UtmParams {
  const params = new URLSearchParams(search);
  const result: UtmParams = {};

  for (const key of UTM_KEYS) {
    const value = params.get(key);
    if (!value) {
      continue;
    }

    const sanitized = sanitizeUtmValue(value);
    if (sanitized) {
      result[key] = sanitized;
    }
  }

  return result;
}

function hasUtmParams(params: UtmParams): boolean {
  return Object.keys(params).length > 0;
}

function readAttributionCookie(): StoredAttribution | null {
  if (!isBrowser()) {
    return null;
  }

  const match = document.cookie.match(
    new RegExp(`(?:^|; )${ATTRIBUTION_COOKIE}=([^;]*)`),
  );

  if (!match?.[1]) {
    return null;
  }

  try {
    return JSON.parse(decodeURIComponent(match[1])) as StoredAttribution;
  } catch {
    return null;
  }
}

function writeAttributionCookie(data: StoredAttribution): void {
  if (!isBrowser()) {
    return;
  }

  const maxAge = ATTRIBUTION_TTL_DAYS * 24 * 60 * 60;
  const encoded = encodeURIComponent(JSON.stringify(data));
  document.cookie = `${ATTRIBUTION_COOKIE}=${encoded}; path=/; max-age=${maxAge}; samesite=lax`;
}

function readSessionAttribution(): UtmParams | null {
  if (!isBrowser()) {
    return null;
  }

  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) {
      return null;
    }

    return JSON.parse(raw) as UtmParams;
  } catch {
    return null;
  }
}

function writeSessionAttribution(params: UtmParams): void {
  if (!isBrowser()) {
    return;
  }

  sessionStorage.setItem(SESSION_KEY, JSON.stringify(params));
}

/**
 * Capture validated UTM params from the landing URL.
 * First-touch persists in a cookie; latest-touch in sessionStorage.
 */
export function captureAttributionFromUrl(): void {
  if (!isBrowser()) {
    return;
  }

  const incoming = parseUtmParamsFromSearch(window.location.search);
  if (!hasUtmParams(incoming)) {
    return;
  }

  writeSessionAttribution(incoming);

  const existing = readAttributionCookie();
  if (existing?.first && hasUtmParams(existing.first)) {
    return;
  }

  writeAttributionCookie({
    first: incoming,
    session: incoming,
    captured_at: new Date().toISOString(),
  });
}

export function getAttributionParams(): UtmParams {
  const session = readSessionAttribution();
  if (session && hasUtmParams(session)) {
    return session;
  }

  const cookie = readAttributionCookie();
  if (cookie?.session && hasUtmParams(cookie.session)) {
    return cookie.session;
  }

  if (cookie?.first && hasUtmParams(cookie.first)) {
    return cookie.first;
  }

  return {};
}

const APP_HOST = "app.theportalgenie.com";

export function isAppPortalUrl(href: string): boolean {
  try {
    const url = new URL(href, "https://www.theportalgenie.com");
    return url.hostname === APP_HOST;
  } catch {
    return false;
  }
}

/** Append stored UTM params to app.theportalgenie.com links without altering existing query keys. */
export function decorateAppUrl(href: string): string {
  if (!isAppPortalUrl(href)) {
    return href;
  }

  const url = new URL(href);
  const attribution = getAttributionParams();

  for (const [key, value] of Object.entries(attribution)) {
    if (value && !url.searchParams.has(key)) {
      url.searchParams.set(key, value);
    }
  }

  return url.toString();
}
