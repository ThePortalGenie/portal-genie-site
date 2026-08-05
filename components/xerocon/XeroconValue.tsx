import {
  FileText,
  FolderUp,
  MessageSquare,
  Palette,
  ShieldCheck,
  Timer,
} from "lucide-react";
import { xeroconPage } from "@/content/xerocon";
import { Container } from "@/components/ui/Container";

const benefitIcons = [
  ShieldCheck,
  FileText,
  MessageSquare,
  FolderUp,
  Timer,
  Palette,
] as const;

export function XeroconValue() {
  const { value } = xeroconPage;

  return (
    <section
      id={value.id}
      className="scroll-mt-20 bg-surface py-12 sm:py-16 md:py-20"
      aria-labelledby="xerocon-value-heading"
    >
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="xerocon-value-heading"
            className="whitespace-pre-line text-2xl font-semibold tracking-tight text-portal-navy sm:whitespace-normal sm:text-3xl md:text-4xl"
          >
            {value.headline}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-portal-navy/70 sm:mt-5 sm:text-base">
            {value.description}
          </p>
        </div>

        <ul className="mx-auto mt-8 grid max-w-4xl gap-4 sm:mt-10 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {value.benefits.map((benefit, index) => {
            const Icon = benefitIcons[index] ?? ShieldCheck;

            return (
              <li
                key={benefit.title}
                className="rounded-card border border-muted/15 bg-background px-4 py-4 sm:px-5 sm:py-5"
              >
                <span className="inline-flex size-9 items-center justify-center rounded-button bg-portal-blue/10 text-portal-blue">
                  <Icon className="size-4" strokeWidth={2} aria-hidden="true" />
                </span>
                <h3 className="mt-3 text-base font-semibold text-portal-navy">
                  {benefit.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-portal-navy/65">
                  {benefit.description}
                </p>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
