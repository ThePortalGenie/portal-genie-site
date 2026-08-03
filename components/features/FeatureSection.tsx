"use client";

import Image from "next/image";
import { Check } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { BrowserFrame } from "@/components/ui/product-showcase/BrowserFrame";
import { ScrollReveal } from "@/components/features/ScrollReveal";
import { FeatureScreenshot } from "@/components/features/FeatureScreenshot";

type FeatureSectionProps = {
  id: string;
  title: string;
  description: string;
  benefits: readonly string[];
  screenshot: {
    src: string;
    alt: string;
    aspectRatio: string;
    framed?: boolean;
    emphasis?: "visual";
  };
  imagePosition: "left" | "right";
  background?: "background" | "surface";
};

export function FeatureSection({
  id,
  title,
  description,
  benefits,
  screenshot,
  imagePosition,
  background = "background",
}: FeatureSectionProps) {
  const isImageRight = imagePosition === "right";
  const showBrowserFrame = screenshot.framed !== false;
  const visualEmphasis = screenshot.emphasis === "visual";

  const gridClass = visualEmphasis
    ? "grid items-center gap-10 md:gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-12 xl:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] xl:gap-14"
    : "grid items-center gap-12 lg:grid-cols-2 lg:gap-16";

  return (
    <Section id={id} background={background} className="scroll-mt-[8.5rem] lg:scroll-mt-36">
      <ScrollReveal>
        <div className={gridClass}>
          <div
            className={
              showBrowserFrame
                ? isImageRight
                  ? "order-2 lg:order-1"
                  : "order-2 lg:order-2"
                : isImageRight
                  ? "order-1 lg:order-1"
                  : "order-1 lg:order-2"
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
              showBrowserFrame
                ? isImageRight
                  ? "order-1 lg:order-2"
                  : "order-1 lg:order-1"
                : isImageRight
                  ? "order-2 lg:order-2"
                  : "order-2 lg:order-1"
            }
          >
            {showBrowserFrame ? (
              <BrowserFrame>
                <FeatureScreenshot
                  src={screenshot.src}
                  alt={screenshot.alt}
                  aspectRatio={screenshot.aspectRatio}
                />
              </BrowserFrame>
            ) : (
              <div className="w-full overflow-hidden">
                <Image
                  src={screenshot.src}
                  alt={screenshot.alt}
                  width={1536}
                  height={1024}
                  quality={90}
                  className="h-auto w-full max-w-full object-contain"
                  sizes={
                    visualEmphasis
                      ? "(max-width: 1023px) 100vw, 55vw"
                      : "(max-width: 1023px) 100vw, 50vw"
                  }
                />
              </div>
            )}
          </div>
        </div>
      </ScrollReveal>
    </Section>
  );
}
