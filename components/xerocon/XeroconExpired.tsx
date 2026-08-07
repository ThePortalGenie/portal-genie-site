import Image from "next/image";
import Link from "next/link";
import { xeroconCampaign } from "@/config/xerocon";
import { site } from "@/config/site";
import { xeroconPage } from "@/content/xerocon";
import { TrackedButtonLink } from "@/components/analytics/TrackedButtonLink";
import { TrackedLoginLink } from "@/components/analytics/TrackedLoginLink";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";

export function XeroconExpired() {
  const { expired, header } = xeroconPage;

  return (
    <div className="flex min-h-full flex-col bg-background">
      <header className="border-b border-muted/15 bg-surface">
        <Container>
          <div className="flex h-14 items-center justify-between gap-4 sm:h-16">
            <Link
              href={xeroconCampaign.links.home}
              className="flex shrink-0 items-center"
              aria-label={site.logo.ariaLabel}
            >
              <Image
                src={site.logo.src}
                alt={site.logo.alt}
                width={site.logo.width}
                height={site.logo.height}
                className="h-auto max-h-10 w-auto sm:max-h-11"
                priority
              />
            </Link>
            <TrackedLoginLink
              href={header.loginHref}
              ctaLocation="xerocon_hero"
              className="hidden text-sm font-medium text-portal-navy transition-colors duration-200 hover:text-portal-blue sm:inline"
            >
              {header.loginLabel}
            </TrackedLoginLink>
          </div>
        </Container>
      </header>

      <main className="flex flex-1 items-center py-16 sm:py-24">
        <Container>
          <div className="mx-auto max-w-lg text-center">
            <p className="inline-flex items-center rounded-badge bg-portal-blue/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-portal-blue">
              {expired.eyebrow}
            </p>
            <h1 className="mt-5 text-2xl font-semibold tracking-tight text-portal-navy sm:text-3xl">
              {expired.headline}
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-portal-navy/70 sm:text-base">
              {expired.description}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <ButtonLink
                href={expired.primaryCta.href}
                className="w-full sm:w-auto sm:min-w-[12rem]"
              >
                {expired.primaryCta.label}
              </ButtonLink>
              <TrackedButtonLink
                href={expired.secondaryCta.href}
                variant="secondary"
                className="w-full sm:w-auto sm:min-w-[12rem]"
                track={{ type: "book_demo", ctaLocation: "xerocon_hero" }}
              >
                {expired.secondaryCta.label}
              </TrackedButtonLink>
            </div>
          </div>
        </Container>
      </main>
    </div>
  );
}
