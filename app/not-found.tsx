import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { seo } from "@/config/seo";

export const metadata: Metadata = {
  title: `Page not found | ${seo.siteName}`,
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <main className="py-12 md:py-20 lg:py-[120px]">
      <Container>
        <div className="mx-auto max-w-prose text-center md:text-left">
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-portal-blue">
            404
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-portal-navy md:text-4xl">
            Page not found
          </h1>
          <p className="mt-6 text-base leading-relaxed text-portal-navy/75 sm:text-lg">
            The page you&apos;re looking for doesn&apos;t seem to exist.
          </p>
          <ButtonLink href="/" variant="primary" className="mt-10 w-full sm:w-auto">
            Back to Portal Genie
          </ButtonLink>
        </div>
      </Container>
    </main>
  );
}
