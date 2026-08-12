import { GENIE_ENQUIRY_RATE_LIMIT } from "@/config/genie-enquiry";

type Bucket = {
  count: number;
  resetAt: number;
};

const buckets = new Map<string, Bucket>();

/**
 * Best-effort per-instance rate limit for the public enquiry endpoint.
 * Not durable across Vercel serverless instances — treat as a light throttle only.
 */
export function checkGenieEnquiryRateLimit(clientKey: string): boolean {
  const now = Date.now();
  const existing = buckets.get(clientKey);

  if (!existing || existing.resetAt <= now) {
    buckets.set(clientKey, {
      count: 1,
      resetAt: now + GENIE_ENQUIRY_RATE_LIMIT.windowMs,
    });
    return true;
  }

  if (existing.count >= GENIE_ENQUIRY_RATE_LIMIT.maxRequests) {
    return false;
  }

  existing.count += 1;
  return true;
}

export function getEnquiryClientKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || "unknown";
  }

  return request.headers.get("x-real-ip")?.trim() || "unknown";
}
