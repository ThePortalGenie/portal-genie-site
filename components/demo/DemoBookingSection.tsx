import { demoPage } from "@/content/demo";
import { ZohoBooking } from "@/components/demo/ZohoBooking";
import { Container } from "@/components/ui/Container";
import { GenieFlow } from "@/components/visuals/GenieFlow";

export function DemoBookingSection() {
  const { booking } = demoPage;

  return (
    <section
      id="booking"
      className="relative scroll-mt-[5.5rem] overflow-hidden bg-background pb-10 pt-8 md:pb-14 md:pt-12 lg:scroll-mt-24 lg:pt-14"
      aria-label="Book a demonstration"
    >
      <GenieFlow variant="corner" />
      <Container className="relative z-10 max-w-4xl lg:max-w-5xl">
        <div className="mx-auto max-w-[56rem] text-center md:mx-0 md:text-left">
          <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-portal-blue">
            {booking.eyebrow}
          </p>

          <h1 className="mt-2.5 text-[1.875rem] font-semibold leading-[1.15] tracking-tight text-portal-navy sm:mt-3 sm:text-[2.5rem] sm:leading-tight lg:text-[2.75rem]">
            {booking.headline}
          </h1>

          <p className="mx-auto mt-5 max-w-[56rem] text-base leading-relaxed text-portal-navy/75 sm:mt-6 sm:text-lg md:mx-0">
            {booking.description}
          </p>

          <p className="mt-4 text-sm font-medium text-portal-navy/70 sm:mt-4 sm:text-base">
            {booking.instruction}
          </p>
        </div>

        <div className="mt-6 md:mt-8">
          <ZohoBooking />
        </div>
      </Container>
    </section>
  );
}
