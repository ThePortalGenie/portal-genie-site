import type { Metadata } from "next";
import { FeaturesHero } from "@/components/features/FeaturesHero";
import { FeatureNavigation } from "@/components/features/FeatureNavigation";
import { FeatureSections } from "@/components/features/FeatureSections";
import { TrustedByLogos } from "@/components/shared/TrustedByLogos";
import { trustedByPlacements } from "@/content/client-logos";
import { indexablePageMetadata } from "@/config/seo";

export const metadata: Metadata = indexablePageMetadata("/features", {
  title: "Portal Genie Features | Customer Portal, Documents & Payments",
  description:
    "Explore Portal Genie features including a customer portal, document management, online payments, branding, communication and security for businesses using Xero.",
});

export default function FeaturesPage() {
  return (
    <main>
      <FeaturesHero />
      <FeatureNavigation />
      <FeatureSections />
      <TrustedByLogos {...trustedByPlacements.features} />
    </main>
  );
}
