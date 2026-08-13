import "server-only";

import { DEMO_RATE_LIMIT } from "@/config/demo-access";
import { getDemoRedis } from "@/lib/demo-auth/redis";
import { hashEmailForKey } from "@/lib/demo-auth/tokens";

export function getDemoClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || "unknown";
  }
  return request.headers.get("x-real-ip")?.trim() || "unknown";
}

async function incrementRateLimit(
  key: string,
  windowSeconds: number,
  maxRequests: number,
): Promise<boolean> {
  const redis = getDemoRedis();
  const current = await redis.incr(key);

  if (current === 1) {
    await redis.expire(key, windowSeconds);
  }

  return current <= maxRequests;
}

export async function checkDemoEmailRateLimit(email: string): Promise<boolean> {
  const emailHash = hashEmailForKey(email);
  return incrementRateLimit(
    `demo:rl:email:${emailHash}`,
    DEMO_RATE_LIMIT.emailWindowSeconds,
    DEMO_RATE_LIMIT.emailMaxRequests,
  );
}

export async function checkDemoIpRateLimit(request: Request): Promise<boolean> {
  const ip = getDemoClientIp(request);
  return incrementRateLimit(
    `demo:rl:ip:${ip}`,
    DEMO_RATE_LIMIT.ipWindowSeconds,
    DEMO_RATE_LIMIT.ipMaxRequests,
  );
}

export async function checkDemoAccessRateLimits(
  request: Request,
  email: string,
): Promise<boolean> {
  const [emailOk, ipOk] = await Promise.all([
    checkDemoEmailRateLimit(email),
    checkDemoIpRateLimit(request),
  ]);
  return emailOk && ipOk;
}
