import {
  ClipboardList,
  CreditCard,
  FileText,
  MessageSquare,
  ShieldCheck,
  UserCheck,
  type LucideIcon,
} from "lucide-react";
import { homepage } from "@/content/homepage";
import { Container } from "@/components/ui/Container";
import { ProductShowcase } from "@/components/ui/product-showcase";

const iconMap: Record<string, LucideIcon> = {
  "shield-check": ShieldCheck,
  "file-text": FileText,
  "message-square": MessageSquare,
  "credit-card": CreditCard,
  "clipboard-list": ClipboardList,
  "user-check": UserCheck,
};

export function PlatformOverview() {
  const { headline, description, showcase, pillars } = homepage.platformOverview;

  return (
    <section className="bg-surface py-[72px] md:py-24 lg:py-[120px]">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-portal-navy sm:text-4xl">
            {headline}
          </h2>
          <p className="mt-6 text-base leading-relaxed text-portal-navy/75 sm:text-lg">
            {description}
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-5xl lg:mt-16">
          <ProductShowcase
            title={headline}
            description={description}
            image={showcase.image}
            alt={showcase.alt}
            layout="center"
            showBrowserFrame
            showCopy={false}
          />
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-8">
          {pillars.map((pillar) => {
            const Icon = iconMap[pillar.icon];

            return (
              <article
                key={pillar.title}
                className="rounded-card border border-muted/20 bg-background p-6 lg:p-8"
              >
                <div className="mb-5 inline-flex size-10 items-center justify-center rounded-button bg-portal-blue/10 text-portal-blue">
                  <Icon className="size-5" strokeWidth={2} aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold text-portal-navy">
                  {pillar.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-portal-navy/75 sm:text-base">
                  {pillar.description}
                </p>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
