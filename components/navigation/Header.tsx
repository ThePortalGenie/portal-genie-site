import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { MobileMenuButton } from "./MobileMenuButton";
import { NavLinks } from "./NavLinks";

const LOGIN_URL = "#";
const BOOK_DEMO_URL = "/contact";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-muted/15 bg-surface/95 backdrop-blur-sm supports-[backdrop-filter]:bg-surface/80">
      <Container>
        <div className="flex h-[72px] items-center justify-between gap-6 lg:h-20 lg:gap-8">
          <Link
            href="/"
            className="flex shrink-0 items-center pr-4 lg:pr-10"
            aria-label="Portal Genie home"
          >
            <Image
              src="/images/logos/portal-genie-logo.png"
              alt="Portal Genie"
              width={1306}
              height={662}
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
              href={LOGIN_URL}
              className="text-sm font-medium text-portal-navy transition-colors duration-200 hover:text-portal-blue"
            >
              Login
            </Link>
            <Link
              href={BOOK_DEMO_URL}
              className="inline-flex h-10 items-center justify-center rounded-button bg-portal-blue px-5 py-2.5 text-sm font-medium text-white transition-colors duration-200 hover:bg-portal-blue/90 sm:px-6"
            >
              Book a Demo
            </Link>
            <MobileMenuButton />
          </div>
        </div>
      </Container>
    </header>
  );
}
