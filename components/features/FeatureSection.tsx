"use client";

import { Check } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { BrowserFrame } from "@/components/ui/product-showcase/BrowserFrame";
import { ScrollReveal } from "@/components/features/ScrollReveal";
import { ScreenshotPlaceholder } from "@/components/features/ScreenshotPlaceholder";

type FeatureSectionProps = {
  id: string;
  title: string;
  description: string;
  benefits: readonly string[];
  placeholderLabel: string;
  imagePosition: "left" | "right";
  background?: "background" | "surface";
};

export function FeatureSection({
  id,
  title,
  description,
  benefits,
  placeholderLabel,
  imagePosition,
  background = "background",
}: FeatureSectionProps) {
  const isImageRight = imagePosition === "right";

  return (
    <Section id={id} background={background} className="scroll-mt-[8.5rem] lg:scroll-mt-36">
      <ScrollReveal>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div
            className={
              isImageRight ? "order-2 lg:order-1" : "order-2 lg:order-2"
            }
          >
            <SectionHeader align="left" title={title} description={description} />

            <ul className="mt-8 flex flex-col gap-2.5">
              {benefits.map((benefit) => (
                <li
                  key={benefit}
                  className="flex items-start gap-2.5 text-sm text-portal-navy/70 sm:text-base"
                >
                  <Check
                    className="mt-0.5 size-4 shrink-0 text-portal-teal"
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          <div
            className={
              isImageRight ? "order-1 lg:order-2" : "order-1 lg:order-1"
            }
          >
            <BrowserFrame>
              <ScreenshotPlaceholder label={placeholderLabel} />
            </BrowserFrame>
          </div>
        </div>
      </ScrollReveal>
    </Section>
  );
}
