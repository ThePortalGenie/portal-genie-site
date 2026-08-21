import type { Metadata } from "next";
import { noIndexPageMetadata } from "@/config/seo";
import { ClientPortalSimulator } from "@/modules/client-portal-simulator";

export const metadata: Metadata = noIndexPageMetadata({
  title: "Client Portal Demo (Internal) | The Portal Genie",
  description:
    "Internal developer access to The Portal Genie client portal demo simulator.",
});

export default function InternalClientPortalPage() {
  return <ClientPortalSimulator mode="internal" />;
}
