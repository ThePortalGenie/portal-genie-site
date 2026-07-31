import type { Metadata } from "next";
import { CustomerSuccessHero } from "@/components/customer-success/CustomerSuccessHero";
import { SatisfactionOverview } from "@/components/customer-success/SatisfactionOverview";
import { FeaturedTestimonials } from "@/components/customer-success/FeaturedTestimonials";
import { CommonThemes } from "@/components/customer-success/CommonThemes";
import { VerifiedXeroSection } from "@/components/customer-success/VerifiedXeroSection";
import { CustomerSuccessCta } from "@/components/customer-success/CustomerSuccessCta";
import { customerSuccessPage } from "@/content/customer-success";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: `${customerSuccessPage.metadata.title} | ${site.title}`,
  description: customerSuccessPage.metadata.description,
  openGraph: {
    title: customerSuccessPage.metadata.openGraph.title,
    description: customerSuccessPage.metadata.openGraph.description,
  },
};

export default function CustomerSuccessPage() {
  return (
    <main>
      <CustomerSuccessHero />
      <SatisfactionOverview />
      <FeaturedTestimonials />
      <CommonThemes />
      <VerifiedXeroSection />
      <CustomerSuccessCta />
    </main>
  );
}
