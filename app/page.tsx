import type { Metadata } from "next";
import { BeyondTransaction } from "@/components/homepage/BeyondTransaction";
import { CustomerExperience } from "@/components/homepage/CustomerExperience";
import { Features } from "@/components/homepage/Features";
import { Hero } from "@/components/homepage/Hero";
import { PlatformOverview } from "@/components/homepage/PlatformOverview";
import { TrustBar } from "@/components/homepage/TrustBar";
import { ValueExtension } from "@/components/homepage/ValueExtension";
import { indexablePageMetadata } from "@/config/seo";
// Temporarily hidden on homepage — restore when ready:
// import { TrustedByLogos } from "@/components/shared/TrustedByLogos";
// import { trustedByPlacements } from "@/content/client-logos";

export const metadata: Metadata = indexablePageMetadata("/", {
  title: "Customer Portal for Xero Businesses | The Portal Genie",
  description:
    "The Portal Genie helps Xero businesses deliver a secure, branded customer portal for documents, communication and payments — without changing how your team works.",
});

export default function Home() {
  return (
    <main>
      <Hero />
      {/* <TrustedByLogos {...trustedByPlacements.homepage} /> */}
      <TrustBar />
      <ValueExtension />
      <PlatformOverview />
      <CustomerExperience />
      <BeyondTransaction />
      <Features />
    </main>
  );
}
