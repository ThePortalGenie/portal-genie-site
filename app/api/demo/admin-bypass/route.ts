import { NextResponse } from "next/server";
import {
  createAdminDemoSessionInRedis,
  DEMO_ADMIN_SESSION_COOKIE_NAME,
  getAdminDemoSessionCookieOptions,
  isValidAdminBypassToken,
} from "@/lib/demo-auth/admin-session";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function getClientPortalRedirectUrl(request: Request): URL {
  return new URL("/demo/client-portal", request.url);
}

export async function GET(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token") ?? "";
  const redirectUrl = getClientPortalRedirectUrl(request);

  if (!isValidAdminBypassToken(token)) {
    return NextResponse.redirect(redirectUrl);
  }

  const sessionId = await createAdminDemoSessionInRedis();
  if (!sessionId) {
    return NextResponse.redirect(redirectUrl);
  }

  const response = NextResponse.redirect(redirectUrl);
  response.cookies.set(
    DEMO_ADMIN_SESSION_COOKIE_NAME,
    sessionId,
    getAdminDemoSessionCookieOptions(),
  );

  return response;
}
