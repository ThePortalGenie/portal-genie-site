import type { Metadata } from "next";
import { noIndexPageMetadata } from "@/config/seo";
import { ClientPortalDemo } from "@/components/demo/client-portal/ClientPortalDemo";

export const metadata: Metadata = noIndexPageMetadata({
  title: "Client Portal Demo | The Portal Genie",
  description:
    "Interactive demonstration of The Portal Genie client portal for prospective customers.",
});

export default function ClientPortalDemoPage() {
  return <ClientPortalDemo />;
}
