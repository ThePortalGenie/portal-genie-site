import "server-only";

import { cookies } from "next/headers";
import { DEMO_SESSION_COOKIE_NAME, DEMO_SESSION_TTL_SECONDS } from "@/config/demo-access";
import { getDemoRedis } from "@/lib/demo-auth/redis";
import { generateSessionId } from "@/lib/demo-auth/tokens";
import type { DemoSessionRecord, DemoVerificationRecord } from "@/lib/demo-auth/types";

function sessionKey(sessionId: string): string {
  return `demo:session:${sessionId}`;
}

export async function createDemoSessionFromVerification(
  verification: DemoVerificationRecord,
): Promise<string> {
  const redis = getDemoRedis();
  const sessionId = generateSessionId();

  const record: DemoSessionRecord = {
    verified: true,
    email: verification.email,
    firstName: verification.firstName,
    createdAt: new Date().toISOString(),
  };

  await redis.set(sessionKey(sessionId), record, {
    ex: DEMO_SESSION_TTL_SECONDS,
  });

  return sessionId;
}

export async function getDemoSessionRecord(
  sessionId: string,
): Promise<DemoSessionRecord | null> {
  const redis = getDemoRedis();
  const record = await redis.get<DemoSessionRecord>(sessionKey(sessionId));
  if (!record?.verified) {
    return null;
  }
  return record;
}

export async function getVerifiedDemoSession(): Promise<DemoSessionRecord | null> {
  if (
    process.env.NODE_ENV === "development" &&
    process.env.DEMO_ACCESS_BYPASS === "true"
  ) {
    return {
      verified: true,
      email: "dev@local.test",
      firstName: "Developer",
      createdAt: new Date().toISOString(),
    };
  }

  const cookieStore = await cookies();
  const sessionId = cookieStore.get(DEMO_SESSION_COOKIE_NAME)?.value?.trim();
  if (!sessionId) {
    return null;
  }

  return getDemoSessionRecord(sessionId);
}

export async function setDemoSessionCookie(sessionId: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(DEMO_SESSION_COOKIE_NAME, sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: DEMO_SESSION_TTL_SECONDS,
  });
}

export async function clearDemoSessionCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(DEMO_SESSION_COOKIE_NAME);
}
