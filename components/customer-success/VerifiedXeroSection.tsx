"use client";

import Image from "next/image";
import { customerSuccessPage } from "@/content/customer-success";
import { ScrollReveal } from "@/components/features/ScrollReveal";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Section } from "@/components/ui/Section";

export function VerifiedXeroSection() {
  const { verified } = customerSuccessPage;

  return (
    <Section background="background">
      <ScrollReveal>
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
          <div className="mx-auto max-w-xl text-center lg:mx-0 lg:text-left">
            <h2 className="text-[1.75rem] font-semibold tracking-tight text-portal-navy sm:text-3xl md:text-4xl">
              {verified.headline}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-portal-navy/75 sm:mt-6 sm:text-lg">
              {verified.description}
            </p>
            <ButtonLink
              href={verified.cta.href}
              variant="primary"
              className="mt-6 w-full sm:mt-8 sm:w-auto"
              target="_blank"
              rel="noopener noreferrer"
            >
              {verified.cta.label}
            </ButtonLink>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="relative flex w-full max-w-sm items-center justify-center rounded-card border border-muted/20 bg-surface p-6 sm:p-10 md:p-12">
              <div
                className="pointer-events-none absolute inset-0 rounded-card bg-gradient-to-br from-portal-blue/5 via-transparent to-portal-teal/5"
                aria-hidden="true"
              />
              <Image
                src="/images/logos/xero-connected-app-badge.png"
                alt="Xero Connected App"
                width={1920}
                height={1080}
                className="relative h-auto w-[140px] sm:w-[180px] md:w-[220px]"
              />
            </div>
          </div>
        </div>
      </ScrollReveal>
    </Section>
  );
}
