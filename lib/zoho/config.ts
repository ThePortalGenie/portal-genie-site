import "server-only";

import { ZohoConfigurationError } from "@/lib/zoho/errors";

export type ZohoServerConfig = {
  clientId: string;
  clientSecret: string;
  refreshToken: string;
  accountsUrl: string;
  apiBaseUrl: string;
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

function normalizeBaseUrl(url: string, label: string): string {
  const trimmed = url.replace(/\/+$/, "");
  if (!/^https:\/\/.+/i.test(trimmed)) {
    throw new ZohoConfigurationError(
      `${label} must be an absolute HTTPS URL (received an invalid value).`,
    );
  }
  return trimmed;
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
  };
}
