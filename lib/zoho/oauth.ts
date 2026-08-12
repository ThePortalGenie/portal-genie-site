import "server-only";

import {
  getZohoConfig,
  getZohoOAuthClientConfig,
  type ZohoServerConfig,
} from "@/lib/zoho/config";
import { ZOHO_CRM_OAUTH_SCOPE } from "@/lib/zoho/constants";
import { ZohoOAuthError } from "@/lib/zoho/errors";

type ZohoTokenSuccess = {
  access_token: string;
  expires_in?: number;
  expires_in_sec?: number;
  api_domain?: string;
  token_type?: string;
  refresh_token?: string;
};

type CachedAccessToken = {
  accessToken: string;
  expiresAtMs: number;
  apiDomain: string | null;
};

let cachedAccessToken: CachedAccessToken | null = null;

function tokenExpiryMs(payload: ZohoTokenSuccess): number {
  const seconds = payload.expires_in_sec ?? payload.expires_in ?? 3600;
  return Date.now() + Math.max(60, seconds - 60) * 1000;
}

function resolveApiBaseUrl(config: ZohoServerConfig, apiDomain?: string): string {
  if (apiDomain) {
    const normalized = apiDomain.replace(/\/+$/, "");
    if (/^https:\/\/.+/i.test(normalized)) {
      return normalized;
    }
    return `https://${normalized}`;
  }
  return config.apiBaseUrl;
}

async function parseZohoTokenResponse(
  response: Response,
): Promise<ZohoTokenSuccess> {
  let payload: unknown;

  try {
    payload = await response.json();
  } catch {
    throw new ZohoOAuthError("Zoho token endpoint returned invalid JSON.", {
      code: "zoho_token_invalid_json",
      httpStatus: 502,
    });
  }

  if (!response.ok) {
    const errorBody = payload as { error?: string; error_description?: string };
    throw new ZohoOAuthError(
      errorBody.error_description ??
        errorBody.error ??
        "Zoho token request failed.",
      {
        code: "zoho_token_request_failed",
        httpStatus: response.status === 401 ? 401 : 502,
        zohoError: errorBody.error,
      },
    );
  }

  const data = payload as ZohoTokenSuccess;
  if (!data.access_token) {
    throw new ZohoOAuthError("Zoho token response did not include an access token.", {
      code: "zoho_token_missing_access_token",
      httpStatus: 502,
    });
  }

  return data;
}

async function postTokenRequest(
  accountsUrl: string,
  body: URLSearchParams,
): Promise<ZohoTokenSuccess> {
  let response: Response;

  try {
    response = await fetch(`${accountsUrl}/oauth/v2/token`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
      cache: "no-store",
    });
  } catch {
    throw new ZohoOAuthError("Unable to reach Zoho Accounts.", {
      code: "zoho_token_network_error",
      httpStatus: 502,
    });
  }

  return parseZohoTokenResponse(response);
}

/** Build the one-time Zoho authorization URL for refresh-token bootstrap. */
export function buildZohoAuthorizationUrl(state: string): string {
  const config = getZohoOAuthClientConfig();
  const params = new URLSearchParams({
    scope: ZOHO_CRM_OAUTH_SCOPE,
    client_id: config.clientId,
    response_type: "code",
    access_type: "offline",
    redirect_uri: config.redirectUri,
    prompt: "consent",
    state,
  });

  return `${config.accountsUrl}/oauth/v2/auth?${params.toString()}`;
}

/** Exchange a one-time authorization code for tokens (bootstrap only). */
export async function exchangeAuthorizationCodeForTokens(
  code: string,
): Promise<ZohoTokenSuccess> {
  const config = getZohoOAuthClientConfig();
  const body = new URLSearchParams({
    grant_type: "authorization_code",
    client_id: config.clientId,
    client_secret: config.clientSecret,
    redirect_uri: config.redirectUri,
    code,
  });

  return postTokenRequest(config.accountsUrl, body);
}

/** Exchange the stored refresh token for a short-lived CRM access token. */
export async function getZohoAccessToken(): Promise<{
  accessToken: string;
  apiBaseUrl: string;
}> {
  const config = getZohoConfig();

  if (cachedAccessToken && cachedAccessToken.expiresAtMs > Date.now()) {
    return {
      accessToken: cachedAccessToken.accessToken,
      apiBaseUrl: resolveApiBaseUrl(
        config,
        cachedAccessToken.apiDomain ?? undefined,
      ),
    };
  }

  const body = new URLSearchParams({
    grant_type: "refresh_token",
    client_id: config.clientId,
    client_secret: config.clientSecret,
    refresh_token: config.refreshToken,
  });

  const data = await postTokenRequest(config.accountsUrl, body);
  const apiBaseUrl = resolveApiBaseUrl(config, data.api_domain);

  cachedAccessToken = {
    accessToken: data.access_token,
    expiresAtMs: tokenExpiryMs(data),
    apiDomain: data.api_domain ?? null,
  };

  return {
    accessToken: data.access_token,
    apiBaseUrl,
  };
}

/** Clears in-memory access token cache (useful after credential rotation). */
export function clearZohoAccessTokenCache(): void {
  cachedAccessToken = null;
}
