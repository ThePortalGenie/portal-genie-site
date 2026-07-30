import { Hero } from "@/components/homepage/Hero";
import { PlatformOverview } from "@/components/homepage/PlatformOverview";
import { TrustBar } from "@/components/homepage/TrustBar";
import { ValueExtension } from "@/components/homepage/ValueExtension";

export default function Home() {
  return (
    <main>
      <Hero />
      <TrustBar />
      <ValueExtension />
      <PlatformOverview />
    </main>
  );
}
