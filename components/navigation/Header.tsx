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
        <div className="flex h-[72px] items-center gap-4 lg:h-20 lg:gap-6">
          <Link
            href={links.home}
            className="flex shrink-0 items-center"
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
