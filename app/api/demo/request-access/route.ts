import { NextResponse } from "next/server";
import { DEMO_MAX_BODY_BYTES } from "@/config/demo-access";
import { isDemoAccessConfigured, getDemoAccessUnavailableMessage } from "@/lib/demo-auth/config";
import { sendDemoVerificationEmail } from "@/lib/demo-auth/email";
import { checkDemoAccessRateLimits } from "@/lib/demo-auth/rate-limit";
import {
  scheduleDemoLeadZohoSync,
} from "@/lib/demo-auth/sync-zoho";
import { validateDemoLeadBody } from "@/lib/demo-auth/validation";
import { createDemoVerification } from "@/lib/demo-auth/verification";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type SuccessResponse = {
  ok: true;
  email: string;
};

type ErrorResponse = {
  ok: false;
  error: string;
  code: string;
};

export async function POST(
  request: Request,
): Promise<NextResponse<SuccessResponse | ErrorResponse>> {
  const contentLength = request.headers.get("content-length");
  if (contentLength && Number.parseInt(contentLength, 10) > DEMO_MAX_BODY_BYTES) {
    return NextResponse.json(
      { ok: false, error: "Request body is too large.", code: "payload_too_large" },
      { status: 413 },
    );
  }

  let rawBody: string;
  try {
    rawBody = await request.text();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request body.", code: "invalid_request" },
      { status: 400 },
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

  const validation = validateDemoLeadBody(body);
  if (!validation.ok) {
    return NextResponse.json(
      { ok: false, error: validation.error, code: validation.code },
      { status: validation.code === "invalid_request" ? 400 : 422 },
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

  if (!(await checkDemoAccessRateLimits(request, validation.data.email))) {
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
    const { rawToken, record } = await createDemoVerification(validation.data);

    scheduleDemoLeadZohoSync(validation.data);

    await sendDemoVerificationEmail(record, rawToken);

    return NextResponse.json({
      ok: true,
      email: record.email,
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
