import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ProductMockup } from "./ProductMockup";

export function Hero() {
  return (
    <section className="bg-background py-[72px] md:py-24 lg:py-[120px]">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
          <div className="max-w-xl">
            <p className="text-sm font-medium tracking-wide text-portal-blue">
              Built for Xero businesses
            </p>

            <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-tight text-portal-navy sm:text-5xl">
              The Customer Experience Layer for Xero businesses.
            </h1>

            <div className="mt-6 space-y-4 text-base leading-relaxed text-portal-navy/75 sm:text-lg">
              <p>
                Transform how your customers interact with your business without
                changing the way your team works in Xero.
              </p>
              <p>
                Deliver a modern, self-service experience that strengthens
                customer relationships, reduces administration, and keeps
                everyone connected.
              </p>
            </div>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/contact"
                className="inline-flex h-11 items-center justify-center rounded-button bg-portal-blue px-6 text-sm font-medium text-white transition-colors duration-200 hover:bg-portal-blue/90"
              >
                Book a Demo
              </Link>
              <Link
                href="/platform"
                className="inline-flex h-11 items-center justify-center rounded-button border border-muted/40 bg-surface px-6 text-sm font-medium text-portal-navy transition-colors duration-200 hover:border-muted/70 hover:bg-background"
              >
                See the Platform
              </Link>
            </div>
          </div>

          <div className="w-full">
            <ProductMockup />
          </div>
        </div>
      </Container>
    </section>
  );
}
