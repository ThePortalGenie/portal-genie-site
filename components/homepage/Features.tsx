import { homepage } from "@/content/homepage";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FeaturesGrid } from "@/components/homepage/FeaturesGrid";

export function Features() {
  const { eyebrow, headline, description } = homepage.features;

  return (
    <Section background="background">
      <SectionHeader
        eyebrow={eyebrow}
        title={headline}
        description={description}
      />

      <FeaturesGrid />
    </Section>
  );
}
