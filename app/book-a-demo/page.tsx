import type { Metadata } from "next";
import { DemoBookingSection } from "@/components/demo/DemoBookingSection";
import { DemoAlternativeContact } from "@/components/demo/DemoAlternativeContact";
import { DemoFaq } from "@/components/demo/DemoFaq";
import { DemoCta } from "@/components/demo/DemoCta";
import { demoPage } from "@/content/demo";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: `${demoPage.metadata.title} | ${site.title}`,
  description: demoPage.metadata.description,
  openGraph: {
    title: demoPage.metadata.openGraph.title,
    description: demoPage.metadata.openGraph.description,
  },
};

export default function BookADemoPage() {
  return (
    <main>
      <DemoBookingSection />
      <DemoAlternativeContact />
      <DemoFaq />
      <DemoCta />
    </main>
  );
}
