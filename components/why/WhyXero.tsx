"use client";

import Image from "next/image";
import { Check } from "lucide-react";
import { whyPage } from "@/content/why";
import { ScrollReveal } from "@/components/features/ScrollReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Container } from "@/components/ui/Container";

export function WhyXero() {
  const { builtAlongsideXero } = whyPage;
  const { xeroConnectedBadge } = builtAlongsideXero;

  return (
    <section className="border-y border-muted/15 bg-surface py-[72px] md:py-24 lg:py-[120px]">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
          <div>
            <ScrollReveal>
              <SectionHeader
                eyebrow={builtAlongsideXero.eyebrow}
                title={builtAlongsideXero.headline}
                description={builtAlongsideXero.description}
                align="left"
                className="max-w-xl"
              />
            </ScrollReveal>

            <ScrollReveal className="mt-8 max-w-xl">
              <div className="space-y-5 text-base leading-relaxed text-portal-navy/75 sm:text-lg">
                {builtAlongsideXero.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal className="mt-8">
              <ul className="flex flex-col gap-3">
                {builtAlongsideXero.highlights.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-sm text-portal-navy/75 sm:text-base"
                  >
                    <Check
                      className="mt-0.5 size-4 shrink-0 text-portal-teal"
                      strokeWidth={2}
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </div>

          <ScrollReveal className="flex justify-center lg:justify-end">
            <div className="relative flex w-full max-w-sm items-center justify-center rounded-card border border-muted/20 bg-background p-10 sm:p-12 lg:max-w-md">
              <div
                className="pointer-events-none absolute inset-0 rounded-card bg-gradient-to-br from-portal-blue/5 via-transparent to-portal-teal/5"
                aria-hidden="true"
              />
              <Image
                src={xeroConnectedBadge.src}
                alt={xeroConnectedBadge.alt}
                width={xeroConnectedBadge.width}
                height={xeroConnectedBadge.height}
                className="relative h-auto w-[180px] sm:w-[220px]"
              />
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}
