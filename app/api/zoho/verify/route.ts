import { NextResponse } from "next/server";
import { isZohoConfigured } from "@/lib/zoho/config";
import {
  verifyContactsModuleAccess,
  verifyLeadsModuleAccess,
} from "@/lib/zoho/crm-client";
import {
  ZohoConfigurationError,
  ZohoCrmApiError,
  ZohoOAuthError,
} from "@/lib/zoho/errors";
import {
  assertZohoSetupAuthorized,
  getZohoSetupSecretFromRequest,
} from "@/lib/zoho/setup-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type VerifyFailureResponse = {
  ok: false;
  configured: boolean;
  leadsAccess: boolean;
  contactsAccess: boolean;
  failedCheck: "leads" | "contacts";
  error: string;
  code?: string;
};

function verificationFailureResponse(
  options: VerifyFailureResponse,
  status: number,
): NextResponse {
  return NextResponse.json(options, { status });
}

function mapVerificationError(error: unknown): {
  message: string;
  code?: string;
  status: number;
} {
  if (error instanceof ZohoOAuthError) {
    return {
      message: error.message,
      code: error.code,
      status: error.httpStatus,
    };
  }

  if (error instanceof ZohoCrmApiError) {
    return {
      message: error.message,
      code: error.code,
      status: error.httpStatus,
    };
  }

  return {
    message: "Zoho verification failed.",
    status: 500,
  };
}

/**
 * Temporary internal endpoint — verifies Zoho OAuth + Leads/Contacts module access.
 * Protect with ZOHO_OAUTH_SETUP_SECRET. Remove or disable after setup.
 */
export async function GET(request: Request): Promise<NextResponse> {
  try {
    assertZohoSetupAuthorized(getZohoSetupSecretFromRequest(request));

    if (!isZohoConfigured()) {
      throw new ZohoConfigurationError(
        "Zoho CRM is not fully configured. Set all required ZOHO_* environment variables.",
      );
    }

    try {
      await verifyLeadsModuleAccess();
    } catch (error) {
      const mapped = mapVerificationError(error);
      return verificationFailureResponse(
        {
          ok: false,
          configured: true,
          leadsAccess: false,
          contactsAccess: false,
          failedCheck: "leads",
          error: mapped.message,
          code: mapped.code,
        },
        mapped.status,
      );
    }

    try {
      await verifyContactsModuleAccess();
    } catch (error) {
      const mapped = mapVerificationError(error);
      return verificationFailureResponse(
        {
          ok: false,
          configured: true,
          leadsAccess: true,
          contactsAccess: false,
          failedCheck: "contacts",
          error: mapped.message,
          code: mapped.code,
        },
        mapped.status,
      );
    }

    return NextResponse.json({
      ok: true,
      configured: true,
      leadsAccess: true,
      contactsAccess: true,
    });
  } catch (error) {
    if (error instanceof ZohoOAuthError) {
      return NextResponse.json(
        { ok: false, error: error.message, code: error.code },
        { status: error.httpStatus },
      );
    }

    if (error instanceof ZohoConfigurationError) {
      return NextResponse.json(
        { ok: false, error: error.message, code: error.code },
        { status: 503 },
      );
    }

    return NextResponse.json(
      { ok: false, error: "Zoho verification failed." },
      { status: 500 },
    );
  }
}
