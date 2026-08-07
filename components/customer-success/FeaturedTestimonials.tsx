"use client";

import Link from "next/link";
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
          className="mx-auto max-w-xl text-center md:mx-0 md:text-left"
        />

        {testimonials.relatedLink ? (
          <p className="mx-auto mt-4 max-w-xl text-center text-sm sm:text-base md:mx-0 md:text-left">
            <Link
              href={testimonials.relatedLink.href}
              className="font-medium text-portal-blue transition-colors duration-200 hover:text-portal-blue/80"
            >
              {testimonials.relatedLink.label}
            </Link>
          </p>
        ) : null}
      </ScrollReveal>

      <div
        ref={ref}
        className="mt-8 grid gap-5 sm:mt-10 md:mt-12 md:grid-cols-2 md:gap-6 lg:gap-8 xl:grid-cols-3"
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
