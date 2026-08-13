/** Demo lead gate — field limits and options (server + client). */

export const DEMO_ACCESS_FIELD_LIMITS = {
  firstName: 80,
  surname: 80,
  company: 200,
  phone: 40,
  email: 254,
  accountingSoftware: 80,
  otherAccountingSoftware: 120,
} as const;

export const DEMO_ACCOUNTING_SOFTWARE_OPTIONS = [
  "Xero",
  "Sage",
  "QuickBooks",
  "Zoho Books",
  "Pastel",
  "Other",
] as const;

export type DemoAccountingSoftwareOption =
  (typeof DEMO_ACCOUNTING_SOFTWARE_OPTIONS)[number];

/** Verification token TTL — 30 minutes. */
export const DEMO_VERIFICATION_TTL_SECONDS = 30 * 60;

/** Verified demo session TTL — 24 hours. */
export const DEMO_SESSION_TTL_SECONDS = 24 * 60 * 60;

export const DEMO_SESSION_COOKIE_NAME = "portal_genie_demo_session";

export const DEMO_RATE_LIMIT = {
  emailWindowSeconds: 15 * 60,
  emailMaxRequests: 3,
  ipWindowSeconds: 15 * 60,
  ipMaxRequests: 10,
} as const;

export const DEMO_RESEND_COOLDOWN_SECONDS = 60;

export const DEMO_HONEYPOT_FIELD = "website" as const;

export const DEMO_MAX_BODY_BYTES = 8_192;
