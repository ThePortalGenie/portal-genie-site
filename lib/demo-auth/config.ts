import "server-only";

import { isDemoRedisConfigured } from "@/lib/demo-auth/redis";
import { isResendConfigured } from "@/lib/demo-auth/email";

export function isDemoAccessConfigured(): boolean {
  return isDemoRedisConfigured() && isResendConfigured();
}

export function getDemoAccessUnavailableMessage(): string {
  return "We're having trouble sending the verification email. Please try again.";
}
