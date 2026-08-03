import type { Metadata } from "next";
import { FeaturesHero } from "@/components/features/FeaturesHero";
import { FeatureNavigation } from "@/components/features/FeatureNavigation";
import { FeatureSections } from "@/components/features/FeatureSections";
import { TrustedByLogos } from "@/components/shared/TrustedByLogos";
import { featuresPage } from "@/content/features";
import { trustedByPlacements } from "@/content/client-logos";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: `Features | ${site.title}`,
  description: featuresPage.hero.description,
};

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
