import { NextResponse } from "next/server";
import { isGenieEnabled } from "@/config/genie";
import { GENIE_ENQUIRY_MAX_BODY_BYTES } from "@/config/genie-enquiry";
import { GenieEnquiryNotificationError } from "@/lib/genie/enquiry-errors";
import { isEnquiryNotificationConfigured } from "@/lib/genie/send-enquiry-notification";
import { processGenieEnquiry } from "@/lib/genie/process-enquiry";
import {
  checkGenieEnquiryRateLimit,
  getEnquiryClientKey,
} from "@/lib/genie/enquiry-rate-limit";
import { validateGenieEnquiryBody } from "@/lib/genie/validate-enquiry";
import { isZohoConfigured } from "@/lib/zoho/config";
import {
  ZohoConfigurationError,
  ZohoCrmApiError,
  ZohoOAuthError,
} from "@/lib/zoho/errors";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type EnquirySuccessResponse = {
  ok: true;
  message: string;
};

type EnquiryErrorResponse = {
  ok: false;
  error: string;
  code: string;
};

const SUCCESS_MESSAGE = "Thanks — we've received your request.";

function safeCrmErrorResponse(): NextResponse<EnquiryErrorResponse> {
  return NextResponse.json(
    {
      ok: false,
      error:
        "We couldn't submit your request right now. Please try again shortly.",
      code: "enquiry_unavailable",
    },
    { status: 503 },
  );
}

export async function POST(
  request: Request,
): Promise<NextResponse<EnquirySuccessResponse | EnquiryErrorResponse>> {
  const contentLength = request.headers.get("content-length");
  if (contentLength && Number.parseInt(contentLength, 10) > GENIE_ENQUIRY_MAX_BODY_BYTES) {
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

  if (rawBody.length > GENIE_ENQUIRY_MAX_BODY_BYTES) {
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
      { ok: false, error: "Invalid JSON body.", code: "invalid_request" },
      { status: 400 },
    );
  }

  const validation = validateGenieEnquiryBody(body);
  if (!validation.ok) {
    return NextResponse.json(
      { ok: false, error: validation.error, code: validation.code },
      { status: validation.code === "invalid_request" ? 400 : 422 },
    );
  }

  if (!isGenieEnabled()) {
    return NextResponse.json(
      {
        ok: false,
        error: "Genie enquiries are currently unavailable.",
        code: "genie_disabled",
      },
      { status: 503 },
    );
  }

  if (!isZohoConfigured()) {
    return safeCrmErrorResponse();
  }

  if (!isEnquiryNotificationConfigured()) {
    return NextResponse.json(
      {
        ok: false,
        error: "Genie enquiries are not fully configured.",
        code: "notification_not_configured",
      },
      { status: 503 },
    );
  }

  const clientKey = getEnquiryClientKey(request);
  if (!checkGenieEnquiryRateLimit(clientKey)) {
    return NextResponse.json(
      {
        ok: false,
        error: "Too many requests. Please wait a moment and try again.",
        code: "rate_limited",
      },
      { status: 429 },
    );
  }

  try {
    await processGenieEnquiry(validation.data);

    return NextResponse.json({
      ok: true,
      message: SUCCESS_MESSAGE,
    });
  } catch (error) {
    if (error instanceof GenieEnquiryNotificationError) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "Your request was saved, but we couldn't notify our team automatically. Please contact us directly if you need urgent help.",
          code: error.code,
        },
        { status: error.httpStatus },
      );
    }

    if (
      error instanceof ZohoConfigurationError ||
      error instanceof ZohoOAuthError ||
      error instanceof ZohoCrmApiError
    ) {
      return safeCrmErrorResponse();
    }

    return NextResponse.json(
      {
        ok: false,
        error:
          "We couldn't submit your request right now. Please try again shortly.",
        code: "internal_error",
      },
      { status: 500 },
    );
  }
}
