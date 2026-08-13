import { NextResponse } from "next/server";
import { DEMO_MAX_BODY_BYTES } from "@/config/demo-access";
import { isDemoAccessConfigured, getDemoAccessUnavailableMessage } from "@/lib/demo-auth/config";
import { sendDemoVerificationEmail } from "@/lib/demo-auth/email";
import { checkDemoAccessRateLimits } from "@/lib/demo-auth/rate-limit";
import { validateResendEmailBody } from "@/lib/demo-auth/validation";
import {
  checkResendCooldown,
  resendDemoVerification,
} from "@/lib/demo-auth/verification";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type SuccessResponse = { ok: true; email: string };
type ErrorResponse = { ok: false; error: string; code: string };

export async function POST(
  request: Request,
): Promise<NextResponse<SuccessResponse | ErrorResponse>> {
  let rawBody: string;
  try {
    rawBody = await request.text();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request body.", code: "invalid_request" },
      { status: 400 },
    );
  }

  if (rawBody.length > DEMO_MAX_BODY_BYTES) {
    return NextResponse.json(
      { ok: false, error: "Request body is too large.", code: "payload_too_large" },
      { status: 413 },
    );
  }

  let body: unknown;
  try {
    body = rawBody ? JSON.parse(rawBody) : null;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request body.", code: "invalid_request" },
      { status: 400 },
    );
  }

  const validation = validateResendEmailBody(body);
  if (!validation.ok) {
    return NextResponse.json(
      { ok: false, error: validation.error, code: validation.code },
      { status: 422 },
    );
  }

  if (!isDemoAccessConfigured()) {
    return NextResponse.json(
      {
        ok: false,
        error: getDemoAccessUnavailableMessage(),
        code: "service_unavailable",
      },
      { status: 503 },
    );
  }

  const cooldown = await checkResendCooldown(validation.email);
  if (cooldown > 0) {
    return NextResponse.json(
      {
        ok: false,
        error: `Please wait ${cooldown} seconds before requesting another email.`,
        code: "resend_cooldown",
      },
      { status: 429 },
    );
  }

  if (!(await checkDemoAccessRateLimits(request, validation.email))) {
    return NextResponse.json(
      {
        ok: false,
        error: "Too many verification requests. Please wait a few minutes and try again.",
        code: "rate_limited",
      },
      { status: 429 },
    );
  }

  try {
    const result = await resendDemoVerification(validation.email);

    if (!result) {
      return NextResponse.json({
        ok: true,
        email: validation.email,
      });
    }

    await sendDemoVerificationEmail(result.record, result.rawToken);

    return NextResponse.json({
      ok: true,
      email: validation.email,
    });
  } catch {
    return NextResponse.json(
      {
        ok: false,
        error: getDemoAccessUnavailableMessage(),
        code: "send_failed",
      },
      { status: 503 },
    );
  }
}
