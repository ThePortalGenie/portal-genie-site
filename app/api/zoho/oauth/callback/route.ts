import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  ZOHO_OAUTH_SETUP_COOKIE,
  ZOHO_OAUTH_STATE_COOKIE,
} from "@/lib/zoho/constants";
import {
  ZohoConfigurationError,
  ZohoOAuthError,
} from "@/lib/zoho/errors";
import { exchangeAuthorizationCodeForTokens } from "@/lib/zoho/oauth";
import {
  zohoOAuthErrorPage,
  zohoOAuthSuccessPage,
} from "@/lib/zoho/oauth-pages";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function htmlResponse(html: string, status = 200): NextResponse {
  return new NextResponse(html, {
    status,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}

/**
 * Registered Zoho OAuth redirect URI handler.
 * Exchanges the authorization code server-side; never logs or echoes the code.
 */
export async function GET(request: Request): Promise<NextResponse> {
  const url = new URL(request.url);
  const oauthError = url.searchParams.get("error");
  const oauthErrorDescription = url.searchParams.get("error_description");

  if (oauthError) {
    const message =
      oauthErrorDescription?.trim() ||
      `Zoho rejected the authorization request (${oauthError}).`;
    return htmlResponse(zohoOAuthErrorPage(message), 400);
  }

  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");

  if (!code) {
    return htmlResponse(
      zohoOAuthErrorPage("Missing authorization code from Zoho."),
      400,
    );
  }

  const cookieStore = await cookies();
  const setupCookie = cookieStore.get(ZOHO_OAUTH_SETUP_COOKIE)?.value;
  const stateCookie = cookieStore.get(ZOHO_OAUTH_STATE_COOKIE)?.value;

  cookieStore.delete(ZOHO_OAUTH_SETUP_COOKIE);
  cookieStore.delete(ZOHO_OAUTH_STATE_COOKIE);

  if (!state || !stateCookie || state !== stateCookie) {
    return htmlResponse(
      zohoOAuthErrorPage(
        "Invalid or expired OAuth state. Restart bootstrap from /api/zoho/oauth/start.",
      ),
      400,
    );
  }

  try {
    const tokens = await exchangeAuthorizationCodeForTokens(code);
    const showRefreshToken = setupCookie === "1" && Boolean(tokens.refresh_token);

    return htmlResponse(
      zohoOAuthSuccessPage({
        showRefreshToken,
        refreshToken: tokens.refresh_token,
      }),
    );
  } catch (error) {
    if (error instanceof ZohoOAuthError) {
      return htmlResponse(zohoOAuthErrorPage(error.message), error.httpStatus);
    }

    if (error instanceof ZohoConfigurationError) {
      return htmlResponse(zohoOAuthErrorPage(error.message), 503);
    }

    return htmlResponse(
      zohoOAuthErrorPage("Unable to complete Zoho OAuth token exchange."),
      500,
    );
  }
}
