import "server-only";

import { Redis } from "@upstash/redis";

let redisClient: Redis | null = null;

export function isDemoRedisConfigured(): boolean {
  return Boolean(
    process.env.UPSTASH_REDIS_REST_URL?.trim() &&
      process.env.UPSTASH_REDIS_REST_TOKEN?.trim(),
  );
}

export function getDemoRedis(): Redis {
  if (!isDemoRedisConfigured()) {
    throw new Error("Demo Redis is not configured.");
  }

  if (!redisClient) {
    redisClient = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL!,
      token: process.env.UPSTASH_REDIS_REST_TOKEN!,
    });
  }

  return redisClient;
}
