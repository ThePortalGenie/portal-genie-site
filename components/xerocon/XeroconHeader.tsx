import Image from "next/image";
import Link from "next/link";
import { xeroconCampaign } from "@/config/xerocon";
import { site } from "@/config/site";
import { xeroconPage } from "@/content/xerocon";
import { TrackedLoginLink } from "@/components/analytics/TrackedLoginLink";
import { Container } from "@/components/ui/Container";

export function XeroconHeader() {
  const { header } = xeroconPage;

  return (
    <header className="border-b border-muted/15 bg-surface">
      <Container className="px-3.5 sm:px-6 md:px-8">
        <div className="flex h-12 min-w-0 items-center justify-between gap-2 sm:h-14 sm:gap-4 md:h-[3.75rem]">
          <Link
            href={xeroconCampaign.links.home}
            className="flex min-w-0 shrink items-center"
            aria-label={site.logo.ariaLabel}
          >
            <Image
              src={site.logo.src}
              alt={site.logo.alt}
              width={site.logo.width}
              height={site.logo.height}
              className="h-auto max-h-9 w-auto sm:max-h-10 md:max-h-11"
              priority
            />
          </Link>

          <p className="shrink-0 text-right text-[11px] leading-tight text-portal-navy/55 min-[360px]:text-xs sm:text-sm">
            <span className="hidden min-[420px]:inline">{header.loginPrompt} </span>
            <TrackedLoginLink
              href={header.loginHref}
              ctaLocation="xerocon_hero"
              className="inline-flex min-h-10 items-center font-medium text-portal-navy transition-colors duration-200 hover:text-portal-blue sm:min-h-11"
            >
              {header.loginLabel}
            </TrackedLoginLink>
          </p>
        </div>
      </Container>
    </header>
  );
}
