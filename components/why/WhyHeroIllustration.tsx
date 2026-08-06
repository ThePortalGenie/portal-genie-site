"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { whyPage } from "@/content/why";

type WhyHeroIllustrationProps = {
  /** Desktop/tablet absolute layer vs stacked mobile treatment */
  variant?: "desktop" | "mobile";
  /**
   * Foreground layer for future product/device artwork. Rendered above the
   * streak and outside its mask, so devices stay crisp when they're added.
   */
  children?: ReactNode;
};

/**
 * Why-page-only hero streak. Scoped here so other heroes are unaffected.
 *
 * Desktop: fills the absolute right-hand layer from WhyHero, with the image
 * biased toward the right so strong blue energy stays clear of the copy.
 * Mobile: smaller, centred, under the CTAs.
 *
 * The artwork ships on an opaque white plate — edge masks (`.why-hero-visual`
 * in globals.css) dissolve the canvas. No card, border or shadow.
 */
export function WhyHeroIllustration({
  variant = "desktop",
  children,
}: WhyHeroIllustrationProps) {
  const { illustration } = whyPage.hero;
  const prefersReducedMotion = useReducedMotion();
  const isMobile = variant === "mobile";

  return (
    <motion.div
      className={
        isMobile
          ? "pointer-events-none relative mx-auto w-full max-w-[min(100%,420px)] opacity-80"
          : // Slightly oversized + right-biased so the streak uses the layer
            // confidently while the strong blue sits ~8–12% further right.
            "pointer-events-none absolute inset-0 flex items-center justify-end"
      }
      initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div
        className={
          isMobile
            ? "why-hero-visual why-hero-visual--stacked w-full"
            : // Wider right-anchored layer: the mask keeps the new leftward
              // reach faint while the source's strongest blue remains right.
              "why-hero-visual relative h-full w-[140%] max-w-none translate-x-[4%] lg:w-[142%] lg:translate-x-0 xl:w-[148%] xl:translate-x-[2%]"
        }
      >
        <Image
          src={illustration.src}
          alt=""
          aria-hidden="true"
          width={illustration.width}
          height={illustration.height}
          quality={100}
          priority
          className={
            isMobile
              ? "h-auto w-full object-contain object-center"
              : "h-full w-full object-contain object-right"
          }
          sizes={
            isMobile
              ? "(max-width: 767px) 88vw, 420px"
              : "(min-width: 1280px) 82vw, (min-width: 1024px) 86vw, (min-width: 768px) 80vw, 1px"
          }
        />
      </div>

      {children ? (
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          {children}
        </div>
      ) : null}
    </motion.div>
  );
}
