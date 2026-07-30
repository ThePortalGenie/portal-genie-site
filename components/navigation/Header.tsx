import Image from "next/image";
import Link from "next/link";
import { links } from "@/config/links";
import { site } from "@/config/site";
import { headerActions } from "@/content/navigation";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { MobileMenuButton } from "./MobileMenuButton";
import { NavLinks } from "./NavLinks";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-muted/15 bg-surface/95 backdrop-blur-sm supports-[backdrop-filter]:bg-surface/80">
      <Container>
        <div className="flex h-[72px] items-center justify-between gap-6 lg:h-20 lg:gap-8">
          <Link
            href={links.home}
            className="flex shrink-0 items-center pr-4 lg:pr-10"
            aria-label={site.logo.ariaLabel}
          >
            <Image
              src={site.logo.src}
              alt={site.logo.alt}
              width={site.logo.width}
              height={site.logo.height}
              className="h-auto max-h-[54px] w-auto"
              priority
            />
          </Link>

          <nav
            className="hidden lg:block"
            aria-label="Main navigation"
          >
            <NavLinks />
          </nav>

          <div className="flex items-center gap-4 sm:gap-5">
            <Link
              href={headerActions.login.href}
              className="text-sm font-medium text-portal-navy transition-colors duration-200 hover:text-portal-blue"
            >
              {headerActions.login.label}
            </Link>
            <ButtonLink href={headerActions.bookDemo.href}>
              {headerActions.bookDemo.label}
            </ButtonLink>
            <MobileMenuButton />
          </div>
        </div>
      </Container>
    </header>
  );
}
