import { demoPage } from "@/content/demo";
import { ZohoBooking } from "@/components/demo/ZohoBooking";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function DemoBookingSection() {
  const { booking: bookingCopy } = demoPage;

  return (
    <section
      id="booking"
      className="scroll-mt-[5.5rem] bg-background py-12 md:py-20 lg:scroll-mt-24 lg:py-[120px]"
      aria-label="Book a demonstration"
    >
      <Container className="max-w-4xl">
        <SectionHeader
          title={bookingCopy.headline}
          description={bookingCopy.description}
          align="left"
          className="max-w-2xl"
        />
        <div className="mt-10 lg:mt-12">
          <ZohoBooking />
        </div>
      </Container>
    </section>
  );
}
