import type { Metadata } from "next";
import { WhyHero } from "@/components/why/WhyHero";
import { WhyChallenge } from "@/components/why/WhyChallenge";
import { WhyBuilt } from "@/components/why/WhyBuilt";
import { WhyXero } from "@/components/why/WhyXero";
import { WhyPhilosophy } from "@/components/why/WhyPhilosophy";
import { WhyLookingForward } from "@/components/why/WhyLookingForward";
import { WhyCta } from "@/components/why/WhyCta";
import { whyPage } from "@/content/why";
import { indexablePageMetadata } from "@/config/seo";
export const metadata: Metadata = indexablePageMetadata("/why-the-portal-genie", {
  title: "Benefits of Client Portal Software | The Portal Genie",
  description: whyPage.metadata.description,
  openGraph: {
    title: whyPage.metadata.openGraph.title,
    description: whyPage.metadata.openGraph.description,
  },
});

export default function WhyThePortalGeniePage() {
  return (
    <main>
      <WhyHero />
      <WhyChallenge />
      <WhyBuilt />
      <WhyXero />
      <WhyPhilosophy />
      <WhyLookingForward />
      <WhyCta />
    </main>
  );
}
