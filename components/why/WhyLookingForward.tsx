"use client";

import { whyPage } from "@/content/why";
import { ScrollReveal } from "@/components/features/ScrollReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Section } from "@/components/ui/Section";

export function WhyLookingForward() {
  const { lookingForward } = whyPage;

  return (
    <Section background="surface">
      <ScrollReveal>
        <SectionHeader
          eyebrow={lookingForward.eyebrow}
          title={lookingForward.headline}
          align="left"
          className="max-w-2xl"
        />
      </ScrollReveal>

      <ScrollReveal className="mt-10 max-w-3xl lg:mt-12">
        <div className="space-y-6 text-base leading-relaxed text-portal-navy/75 sm:text-lg">
          {lookingForward.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </ScrollReveal>
    </Section>
  );
}
