import "server-only";

import { DEMO_SESSION_COOKIE_NAME } from "@/config/demo-access";
import {
  createDemoSessionFromVerification,
  getDemoSessionRecord,
} from "@/lib/demo-auth/session";
import { syncDemoLeadVerifiedToZohoInBackground } from "@/lib/demo-auth/sync-zoho";
import {
  consumeDemoVerification,
  getDemoVerificationByToken,
} from "@/lib/demo-auth/verification";
import { cookies } from "next/headers";

export type DemoVerifyFailureReason = "missing" | "invalid" | "expired";

export type DemoVerifyResult =
  | { ok: true; sessionId: string }
  | { ok: true; alreadyVerified: true }
  | { ok: false; reason: DemoVerifyFailureReason };

/**
 * Validates and consumes a verification token, creates a Redis demo session.
 * Does not set cookies — use the /api/demo/verify Route Handler for that.
 */
export async function processDemoVerificationToken(
  rawToken: string | undefined,
): Promise<DemoVerifyResult> {
  if (!rawToken?.trim()) {
    return { ok: false, reason: "missing" };
  }

  const token = rawToken.trim();

  const existingRecord = await getDemoVerificationByToken(token);
  if (!existingRecord) {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get(DEMO_SESSION_COOKIE_NAME)?.value?.trim();
    if (sessionId) {
      const session = await getDemoSessionRecord(sessionId);
      if (session?.verified) {
        return { ok: true, alreadyVerified: true };
      }
    }
    return { ok: false, reason: "expired" };
  }

  const consumed = await consumeDemoVerification(token);
  if (!consumed) {
    return { ok: false, reason: "invalid" };
  }

  const sessionId = await createDemoSessionFromVerification(consumed);

  syncDemoLeadVerifiedToZohoInBackground(consumed);

  return { ok: true, sessionId };
}
