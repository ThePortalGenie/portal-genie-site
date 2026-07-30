import {
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
  "credit-card": CreditCard,
  "file-text": FileText,
  "message-square": MessageSquare,
  "user-check": UserCheck,
};

export function CustomerExperience() {
  const { headline, description, showcase, features } =
    homepage.customerExperience;

  return (
    <section className="bg-background py-[72px] md:py-24 lg:py-[120px]">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="order-2 lg:order-1">
            <h2 className="text-3xl font-semibold tracking-tight text-portal-navy sm:text-4xl">
              {headline}
            </h2>
            <p className="mt-6 text-base leading-relaxed text-portal-navy/75 sm:text-lg">
              {description}
            </p>

            <ul className="mt-8 flex flex-col gap-0 border-t border-muted/20">
              {features.map((feature) => {
                const Icon = iconMap[feature.icon];

                return (
                  <li
                    key={feature.title}
                    className="flex items-center gap-3 border-b border-muted/20 py-3.5 transition-colors duration-200 hover:text-portal-blue"
                  >
                    <Icon
                      className="size-4 shrink-0 text-portal-teal"
                      strokeWidth={2}
                      aria-hidden="true"
                    />
                    <span className="text-sm font-medium text-portal-navy/80">
                      {feature.title}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="order-1 lg:order-2">
            <ProductShowcase
              title={headline}
              description={description}
              image={showcase.image}
              alt={showcase.alt}
              aspectRatio={showcase.aspectRatio}
              layout="center"
              showBrowserFrame
              showCopy={false}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
