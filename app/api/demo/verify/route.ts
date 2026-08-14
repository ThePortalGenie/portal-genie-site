import { NextResponse } from "next/server";
import { DEMO_SESSION_COOKIE_NAME } from "@/config/demo-access";
import { getDemoSessionCookieOptions } from "@/lib/demo-auth/session";
import {
  processDemoVerificationToken,
  type DemoVerifyFailureReason,
} from "@/lib/demo-auth/verify-token";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function getClientPortalRedirectUrl(request: Request): URL {
  return new URL("/demo/client-portal", request.url);
}

function getVerifyErrorRedirectUrl(
  request: Request,
  reason: DemoVerifyFailureReason,
): URL {
  const url = new URL("/demo/verify", request.url);
  url.searchParams.set("error", reason);
  return url;
}

export async function GET(request: Request): Promise<NextResponse> {
  console.log("[demo-verify] handler reached");

  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");

  if (!token?.trim()) {
    console.log("[demo-verify] verification failed: missing");
    return NextResponse.redirect(getVerifyErrorRedirectUrl(request, "missing"));
  }

  const result = await processDemoVerificationToken(token);

  if (result.ok && "alreadyVerified" in result) {
    console.log("[demo-verify] token accepted");
    console.log("[demo-verify] redirecting to portal");
    return NextResponse.redirect(getClientPortalRedirectUrl(request));
  }

  if (result.ok && "sessionId" in result) {
    console.log("[demo-verify] token accepted");
    console.log("[demo-verify] verification consumed");
    console.log("[demo-verify] session created");

    const response = NextResponse.redirect(getClientPortalRedirectUrl(request));
    response.cookies.set(
      DEMO_SESSION_COOKIE_NAME,
      result.sessionId,
      getDemoSessionCookieOptions(),
    );

    console.log("[demo-verify] cookie attached");
    console.log("[demo-verify] redirecting to portal");
    return response;
  }

  console.log(`[demo-verify] verification failed: ${result.reason}`);
  return NextResponse.redirect(getVerifyErrorRedirectUrl(request, result.reason));
}
