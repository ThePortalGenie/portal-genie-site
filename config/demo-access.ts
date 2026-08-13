/** Demo lead gate — field limits (server + client). */

export const DEMO_ACCESS_FIELD_LIMITS = {
  firstName: 80,
  surname: 80,
  company: 200,
  phone: 40,
  email: 254,
  otherAccountingSoftware: 120,
} as const;

/** Verification token TTL — 30 minutes. */
export const DEMO_VERIFICATION_TTL_SECONDS = 30 * 60;

/** Verified demo session TTL — 14 days (Redis + cookie). */
export const DEMO_SESSION_TTL_SECONDS = 1_209_600;

export const DEMO_SESSION_COOKIE_NAME = "portal_genie_demo_session";

/** Temporary owner/admin bypass session — 4 hours (Redis + cookie). */
export const DEMO_ADMIN_SESSION_TTL_SECONDS = 4 * 60 * 60;

export const DEMO_ADMIN_SESSION_COOKIE_NAME = "portal_genie_demo_admin";

export const DEMO_RATE_LIMIT = {
  emailWindowSeconds: 15 * 60,
  emailMaxRequests: 3,
  ipWindowSeconds: 15 * 60,
  ipMaxRequests: 10,
} as const;

export const DEMO_RESEND_COOLDOWN_SECONDS = 60;

export const DEMO_HONEYPOT_FIELD = "website" as const;

export const DEMO_MAX_BODY_BYTES = 8_192;
