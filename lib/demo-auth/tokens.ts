import "server-only";

import { createHash, randomBytes } from "node:crypto";

/** Cryptographically secure opaque verification token (URL-safe). */
export function generateVerificationToken(): string {
  return randomBytes(32).toString("base64url");
}

/** Cryptographically secure opaque session id. */
export function generateSessionId(): string {
  return randomBytes(32).toString("base64url");
}

/** SHA-256 hash of verification token for Redis storage. */
export function hashVerificationToken(rawToken: string): string {
  return createHash("sha256").update(rawToken, "utf8").digest("hex");
}

/** Stable hash for email-scoped Redis keys (not reversible). */
export function hashEmailForKey(email: string): string {
  return createHash("sha256").update(email.toLowerCase().trim(), "utf8").digest("hex");
}
