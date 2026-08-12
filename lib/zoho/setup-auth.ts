import "server-only";

import { timingSafeEqual } from "node:crypto";
import { ZohoConfigurationError, ZohoOAuthError } from "@/lib/zoho/errors";

function safeCompare(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) {
    return false;
  }
  return timingSafeEqual(bufA, bufB);
}

/** Reads setup secret from query string or Authorization: Bearer header. */
export function getZohoSetupSecretFromRequest(request: Request): string | null {
  const url = new URL(request.url);
  const querySecret = url.searchParams.get("secret")?.trim();
  if (querySecret) {
    return querySecret;
  }

  const authorization = request.headers.get("authorization")?.trim();
  if (authorization?.toLowerCase().startsWith("bearer ")) {
    return authorization.slice(7).trim();
  }

  return null;
}

/** Validates the optional setup secret for bootstrap/verify routes. */
export function assertZohoSetupAuthorized(providedSecret: string | null): void {
  const expected = process.env.ZOHO_OAUTH_SETUP_SECRET?.trim();

  if (!expected) {
    throw new ZohoConfigurationError(
      "ZOHO_OAUTH_SETUP_SECRET is not configured. Set it temporarily for OAuth bootstrap and verification.",
    );
  }

  if (!providedSecret || !safeCompare(providedSecret, expected)) {
    throw new ZohoOAuthError("Unauthorized.", {
      code: "zoho_setup_unauthorized",
      httpStatus: 401,
    });
  }
}
