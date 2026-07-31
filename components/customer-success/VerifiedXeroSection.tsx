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
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="max-w-xl">
            <h2 className="text-3xl font-semibold tracking-tight text-portal-navy sm:text-4xl">
              {verified.headline}
            </h2>
            <p className="mt-6 text-base leading-relaxed text-portal-navy/75 sm:text-lg">
              {verified.description}
            </p>
            <ButtonLink
              href={verified.cta.href}
              variant="primary"
              className="mt-8 w-full sm:w-auto"
              target="_blank"
              rel="noopener noreferrer"
            >
              {verified.cta.label}
            </ButtonLink>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="relative flex w-full max-w-sm items-center justify-center rounded-card border border-muted/20 bg-surface p-10 sm:p-12">
              <div
                className="pointer-events-none absolute inset-0 rounded-card bg-gradient-to-br from-portal-blue/5 via-transparent to-portal-teal/5"
                aria-hidden="true"
              />
              <Image
                src="/images/logos/xero-connected-app-badge.png"
                alt="Xero Connected App"
                width={1920}
                height={1080}
                className="relative h-auto w-[180px] sm:w-[220px]"
              />
            </div>
          </div>
        </div>
      </ScrollReveal>
    </Section>
  );
}
