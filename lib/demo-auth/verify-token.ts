import "server-only";

import {
  consumeDemoVerification,
  getDemoVerificationByToken,
} from "@/lib/demo-auth/verification";
import {
  createDemoSessionFromVerification,
  getDemoSessionRecord,
  setDemoSessionCookie,
} from "@/lib/demo-auth/session";
import { syncDemoLeadVerifiedToZohoInBackground } from "@/lib/demo-auth/sync-zoho";
import { DEMO_SESSION_COOKIE_NAME } from "@/config/demo-access";
import { cookies } from "next/headers";

export type DemoVerifyResult =
  | { ok: true }
  | { ok: false; reason: "missing" | "invalid" | "expired" | "already_verified" };

export async function verifyDemoAccessToken(rawToken: string | undefined): Promise<DemoVerifyResult> {
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
        return { ok: false, reason: "already_verified" };
      }
    }
    return { ok: false, reason: "expired" };
  }

  const consumed = await consumeDemoVerification(token);
  if (!consumed) {
    return { ok: false, reason: "invalid" };
  }

  const sessionId = await createDemoSessionFromVerification(consumed);
  await setDemoSessionCookie(sessionId);

  syncDemoLeadVerifiedToZohoInBackground(consumed);

  return { ok: true };
}
