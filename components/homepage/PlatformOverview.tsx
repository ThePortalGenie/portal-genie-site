import {
  CreditCard,
  FileText,
  MailCheck,
  MessageSquare,
  ShieldCheck,
  UserCheck,
  type LucideIcon,
} from "lucide-react";
import { homepage } from "@/content/homepage";
import { Card, CardDescription, CardTitle } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ProductShowcase } from "@/components/ui/product-showcase";

const iconMap: Record<string, LucideIcon> = {
  "shield-check": ShieldCheck,
  "file-text": FileText,
  "message-square": MessageSquare,
  "credit-card": CreditCard,
  "mail-check": MailCheck,
  "user-check": UserCheck,
};

export function PlatformOverview() {
  const { headline, description, showcase, pillars } = homepage.platformOverview;

  return (
    <Section background="surface">
      <SectionHeader title={headline} description={description} />

      <div className="mx-auto mt-12 max-w-5xl lg:mt-16">
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

      <div className="mt-8 grid gap-5 sm:mt-10 sm:grid-cols-2 md:mt-12 md:gap-6 lg:mt-16 lg:grid-cols-3 lg:gap-8">
        {pillars.map((pillar) => {
          const Icon = iconMap[pillar.icon];

          return (
            <Card key={pillar.title} variant="background" interactive>
              <IconBadge icon={Icon} />
              <CardTitle>{pillar.title}</CardTitle>
              <CardDescription>{pillar.description}</CardDescription>
            </Card>
          );
        })}
      </div>
    </Section>
  );
}
