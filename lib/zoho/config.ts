import "server-only";

import { ZohoConfigurationError } from "@/lib/zoho/errors";

export type ZohoServerConfig = {
  clientId: string;
  clientSecret: string;
  refreshToken: string;
  accountsUrl: string;
  apiBaseUrl: string;
  redirectUri: string;
  /** Optional — protects bootstrap/verify routes during initial setup. */
  oauthSetupSecret: string | undefined;
};

function requireEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new ZohoConfigurationError(
      `Missing required environment variable: ${name}`,
    );
  }
  return value;
}

function optionalEnv(name: string): string | undefined {
  const value = process.env[name]?.trim();
  return value || undefined;
}

function normalizeBaseUrl(url: string, label: string): string {
  const trimmed = url.replace(/\/+$/, "");
  if (!/^https:\/\/.+/i.test(trimmed)) {
    throw new ZohoConfigurationError(
      `${label} must be an absolute HTTPS URL (received an invalid value).`,
    );
  }
  return trimmed;
}

function isLocalhostHostname(hostname: string): boolean {
  return hostname === "localhost" || hostname === "127.0.0.1";
}

/** Validates ZOHO_REDIRECT_URI — HTTPS required except for localhost. */
function normalizeRedirectUri(url: string): string {
  const trimmed = url.trim();
  let parsed: URL;

  try {
    parsed = new URL(trimmed);
  } catch {
    throw new ZohoConfigurationError(
      "ZOHO_REDIRECT_URI must be an absolute URL (received an invalid value).",
    );
  }

  const isLocalhost = isLocalhostHostname(parsed.hostname);

  if (!isLocalhost && parsed.protocol !== "https:") {
    throw new ZohoConfigurationError(
      "ZOHO_REDIRECT_URI must use HTTPS in deployed environments (localhost may use HTTP for local development).",
    );
  }

  return trimmed.replace(/\/+$/, "");
}

function requireRedirectUri(): string {
  return normalizeRedirectUri(requireEnv("ZOHO_REDIRECT_URI"));
}

/** Returns true when all required Zoho CRM env vars are present. */
export function isZohoConfigured(): boolean {
  return Boolean(
    process.env.ZOHO_CLIENT_ID?.trim() &&
      process.env.ZOHO_CLIENT_SECRET?.trim() &&
      process.env.ZOHO_REFRESH_TOKEN?.trim() &&
      process.env.ZOHO_ACCOUNTS_URL?.trim() &&
      process.env.ZOHO_API_BASE_URL?.trim(),
  );
}

/** Load and validate Zoho server configuration. Never exposes secret values. */
export function getZohoConfig(): ZohoServerConfig {
  return {
    clientId: requireEnv("ZOHO_CLIENT_ID"),
    clientSecret: requireEnv("ZOHO_CLIENT_SECRET"),
    refreshToken: requireEnv("ZOHO_REFRESH_TOKEN"),
    accountsUrl: normalizeBaseUrl(
      requireEnv("ZOHO_ACCOUNTS_URL"),
      "ZOHO_ACCOUNTS_URL",
    ),
    apiBaseUrl: normalizeBaseUrl(
      requireEnv("ZOHO_API_BASE_URL"),
      "ZOHO_API_BASE_URL",
    ),
    redirectUri: requireRedirectUri(),
    oauthSetupSecret: optionalEnv("ZOHO_OAUTH_SETUP_SECRET"),
  };
}

/** OAuth client credentials only (bootstrap before refresh token exists). */
export function getZohoOAuthClientConfig(): Pick<
  ZohoServerConfig,
  "clientId" | "clientSecret" | "accountsUrl" | "redirectUri" | "oauthSetupSecret"
> {
  return {
    clientId: requireEnv("ZOHO_CLIENT_ID"),
    clientSecret: requireEnv("ZOHO_CLIENT_SECRET"),
    accountsUrl: normalizeBaseUrl(
      requireEnv("ZOHO_ACCOUNTS_URL"),
      "ZOHO_ACCOUNTS_URL",
    ),
    redirectUri: requireRedirectUri(),
    oauthSetupSecret: optionalEnv("ZOHO_OAUTH_SETUP_SECRET"),
  };
}
