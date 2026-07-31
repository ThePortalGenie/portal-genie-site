import type { Metadata } from "next";
import { LegalDocumentViewer } from "@/components/legal/LegalDocumentViewer";
import { legalPages } from "@/content/legal";
import { site } from "@/config/site";

const { termsAndConditions } = legalPages;

export const metadata: Metadata = {
  title: `${termsAndConditions.metadata.title} | ${site.title}`,
  description: termsAndConditions.metadata.description,
  openGraph: {
    title: termsAndConditions.metadata.openGraph.title,
    description: termsAndConditions.metadata.openGraph.description,
  },
};

export default function TermsAndConditionsPage() {
  return (
    <main>
      <LegalDocumentViewer
        title={termsAndConditions.title}
        description={termsAndConditions.description}
        pdfPath={termsAndConditions.pdfPath}
        downloadLabel={termsAndConditions.downloadLabel}
        fallbackMessage={termsAndConditions.fallbackMessage}
      />
    </main>
  );
}
