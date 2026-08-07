"use client";

import Image from "next/image";
import { customerSuccessPage } from "@/content/customer-success";
import { ScrollReveal } from "@/components/features/ScrollReveal";
import { Section } from "@/components/ui/Section";

export function VerifiedXeroSection() {
  const { verified } = customerSuccessPage;

  return (
    <Section background="background" className="!py-10 md:!py-14 lg:!py-16">
      <ScrollReveal>
        <div className="grid items-center gap-6 md:gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="mx-auto max-w-xl text-center lg:mx-0 lg:text-left">
            <h2 className="text-[1.75rem] font-semibold tracking-tight text-portal-navy sm:text-3xl md:text-4xl">
              {verified.headline}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-portal-navy/75 sm:mt-5 sm:text-lg">
              {verified.description}
            </p>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="relative flex w-full max-w-sm items-center justify-center rounded-card border border-muted/20 bg-surface p-6 sm:p-8 md:p-10">
              <div
                className="pointer-events-none absolute inset-0 rounded-card bg-gradient-to-br from-portal-blue/5 via-transparent to-portal-teal/5"
                aria-hidden="true"
              />
              <Image
                src="/images/logos/optimized/xero-connected-app-badge.webp"
                alt="Xero Connected App"
                width={512}
                height={288}
                className="relative h-auto w-[140px] sm:w-[180px] md:w-[220px]"
              />
            </div>
          </div>
        </div>
      </ScrollReveal>
    </Section>
  );
}
