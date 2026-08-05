"use client";

import { resourcesPage } from "@/content/resources";
import { ScrollReveal } from "@/components/features/ScrollReveal";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";

export function ResourcesCta() {
  const { finalCta } = resourcesPage;

  return (
    <section className="bg-background py-12 md:py-20 lg:py-[120px]">
      <Container>
        <ScrollReveal>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-[1.75rem] font-semibold tracking-tight text-portal-navy sm:text-3xl md:text-4xl">
              {finalCta.headline}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-portal-navy/75 sm:mt-6 sm:text-lg">
              {finalCta.description}
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:items-center sm:justify-center md:mt-10">
              <ButtonLink
                href={finalCta.primaryCta.href}
                variant="primary"
                className="w-full sm:w-auto"
              >
                {finalCta.primaryCta.label}
              </ButtonLink>
              <ButtonLink
                href={finalCta.secondaryCta.href}
                variant="secondary"
                className="w-full sm:w-auto"
              >
                {finalCta.secondaryCta.label}
              </ButtonLink>
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
