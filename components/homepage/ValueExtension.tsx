import { Clock, Layers, Puzzle, type LucideIcon } from "lucide-react";
import { homepage } from "@/content/homepage";
import { Container } from "@/components/ui/Container";

const iconMap: Record<string, LucideIcon> = {
  layers: Layers,
  clock: Clock,
  puzzle: Puzzle,
};

export function ValueExtension() {
  const { headline, description, cards } = homepage.valueExtension;

  return (
    <section className="bg-background py-[72px] md:py-24 lg:py-[120px]">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-portal-navy sm:text-4xl">
            {headline}
          </h2>
          <p className="mt-6 text-base leading-relaxed text-portal-navy/75 sm:text-lg">
            {description}
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-8">
          {cards.map((card) => {
            const Icon = iconMap[card.icon];

            return (
              <article
                key={card.title}
                className="rounded-card border border-muted/20 bg-surface p-6 lg:p-8"
              >
                <div className="mb-5 inline-flex size-10 items-center justify-center rounded-button bg-portal-blue/10 text-portal-blue">
                  <Icon className="size-5" strokeWidth={2} aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold text-portal-navy">
                  {card.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-portal-navy/75 sm:text-base">
                  {card.description}
                </p>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
