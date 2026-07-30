import Link from "next/link";
import { links } from "@/config/links";
import { buttons } from "@/content/buttons";
import { Container } from "@/components/ui/Container";

export default function PlatformPage() {
  return (
    <main className="py-[72px] md:py-24 lg:py-[120px]">
      <Container>
        <div className="max-w-prose">
          <h1 className="text-3xl font-semibold text-portal-navy md:text-4xl">
            The Platform
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-portal-navy/80">
            This page is currently being developed as part of the new Portal
            Genie website.
          </p>
          <Link
            href={links.bookDemo}
            className="mt-10 inline-flex h-10 items-center justify-center rounded-button bg-portal-blue px-5 text-sm font-medium text-white transition-colors duration-200 hover:bg-portal-blue/90 sm:px-6"
          >
            {buttons.bookDemo}
          </Link>
        </div>
      </Container>
    </main>
  );
}
