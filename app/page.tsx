import { BeyondTransaction } from "@/components/homepage/BeyondTransaction";
import { CustomerExperience } from "@/components/homepage/CustomerExperience";
import { Features } from "@/components/homepage/Features";
import { Hero } from "@/components/homepage/Hero";
import { PlatformOverview } from "@/components/homepage/PlatformOverview";
import { TrustBar } from "@/components/homepage/TrustBar";
import { ValueExtension } from "@/components/homepage/ValueExtension";
import { TrustedByLogos } from "@/components/shared/TrustedByLogos";
import { trustedByPlacements } from "@/content/client-logos";

export default function Home() {
  return (
    <main>
      <Hero />
      <TrustedByLogos {...trustedByPlacements.homepage} />
      <TrustBar />
      <ValueExtension />
      <PlatformOverview />
      <CustomerExperience />
      <BeyondTransaction />
      <Features />
    </main>
  );
}
