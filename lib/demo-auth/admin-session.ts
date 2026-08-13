import "server-only";

import { timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import {
  DEMO_ADMIN_SESSION_COOKIE_NAME,
  DEMO_ADMIN_SESSION_TTL_SECONDS,
} from "@/config/demo-access";
import { isDemoRedisConfigured, getDemoRedis } from "@/lib/demo-auth/redis";
import { generateSessionId } from "@/lib/demo-auth/tokens";

type DemoAdminSessionRecord = {
  admin: true;
  createdAt: string;
};

function adminSessionKey(sessionId: string): string {
  return `demo:admin-session:${sessionId}`;
}

function getConfiguredAdminBypassSecret(): string | null {
  const secret = process.env.DEMO_ADMIN_BYPASS_SECRET?.trim();
  return secret || null;
}

function secretsMatch(supplied: string, expected: string): boolean {
  const suppliedBuffer = Buffer.from(supplied, "utf8");
  const expectedBuffer = Buffer.from(expected, "utf8");

  if (suppliedBuffer.length !== expectedBuffer.length) {
    return false;
  }

  return timingSafeEqual(suppliedBuffer, expectedBuffer);
}

/** Validates supplied token against DEMO_ADMIN_BYPASS_SECRET (read-only). */
export function isValidAdminBypassToken(suppliedSecret: string): boolean {
  const configuredSecret = getConfiguredAdminBypassSecret();
  if (!configuredSecret || !suppliedSecret.trim()) {
    return false;
  }

  return secretsMatch(suppliedSecret.trim(), configuredSecret);
}

/**
 * Creates an admin session record in Redis. Returns opaque session ID or null.
 * Does not set cookies — use the admin-bypass Route Handler for that.
 */
export async function createAdminDemoSessionInRedis(): Promise<string | null> {
  if (!isDemoRedisConfigured()) {
    return null;
  }

  const redis = getDemoRedis();
  const sessionId = generateSessionId();

  const record: DemoAdminSessionRecord = {
    admin: true,
    createdAt: new Date().toISOString(),
  };

  await redis.set(adminSessionKey(sessionId), record, {
    ex: DEMO_ADMIN_SESSION_TTL_SECONDS,
  });

  return sessionId;
}

export function getAdminDemoSessionCookieOptions(): {
  httpOnly: boolean;
  secure: boolean;
  sameSite: "lax";
  path: string;
  maxAge: number;
} {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: DEMO_ADMIN_SESSION_TTL_SECONDS,
  };
}

export { DEMO_ADMIN_SESSION_COOKIE_NAME };

/** Read-only check for a valid admin demo session (Server Components). */
export async function hasValidAdminDemoSession(): Promise<boolean> {
  if (!isDemoRedisConfigured()) {
    return false;
  }

  const cookieStore = await cookies();
  const sessionId = cookieStore.get(DEMO_ADMIN_SESSION_COOKIE_NAME)?.value?.trim();
  if (!sessionId) {
    return false;
  }

  const redis = getDemoRedis();
  const record = await redis.get<DemoAdminSessionRecord>(adminSessionKey(sessionId));
  return record?.admin === true;
}
