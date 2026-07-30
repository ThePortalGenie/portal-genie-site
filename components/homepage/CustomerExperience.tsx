import {
  CreditCard,
  FileText,
  MessageSquare,
  ShieldCheck,
  UserCheck,
  type LucideIcon,
} from "lucide-react";
import { homepage } from "@/content/homepage";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
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
    <Section background="background">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="order-2 lg:order-1">
          <SectionHeader
            align="left"
            title={headline}
            description={description}
          />

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
    </Section>
  );
}
