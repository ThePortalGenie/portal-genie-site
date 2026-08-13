import "server-only";

import {
  DEMO_RESEND_COOLDOWN_SECONDS,
  DEMO_VERIFICATION_TTL_SECONDS,
} from "@/config/demo-access";
import { getDemoRedis } from "@/lib/demo-auth/redis";
import {
  generateVerificationToken,
  hashEmailForKey,
  hashVerificationToken,
} from "@/lib/demo-auth/tokens";
import type { DemoLeadPayload, DemoVerificationRecord } from "@/lib/demo-auth/types";

function verificationKey(tokenHash: string): string {
  return `demo:verify:${tokenHash}`;
}

function pendingLeadKey(emailHash: string): string {
  return `demo:lead:${emailHash}`;
}

function resendCooldownKey(emailHash: string): string {
  return `demo:resend:${emailHash}`;
}

export type CreateVerificationResult = {
  rawToken: string;
  record: DemoVerificationRecord;
};

export async function createDemoVerification(
  lead: DemoLeadPayload,
): Promise<CreateVerificationResult> {
  const redis = getDemoRedis();
  const emailHash = hashEmailForKey(lead.email);

  const pendingKey = pendingLeadKey(emailHash);
  const existingPending = await redis.get<{ tokenHash: string }>(pendingKey);
  if (existingPending?.tokenHash) {
    await redis.del(verificationKey(existingPending.tokenHash));
  }

  const rawToken = generateVerificationToken();
  const tokenHash = hashVerificationToken(rawToken);

  const record: DemoVerificationRecord = {
    ...lead,
    createdAt: new Date().toISOString(),
    status: "pending",
  };

  await redis.set(verificationKey(tokenHash), record, {
    ex: DEMO_VERIFICATION_TTL_SECONDS,
  });

  await redis.set(
    pendingKey,
    { tokenHash, lead },
    { ex: DEMO_VERIFICATION_TTL_SECONDS },
  );

  return { rawToken, record };
}

export async function getDemoVerificationByToken(
  rawToken: string,
): Promise<DemoVerificationRecord | null> {
  const redis = getDemoRedis();
  const tokenHash = hashVerificationToken(rawToken);
  const record = await redis.get<DemoVerificationRecord>(verificationKey(tokenHash));
  return record ?? null;
}

export async function consumeDemoVerification(
  rawToken: string,
): Promise<DemoVerificationRecord | null> {
  const redis = getDemoRedis();
  const tokenHash = hashVerificationToken(rawToken);
  const key = verificationKey(tokenHash);

  const record = await redis.get<DemoVerificationRecord>(key);
  if (!record) {
    return null;
  }

  await redis.del(key);

  const emailHash = hashEmailForKey(record.email);
  await redis.del(pendingLeadKey(emailHash));

  return record;
}

export async function getPendingLeadForEmail(
  email: string,
): Promise<DemoLeadPayload | null> {
  const redis = getDemoRedis();
  const emailHash = hashEmailForKey(email);
  const pending = await redis.get<{ lead: DemoLeadPayload }>(pendingLeadKey(emailHash));
  return pending?.lead ?? null;
}

export async function checkResendCooldown(email: string): Promise<number> {
  const redis = getDemoRedis();
  const emailHash = hashEmailForKey(email);
  const ttl = await redis.ttl(resendCooldownKey(emailHash));
  return ttl > 0 ? ttl : 0;
}

export async function setResendCooldown(email: string): Promise<void> {
  const redis = getDemoRedis();
  const emailHash = hashEmailForKey(email);
  await redis.set(resendCooldownKey(emailHash), "1", {
    ex: DEMO_RESEND_COOLDOWN_SECONDS,
  });
}

export async function resendDemoVerification(email: string): Promise<CreateVerificationResult | null> {
  const lead = await getPendingLeadForEmail(email);
  if (!lead) {
    return null;
  }

  await setResendCooldown(email);
  return createDemoVerification(lead);
}

export function getAppOrigin(): string {
  const configured = process.env.NEXT_PUBLIC_APP_URL?.trim().replace(/\/+$/, "");
  if (configured && /^https:\/\/.+/i.test(configured)) {
    return configured;
  }

  if (process.env.NODE_ENV === "development") {
    return "http://localhost:3000";
  }

  throw new Error("NEXT_PUBLIC_APP_URL must be set to a valid HTTPS origin in production.");
}

export function buildVerificationUrl(rawToken: string): string {
  const origin = getAppOrigin();
  const params = new URLSearchParams({ token: rawToken });
  return `${origin}/demo/verify?${params.toString()}`;
}
