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

export async function tryEstablishAdminBypass(suppliedSecret: string): Promise<boolean> {
  const configuredSecret = getConfiguredAdminBypassSecret();
  if (!configuredSecret || !suppliedSecret.trim()) {
    return false;
  }

  if (!secretsMatch(suppliedSecret.trim(), configuredSecret)) {
    return false;
  }

  if (!isDemoRedisConfigured()) {
    return false;
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

  const cookieStore = await cookies();
  cookieStore.set(DEMO_ADMIN_SESSION_COOKIE_NAME, sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: DEMO_ADMIN_SESSION_TTL_SECONDS,
  });

  return true;
}

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
