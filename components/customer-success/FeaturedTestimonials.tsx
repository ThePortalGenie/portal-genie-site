"use client";

import { customerSuccessPage } from "@/content/customer-success";
import { TestimonialCard } from "@/components/customer-success/TestimonialCard";
import { ScrollReveal } from "@/components/features/ScrollReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Section } from "@/components/ui/Section";
import { useScrollReveal, SCROLL_REVEAL_STAGGER_MS } from "@/hooks/useScrollReveal";

export function FeaturedTestimonials() {
  const { testimonials } = customerSuccessPage;
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <Section background="background" id="reviews">
      <ScrollReveal>
        <SectionHeader
          title={testimonials.headline}
          description={testimonials.description}
          align="left"
          className="max-w-xl"
        />
      </ScrollReveal>

      <div
        ref={ref}
        className="mt-12 grid gap-6 md:grid-cols-2 lg:gap-8 xl:grid-cols-3"
      >
        {testimonials.items.map((item, index) => (
          <TestimonialCard
            key={item.name}
            name={item.name}
            title={"title" in item ? item.title : undefined}
            date={item.date}
            excerpt={item.excerpt}
            body={item.body}
            reveal={isVisible}
            revealDelay={index * SCROLL_REVEAL_STAGGER_MS}
          />
        ))}
      </div>
    </Section>
  );
}
