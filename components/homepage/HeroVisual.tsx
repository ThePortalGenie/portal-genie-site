"use client";

import {
  CreditCard,
  Link2,
  MessageSquare,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { homepage } from "@/content/homepage";
import {
  AnimatedWave,
  ConnectorLines,
  DeviceStack,
  FloatingBadge,
  GlowLayer,
} from "@/components/ui/hero";

const iconMap: Record<string, LucideIcon> = {
  "shield-check": ShieldCheck,
  "credit-card": CreditCard,
  "message-square": MessageSquare,
  "link-2": Link2,
};

/**
 * Three flowing translucent ribbons — Portal Genie's signature visual
 * motif. Each is a closed ribbon path (top edge + offset bottom edge) so it
 * reads as a soft band rather than a wave crashing to the floor. Start/end
 * coordinates match at x=0 and x=1200 so the looping tile is seamless.
 */
const RIBBON_LAYERS = [
  {
    path: "M0,160 C150,90 350,230 600,160 C850,90 1050,230 1200,160 L1200,250 C1050,320 850,180 600,250 C350,320 150,180 0,250 Z",
    color: "var(--portal-blue)",
    opacity: 0.16,
    duration: 45,
    blur: 56,
    reverse: false,
    className: "hidden sm:flex",
  },
  {
    path: "M0,220 C180,270 320,170 600,220 C880,270 1020,170 1200,220 L1200,290 C1020,240 880,340 600,290 C320,240 180,340 0,290 Z",
    color: "var(--portal-teal)",
    opacity: 0.12,
    duration: 65,
    blur: 64,
    reverse: true,
    className: "hidden lg:flex",
  },
  {
    path: "M0,280 C200,320 400,240 600,280 C800,320 1000,240 1200,280 L1200,335 C1000,375 800,295 600,335 C400,375 200,295 0,335 Z",
    color: "var(--portal-navy)",
    opacity: 0.07,
    duration: 90,
    blur: 72,
    reverse: false,
    className: "hidden lg:flex",
  },
];

const BADGE_POSITIONS_DESKTOP = [
  "absolute -left-6 top-2 z-40",
  "absolute -right-4 top-14 z-40",
  "absolute -left-10 top-[42%] z-40",
  "absolute left-1/2 -bottom-8 z-40 -translate-x-1/2",
];

/**
 * Portal Genie's signature hero visual: the dashboard is the unmistakable
 * focal point, floating in open space above a slow-drifting ribbon system,
 * with the tablet and phone as secondary supporting devices and a handful
 * of quiet capability nodes in the surrounding negative space.
 *
 * Presentation-only — all copy and image sources come from
 * content/homepage.ts.
 */
export function HeroVisual() {
  const { visual } = homepage.hero;

  return (
    <div className="relative w-full" aria-hidden="true">
      {/* Desktop / tablet composition */}
      <div className="relative mx-auto hidden aspect-[6/5] w-full max-w-[760px] md:block">
        {/* Layer 1 — soft radial lighting */}
        <GlowLayer />

        {/* Layer 2 — the ribbon system, extending far beyond the composition */}
        <div className="absolute -inset-x-[30%] -inset-y-[22%] z-10 -rotate-3 overflow-hidden">
          {RIBBON_LAYERS.map((layer) => (
            <AnimatedWave key={layer.path} {...layer} />
          ))}
        </div>

        <ConnectorLines />

        {/* Layers 3–4 — laptop (focal point), tablet + phone (supporting) */}
        <DeviceStack
          laptop={visual.laptop}
          tablet={visual.tablet}
          phone={visual.phone}
        />

        {/* Layer 5 — quiet capability nodes in the surrounding negative space */}
        {visual.badges.map((badge, index) => {
          const Icon = iconMap[badge.icon];

          return (
            <FloatingBadge
              key={badge.label}
              icon={Icon}
              label={badge.label}
              className={BADGE_POSITIONS_DESKTOP[index]}
              delay={0.9 + index * 0.15}
              floatDuration={5 + index}
              floatDistance={3}
            />
          );
        })}
      </div>

      {/* Mobile composition — simplified: fewer ribbons, no connectors, stacked devices */}
      <div className="relative flex flex-col items-center gap-6 md:hidden">
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <GlowLayer />
          <AnimatedWave {...RIBBON_LAYERS[0]} className="flex" />
        </div>

        <DeviceStack
          laptop={visual.laptop}
          tablet={visual.tablet}
          phone={visual.phone}
          compact
        />

        <div className="grid w-full max-w-[300px] grid-cols-2 gap-2.5">
          {visual.badges.map((badge, index) => {
            const Icon = iconMap[badge.icon];

            return (
              <FloatingBadge
                key={badge.label}
                icon={Icon}
                label={badge.label}
                className="relative justify-center"
                delay={0.3 + index * 0.1}
                floatDuration={5 + index}
                floatDistance={2.5}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
