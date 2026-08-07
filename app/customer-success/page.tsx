import type { Metadata } from "next";
import { CustomerSuccessHero } from "@/components/customer-success/CustomerSuccessHero";
import { SatisfactionOverview } from "@/components/customer-success/SatisfactionOverview";
import { FeaturedTestimonials } from "@/components/customer-success/FeaturedTestimonials";
import { CommonThemes } from "@/components/customer-success/CommonThemes";
import { VerifiedXeroSection } from "@/components/customer-success/VerifiedXeroSection";
import { IndustriesServed } from "@/components/customer-success/IndustriesServed";
import { CustomerSuccessCta } from "@/components/customer-success/CustomerSuccessCta";
import { customerSuccessPage } from "@/content/customer-success";
import { indexablePageMetadata } from "@/config/seo";
export const metadata: Metadata = indexablePageMetadata("/customer-success", {
  title: "Portal Genie Customer Stories & Reviews | The Portal Genie",
  description: customerSuccessPage.metadata.description,
  openGraph: {
    title: customerSuccessPage.metadata.openGraph.title,
    description: customerSuccessPage.metadata.openGraph.description,
  },
});

export default function CustomerSuccessPage() {
  return (
    <main>
      <CustomerSuccessHero />
      <SatisfactionOverview />
      <FeaturedTestimonials />
      <CommonThemes />
      <VerifiedXeroSection />
      <IndustriesServed />
      <CustomerSuccessCta />
    </main>
  );
}
