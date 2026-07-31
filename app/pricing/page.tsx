import type { Metadata } from "next";
import { PricingHero } from "@/components/pricing/PricingHero";
import { PricingValueIntro } from "@/components/pricing/PricingValueIntro";
import { PricingTableSection } from "@/components/pricing/PricingTableSection";
import { PricingFaq } from "@/components/pricing/PricingFaq";
import { PricingCta } from "@/components/pricing/PricingCta";
import { pricingPage } from "@/content/pricing";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: `${pricingPage.metadata.title} | ${site.title}`,
  description: pricingPage.metadata.description,
  openGraph: {
    title: pricingPage.metadata.openGraph.title,
    description: pricingPage.metadata.openGraph.description,
  },
};

export default function PricingPage() {
  return (
    <main>
      <PricingHero />
      <PricingValueIntro />
      <PricingTableSection />
      <PricingFaq />
      <PricingCta />
    </main>
  );
}
