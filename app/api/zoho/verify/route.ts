import { NextResponse } from "next/server";
import { isZohoConfigured } from "@/lib/zoho/config";
import { verifyLeadsModuleAccess } from "@/lib/zoho/crm-client";
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

/**
 * Temporary internal endpoint — verifies Zoho OAuth + Leads module access.
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

    const leads = await verifyLeadsModuleAccess();

    return NextResponse.json({
      ok: true,
      configured: true,
      leadsModule: leads.module,
      leadsApiName: leads.apiName,
    });
  } catch (error) {
    if (error instanceof ZohoOAuthError) {
      return NextResponse.json(
        { ok: false, error: error.message, code: error.code },
        { status: error.httpStatus },
      );
    }

    if (error instanceof ZohoCrmApiError) {
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
