"use client";

import { resourcesPage } from "@/content/resources";
import { ReleaseTimeline } from "@/components/resources/ReleaseTimeline";
import { ScrollReveal } from "@/components/features/ScrollReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Section } from "@/components/ui/Section";

export function LatestProductUpdates() {
  const { productUpdates } = resourcesPage;

  return (
    <Section background="surface" id="product-updates">
      <ScrollReveal>
        <SectionHeader
          title={productUpdates.headline}
          description={productUpdates.description}
          align="left"
          className="max-w-xl"
        />
      </ScrollReveal>

      <ScrollReveal className="mt-12 lg:mt-16">
        <ReleaseTimeline entries={productUpdates.entries} />
      </ScrollReveal>
    </Section>
  );
}
