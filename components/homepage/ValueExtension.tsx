import { Clock, Layers, Puzzle, type LucideIcon } from "lucide-react";
import { homepage } from "@/content/homepage";
import { Card, CardDescription, CardTitle } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";

const iconMap: Record<string, LucideIcon> = {
  layers: Layers,
  clock: Clock,
  puzzle: Puzzle,
};

export function ValueExtension() {
  const { headline, description, cards } = homepage.valueExtension;

  return (
    <Section background="background">
      <SectionHeader title={headline} description={description} />

      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-8">
        {cards.map((card) => {
          const Icon = iconMap[card.icon];

          return (
            <Card key={card.title} interactive>
              <IconBadge icon={Icon} />
              <CardTitle>{card.title}</CardTitle>
              <CardDescription>{card.description}</CardDescription>
            </Card>
          );
        })}
      </div>
    </Section>
  );
}
