import type { Metadata } from "next";
import { noIndexPageMetadata } from "@/config/seo";
import { ClientPortalDemo } from "@/components/demo/client-portal/ClientPortalDemo";

export const metadata: Metadata = noIndexPageMetadata({
  title: "Client Portal Demo (Internal) | The Portal Genie",
  description:
    "Internal developer access to The Portal Genie client portal demo simulator.",
});

export default function InternalClientPortalPage() {
  return <ClientPortalDemo mode="internal" />;
}
