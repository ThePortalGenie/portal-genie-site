"use client";

import { customerSuccessPage } from "@/content/customer-success";
import { ScrollReveal } from "@/components/features/ScrollReveal";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";

export function CustomerSuccessCta() {
  const { finalCta } = customerSuccessPage;

  return (
    <section className="bg-surface py-[72px] md:py-24 lg:py-[120px]">
      <Container>
        <ScrollReveal>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-portal-navy sm:text-4xl">
              {finalCta.headline}
            </h2>
            <p className="mt-6 text-base leading-relaxed text-portal-navy/75 sm:text-lg">
              {finalCta.description}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:items-center sm:justify-center">
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
