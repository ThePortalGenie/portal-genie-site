import type { Metadata } from "next";
import { FeaturesCta } from "@/components/features/FeaturesCta";
import { FeaturesHero } from "@/components/features/FeaturesHero";
import { FeatureNavigation } from "@/components/features/FeatureNavigation";
import { FeatureSections } from "@/components/features/FeatureSections";
import { TrustedByLogos } from "@/components/shared/TrustedByLogos";
import { trustedByPlacements } from "@/content/client-logos";
import { indexablePageMetadata } from "@/config/seo";

export const metadata: Metadata = indexablePageMetadata("/features", {
  title: "Client Portal Software Features | The Portal Genie",
  description:
    "Explore The Portal Genie's client portal software features, including document management, customer communication, online payments, branding, security and self-service.",
});

export default function FeaturesPage() {
  return (
    <main>
      <FeaturesHero />
      <FeatureNavigation />
      <FeatureSections />
      <TrustedByLogos {...trustedByPlacements.features} />
      <FeaturesCta />
    </main>
  );
}
