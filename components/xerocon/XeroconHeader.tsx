import Image from "next/image";
import Link from "next/link";
import { xeroconCampaign } from "@/config/xerocon";
import { site } from "@/config/site";
import { xeroconPage } from "@/content/xerocon";
import { Container } from "@/components/ui/Container";

export function XeroconHeader() {
  const { header } = xeroconPage;

  return (
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

          <p className="text-right text-xs text-portal-navy/55 sm:text-sm">
            <span className="hidden sm:inline">{header.loginPrompt} </span>
            <Link
              href={header.loginHref}
              className="font-medium text-portal-navy transition-colors duration-200 hover:text-portal-blue"
            >
              {header.loginLabel}
            </Link>
          </p>
        </div>
      </Container>
    </header>
  );
}
