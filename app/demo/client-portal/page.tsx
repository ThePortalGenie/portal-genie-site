import type { Metadata } from "next";
import { noIndexPageMetadata } from "@/config/seo";
import { ClientPortalDemo } from "@/components/demo/client-portal/ClientPortalDemo";
import { DemoAccessGate } from "@/components/demo-access/DemoAccessGate";
import { getVerifiedDemoSession } from "@/lib/demo-auth/session";

export const metadata: Metadata = noIndexPageMetadata({
  title: "Client Portal Demo | The Portal Genie",
  description:
    "Interactive demonstration of The Portal Genie client portal for prospective customers.",
});

export default async function ClientPortalDemoPage() {
  const session = await getVerifiedDemoSession();

  if (session?.verified) {
    return <ClientPortalDemo />;
  }

  return <DemoAccessGate />;
}
