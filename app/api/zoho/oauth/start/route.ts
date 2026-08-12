import { randomUUID } from "node:crypto";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  ZOHO_OAUTH_COOKIE_MAX_AGE_SEC,
  ZOHO_OAUTH_SETUP_COOKIE,
  ZOHO_OAUTH_STATE_COOKIE,
} from "@/lib/zoho/constants";
import {
  ZohoConfigurationError,
  ZohoOAuthError,
} from "@/lib/zoho/errors";
import { buildZohoAuthorizationUrl } from "@/lib/zoho/oauth";
import {
  assertZohoSetupAuthorized,
  getZohoSetupSecretFromRequest,
} from "@/lib/zoho/setup-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function oauthCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/api/zoho/oauth",
    maxAge: ZOHO_OAUTH_COOKIE_MAX_AGE_SEC,
  };
}

/**
 * One-time OAuth bootstrap entry point (admin only).
 * Visit with ?secret=ZOHO_OAUTH_SETUP_SECRET to begin refresh-token setup.
 */
export async function GET(request: Request): Promise<NextResponse> {
  try {
    assertZohoSetupAuthorized(getZohoSetupSecretFromRequest(request));

    const state = randomUUID();
    const cookieStore = await cookies();

    cookieStore.set(ZOHO_OAUTH_SETUP_COOKIE, "1", oauthCookieOptions());
    cookieStore.set(ZOHO_OAUTH_STATE_COOKIE, state, oauthCookieOptions());

    const authorizationUrl = buildZohoAuthorizationUrl(state);
    return NextResponse.redirect(authorizationUrl);
  } catch (error) {
    if (error instanceof ZohoOAuthError) {
      return NextResponse.json(
        { ok: false, error: error.message, code: error.code },
        { status: error.httpStatus },
      );
    }

    if (error instanceof ZohoConfigurationError) {
      return NextResponse.json(
        { ok: false, error: error.message, code: error.code },
        { status: 503 },
      );
    }

    return NextResponse.json(
      { ok: false, error: "Unable to start Zoho OAuth bootstrap." },
      { status: 500 },
    );
  }
}
