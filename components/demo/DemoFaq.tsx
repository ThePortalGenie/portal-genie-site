"use client";

import { demoPage } from "@/content/demo";
import { ScrollReveal } from "@/components/features/ScrollReveal";
import { Accordion } from "@/components/ui/Accordion";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function DemoFaq() {
  const { faq } = demoPage;

  return (
    <section className="bg-surface py-[72px] md:py-24 lg:py-[120px]">
      <Container>
        <ScrollReveal>
          <SectionHeader title={faq.headline} align="left" className="max-w-2xl" />
          <div className="mt-10 max-w-3xl">
            <Accordion items={faq.items} />
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
