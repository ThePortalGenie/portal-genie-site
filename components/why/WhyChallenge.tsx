"use client";

import Link from "next/link";
import { whyPage } from "@/content/why";
import { ScrollReveal } from "@/components/features/ScrollReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Container } from "@/components/ui/Container";
import { useScrollReveal, SCROLL_REVEAL_STAGGER_MS } from "@/hooks/useScrollReveal";

export function WhyChallenge() {
  const { challenge } = whyPage;
  const { ref: listRef, isVisible } = useScrollReveal(0.1);

  return (
    <section className="border-y border-muted/15 bg-surface">
      <Container>
        <ScrollReveal>
          <SectionHeader
            eyebrow={challenge.eyebrow}
            title={challenge.headline}
            align="left"
            className="pt-12 md:pt-16"
          />
          <p className="mt-6 max-w-xl text-base leading-relaxed text-portal-navy/75 sm:text-lg lg:max-w-2xl">
            {challenge.description}
          </p>
        </ScrollReveal>

        <div ref={listRef}>
          <ul className="mt-12 grid gap-8 md:grid-cols-2 md:gap-x-12 md:gap-y-10 lg:mt-16">
            {challenge.points.map((point, index) => (
              <li
                key={point.title}
                className={[
                  "border-l-2 border-portal-blue/20 pl-6 transition-all duration-500 motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none",
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
                ].join(" ")}
                style={{
                  transitionDelay: isVisible
                    ? `${index * SCROLL_REVEAL_STAGGER_MS}ms`
                    : undefined,
                }}
              >
                <h3 className="text-base font-semibold text-portal-navy sm:text-lg">
                  {point.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-portal-navy/75 sm:text-base">
                  {point.description}
                </p>
              </li>
            ))}
          </ul>

          {challenge.relatedLink ? (
            <p className="mt-6 pb-12 text-sm sm:pb-16 sm:text-base md:pb-16">
              <Link
                href={challenge.relatedLink.href}
                className="font-medium text-portal-blue transition-colors duration-200 hover:text-portal-blue/80"
              >
                {challenge.relatedLink.label}
              </Link>
            </p>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
