import type { Metadata } from "next";
import { PricingHero } from "@/components/pricing/PricingHero";
import { PricingPlans } from "@/components/pricing/PricingPlans";
import { PricingCompareTable } from "@/components/pricing/PricingCompareTable";
import { PricingFaq } from "@/components/pricing/PricingFaq";
import { PricingCta } from "@/components/pricing/PricingCta";
import { PricingFaqStructuredData } from "@/components/seo/PricingFaqStructuredData";
import { pricingPage } from "@/content/pricing";
import { indexablePageMetadata } from "@/config/seo";
import { site } from "@/config/site";

export const metadata: Metadata = indexablePageMetadata("/pricing", {
  title: `${pricingPage.metadata.title} | ${site.title}`,
  description: pricingPage.metadata.description,
  openGraph: {
    title: pricingPage.metadata.openGraph.title,
    description: pricingPage.metadata.openGraph.description,
  },
});

export default function PricingPage() {
  return (
    <main>
      <PricingFaqStructuredData />
      <PricingHero />
      <PricingPlans />
      <PricingCompareTable />
      <PricingFaq />
      <PricingCta />
    </main>
  );
}
