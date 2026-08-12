import { NextResponse } from "next/server";
import { isGenieEnabled } from "@/config/genie";

export const runtime = "nodejs";

/** Always evaluate GENIE_ENABLED at request time (not static build time). */
export const dynamic = "force-dynamic";

export async function GET(): Promise<NextResponse<{ enabled: boolean }>> {
  return NextResponse.json({ enabled: isGenieEnabled() });
}
