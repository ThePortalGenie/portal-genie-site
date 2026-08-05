"use client";

import { useState } from "react";
import {
  Accessibility,
  BookOpenCheck,
  Brush,
  Calculator,
  Code2,
  ConciergeBell,
  Factory,
  Gem,
  GraduationCap,
  HardHat,
  HeartPulse,
  Home,
  KeyRound,
  Landmark,
  Megaphone,
  Monitor,
  Mountain,
  Palette,
  Phone,
  Plane,
  ShieldCheck,
  Shirt,
  ShoppingCart,
  Stethoscope,
  Trophy,
  Truck,
  UserRound,
  UtensilsCrossed,
  Warehouse,
  type LucideIcon,
} from "lucide-react";
import { customerSuccessPage } from "@/content/customer-success";
import { ScrollReveal } from "@/components/features/ScrollReveal";
import { Container } from "@/components/ui/Container";
import { GenieFlow } from "@/components/visuals/GenieFlow";

const iconMap: Record<string, LucideIcon> = {
  calculator: Calculator,
  "hard-hat": HardHat,
  "shopping-cart": ShoppingCart,
  "graduation-cap": GraduationCap,
  "book-open-check": BookOpenCheck,
  trophy: Trophy,
  palette: Palette,
  "utensils-crossed": UtensilsCrossed,
  factory: Factory,
  landmark: Landmark,
  "heart-pulse": HeartPulse,
  "concierge-bell": ConciergeBell,
  "user-round": UserRound,
  monitor: Monitor,
  gem: Gem,
  megaphone: Megaphone,
  stethoscope: Stethoscope,
  mountain: Mountain,
  accessibility: Accessibility,
  home: Home,
  "key-round": KeyRound,
  "shield-check": ShieldCheck,
  "code-2": Code2,
  shirt: Shirt,
  phone: Phone,
  truck: Truck,
  plane: Plane,
  warehouse: Warehouse,
  brush: Brush,
};

export function IndustriesServed() {
  const { industriesServed } = customerSuccessPage;
  const [expanded, setExpanded] = useState(false);
  const { mobilePreviewCount } = industriesServed;
  const hasHiddenOnMobile =
    industriesServed.items.length > mobilePreviewCount;

  return (
    <section
      className="relative overflow-hidden bg-background py-12 md:py-16 lg:py-20"
      aria-labelledby="industries-served-heading"
    >
      <GenieFlow variant="soft" />
      <Container className="relative z-10">
        <ScrollReveal>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-medium uppercase tracking-wide text-portal-blue">
              {industriesServed.eyebrow}
            </p>
            <h2
              id="industries-served-heading"
              className="mt-3 text-xl font-semibold tracking-tight text-portal-navy sm:text-3xl lg:text-4xl"
            >
              {industriesServed.heading.line1}
              <br />
              {industriesServed.heading.line2}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-portal-navy/75 sm:text-lg">
              {industriesServed.description}
            </p>
          </div>
        </ScrollReveal>

        <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-6 lg:gap-4 xl:grid-cols-7">
          {industriesServed.items.map((industry, index) => {
            const Icon = iconMap[industry.icon];
            const hiddenOnMobile =
              hasHiddenOnMobile &&
              !expanded &&
              index >= mobilePreviewCount;

            return (
              <li
                key={industry.name}
                className={hiddenOnMobile ? "hidden md:block" : undefined}
              >
                <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-muted/20 bg-surface px-2 py-3 text-center shadow-[0_2px_8px_-4px_rgba(17,33,54,0.06)] sm:px-3 sm:py-3.5">
                  <div
                    className="mb-2 inline-flex size-8 items-center justify-center rounded-button bg-portal-blue/10 text-portal-blue"
                    aria-hidden="true"
                  >
                    {Icon ? (
                      <Icon className="size-4" strokeWidth={2} />
                    ) : null}
                  </div>
                  <p className="text-xs font-medium leading-snug text-portal-navy sm:text-[13px]">
                    {industry.name}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>

        {hasHiddenOnMobile ? (
          <div className="mt-6 flex justify-center md:hidden">
            <button
              type="button"
              onClick={() => setExpanded((value) => !value)}
              className="inline-flex h-10 items-center justify-center rounded-button border border-muted/30 bg-surface px-5 text-sm font-medium text-portal-navy transition-colors duration-200 hover:border-portal-blue/30 hover:text-portal-blue"
              aria-expanded={expanded}
            >
              {expanded
                ? industriesServed.collapseLabel
                : industriesServed.expandLabel}
            </button>
          </div>
        ) : null}
      </Container>
    </section>
  );
}
