import Image from "next/image";
import Link from "next/link";
import { links } from "@/config/links";
import { site } from "@/config/site";
import { headerActions } from "@/content/navigation";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { MobileMenu } from "./MobileMenu";
import { NavLinks } from "./NavLinks";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-muted/15 bg-surface/95 backdrop-blur-sm supports-[backdrop-filter]:bg-surface/80">
      <Container className="relative">
        <div className="flex h-[64px] items-center gap-3 sm:h-[72px] sm:gap-4 lg:h-20 lg:gap-6">
          <Link
            href={links.home}
            className="flex min-w-0 shrink items-center"
            aria-label={site.logo.ariaLabel}
          >
            <Image
              src={site.logo.src}
              alt={site.logo.alt}
              width={site.logo.width}
              height={site.logo.height}
              className="h-auto max-h-10 w-auto max-w-[140px] object-contain sm:max-h-[54px] sm:max-w-none"
              priority
            />
          </Link>

          <nav
            className="hidden min-w-0 flex-1 justify-center lg:flex"
            aria-label="Main navigation"
          >
            <NavLinks />
          </nav>

          <div className="ml-auto flex shrink-0 items-center gap-5 lg:ml-0">
            <Link
              href={headerActions.login.href}
              className="inline-flex h-11 items-center text-sm font-medium leading-none text-portal-navy transition-colors duration-200 hover:text-portal-blue"
            >
              {headerActions.login.label}
            </Link>

            <div className="hidden items-center gap-3 lg:flex">
              <ButtonLink
                href={headerActions.startFree.href}
                variant="secondary"
              >
                {headerActions.startFree.label}
              </ButtonLink>
              <ButtonLink href={headerActions.bookDemo.href}>
                {headerActions.bookDemo.label}
              </ButtonLink>
            </div>

            <MobileMenu />
          </div>
        </div>
      </Container>
    </header>
  );
}
