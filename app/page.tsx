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
  title:
    "Client Portal Software for Xero, QuickBooks & Sage | The Portal Genie",
  description:
    "Give customers secure 24/7 access to invoices, statements, documents and payments with branded client portal software connected to Xero, QuickBooks and Sage.",
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
