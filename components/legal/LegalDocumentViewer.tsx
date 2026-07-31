import Link from "next/link";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";

type LegalDocumentViewerProps = {
  title: string;
  description: string;
  pdfPath: string;
  downloadLabel: string;
  fallbackMessage: string;
};

export function LegalDocumentViewer({
  title,
  description,
  pdfPath,
  downloadLabel,
  fallbackMessage,
}: LegalDocumentViewerProps) {
  return (
    <>
      <section className="bg-background pt-8 pb-12 md:pt-12 md:pb-16 lg:pt-16 lg:pb-20">
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-4xl font-semibold leading-tight tracking-tight text-portal-navy sm:text-[2.75rem] sm:leading-tight lg:text-5xl">
              {title}
            </h1>
            <p className="mt-6 text-base leading-relaxed text-portal-navy/75 sm:text-lg">
              {description}
            </p>
          </div>
        </Container>
      </section>

      <section className="bg-background pb-[72px] md:pb-24 lg:pb-[120px]">
        <Container>
          <div className="mb-6 flex justify-end">
            <ButtonLink
              href={pdfPath}
              variant="secondary"
              target="_blank"
              rel="noopener noreferrer"
            >
              {downloadLabel}
            </ButtonLink>
          </div>

          <div className="overflow-hidden rounded-card border border-muted/20 bg-surface">
            <iframe
              src={pdfPath}
              title={`${title} document`}
              className="h-[700px] w-full md:h-[900px] lg:h-[1000px]"
            />
          </div>

          <p className="mt-6 text-sm leading-relaxed text-portal-navy/70">
            {fallbackMessage}{" "}
            <Link
              href={pdfPath}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-portal-blue transition-colors duration-200 hover:text-portal-blue/80"
            >
              {downloadLabel}
            </Link>
            .
          </p>
        </Container>
      </section>
    </>
  );
}
