import type { Metadata } from "next";
import { isXeroconCampaignActive } from "@/config/xerocon";
import { noIndexPageMetadata } from "@/config/seo";
import { site } from "@/config/site";
import { xeroconPage } from "@/content/xerocon";
import { XeroconCampaign } from "@/components/xerocon/XeroconCampaign";
import { XeroconExpired } from "@/components/xerocon/XeroconExpired";

export const metadata: Metadata = noIndexPageMetadata({
  title: `${xeroconPage.metadata.title} | ${site.title}`,
  description: xeroconPage.metadata.description,
});

export default function XeroconPage() {
  const isActive = isXeroconCampaignActive();

  return isActive ? <XeroconCampaign /> : <XeroconExpired />;
}
