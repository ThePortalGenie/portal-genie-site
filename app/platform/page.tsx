import type { Metadata } from "next";
import { noIndexPageMetadata } from "@/config/seo";
import { site } from "@/config/site";
import { PlatformBookDemoCta } from "@/components/platform/PlatformBookDemoCta";
import { Container } from "@/components/ui/Container";
import { GenieFlow } from "@/components/visuals/GenieFlow";

export const metadata: Metadata = noIndexPageMetadata({
  title: `The Platform | ${site.title}`,
  description:
    "The Portal Genie platform overview page is currently being developed.",
});

export default function PlatformPage() {
  return (
    <main className="relative overflow-hidden py-[72px] md:py-24 lg:py-[120px]">
      <GenieFlow variant="soft" />
      <Container className="relative z-10">
        <div className="max-w-prose">
          <h1 className="text-3xl font-semibold text-portal-navy md:text-4xl">
            The Platform
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-portal-navy/80">
            This page is currently being developed as part of the new Portal
            Genie website.
          </p>
          <PlatformBookDemoCta />
        </div>
      </Container>
    </main>
  );
}
