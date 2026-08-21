import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { noIndexPageMetadata } from "@/config/seo";
import { ClientPortalSimulator } from "@/modules/client-portal-simulator";
import { DemoAccessGate } from "@/components/demo-access/DemoAccessGate";
import { hasValidAdminDemoSession } from "@/lib/demo-auth/admin-session";
import { getVerifiedDemoSession } from "@/lib/demo-auth/session";

export const metadata: Metadata = noIndexPageMetadata({
  title: "Client Portal Demo | The Portal Genie",
  description:
    "Interactive demonstration of The Portal Genie client portal for prospective customers.",
});

export default async function ClientPortalDemoPage({
  searchParams,
}: {
  searchParams: Promise<{ admin_bypass?: string }>;
}) {
  const params = await searchParams;

  if (params.admin_bypass) {
    const query = new URLSearchParams({ token: params.admin_bypass });
    redirect(`/api/demo/admin-bypass?${query.toString()}`);
  }

  const [verifiedSession, adminSession] = await Promise.all([
    getVerifiedDemoSession(),
    hasValidAdminDemoSession(),
  ]);

  if (verifiedSession?.verified || adminSession) {
    return <ClientPortalSimulator mode="public" />;
  }

  return <DemoAccessGate />;
}
