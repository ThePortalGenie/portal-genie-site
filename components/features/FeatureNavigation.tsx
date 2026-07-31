"use client";

import { featuresPage } from "@/content/features";
import { Container } from "@/components/ui/Container";

export function FeatureNavigation() {
  return (
    <nav
      className="sticky top-[72px] z-40 border-b border-muted/15 bg-surface/95 backdrop-blur-sm supports-[backdrop-filter]:bg-surface/80 lg:top-20"
      aria-label="Feature sections"
    >
      <Container>
        <ul className="-mx-6 flex gap-1 overflow-x-auto px-6 py-3 md:mx-0 md:px-0 md:py-4">
          {featuresPage.navigation.map((item) => (
            <li key={item.id} className="shrink-0">
              <a
                href={`#${item.id}`}
                className="inline-flex h-9 items-center rounded-button px-3.5 text-sm font-medium text-portal-navy/70 transition-colors duration-200 hover:bg-background hover:text-portal-blue whitespace-nowrap"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </nav>
  );
}
