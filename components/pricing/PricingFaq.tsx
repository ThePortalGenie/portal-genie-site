"use client";

import { pricingPage } from "@/content/pricing";
import { ScrollReveal } from "@/components/features/ScrollReveal";
import { Accordion } from "@/components/ui/Accordion";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function PricingFaq() {
  const { faq } = pricingPage;

  return (
    <section className="bg-surface py-12 md:py-20 lg:py-[120px]">
      <Container>
        <ScrollReveal>
          <SectionHeader
            title={faq.headline}
            align="left"
            className="mx-auto max-w-2xl text-center md:mx-0 md:text-left"
          />
          <div className="mt-8 max-w-3xl md:mt-10">
            <Accordion items={faq.items} />
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
