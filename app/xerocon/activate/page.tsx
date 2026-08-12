import type { Metadata } from "next";
import { noIndexPageMetadata } from "@/config/seo";
import { site } from "@/config/site";
import { xeroconPage } from "@/content/xerocon";
import { XeroconActivate } from "@/components/xerocon/XeroconActivate";

export const metadata: Metadata = noIndexPageMetadata({
  title: `${xeroconPage.activate.metadata.title} | ${site.title}`,
  description: xeroconPage.activate.metadata.description,
});

export default function XeroconActivatePage() {
  return <XeroconActivate />;
}
