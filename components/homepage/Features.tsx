"use client";

import { useEffect, useRef, useState } from "react";
import {
  CreditCard,
  FolderOpen,
  LayoutDashboard,
  MessagesSquare,
  Palette,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { homepage } from "@/content/homepage";
import { Container } from "@/components/ui/Container";

const iconMap: Record<string, LucideIcon> = {
  "layout-dashboard": LayoutDashboard,
  "folder-open": FolderOpen,
  "credit-card": CreditCard,
  palette: Palette,
  "messages-square": MessagesSquare,
  workflow: Workflow,
};

export function Features() {
  const { eyebrow, headline, description, cards } = homepage.features;
  const gridRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = gridRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-background py-[72px] md:py-24 lg:py-[120px]">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-medium tracking-wide text-portal-blue">
            {eyebrow}
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-portal-navy sm:text-4xl">
            {headline}
          </h2>
          <p className="mt-6 text-base leading-relaxed text-portal-navy/75 sm:text-lg">
            {description}
          </p>
        </div>

        <div
          ref={gridRef}
          className="mt-12 grid gap-6 md:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-8"
        >
          {cards.map((card, index) => {
            const Icon = iconMap[card.icon];

            return (
              <article
                key={card.title}
                className={`flex h-full flex-col rounded-card border border-muted/20 bg-surface p-6 shadow-[0_8px_24px_-8px_rgba(17,33,54,0.08)] transition-all duration-500 motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none hover:-translate-y-0.5 hover:border-muted/30 lg:p-8 ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-4 opacity-0"
                }`}
                style={{
                  transitionDelay: isVisible ? `${index * 120}ms` : "0ms",
                }}
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
                <ul className="mt-5 flex flex-col gap-2.5 border-t border-muted/15 pt-5">
                  {card.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex items-start gap-2.5 text-sm text-portal-navy/70"
                    >
                      <span
                        className="mt-2 size-1 shrink-0 rounded-full bg-portal-teal"
                        aria-hidden="true"
                      />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
