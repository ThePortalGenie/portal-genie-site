"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { whyPage } from "@/content/why";

type WhyHeroIllustrationProps = {
  /** Desktop/tablet absolute layer — mobile is hidden by WhyHero. */
  variant?: "desktop" | "mobile";
  /** Reserved for future foreground artwork above the streak. */
  children?: ReactNode;
};

/**
 * Why-page-only hero streak. Wide decorative illustration anchored to the
 * lower-right — natural aspect ratio, no cover-crop or transform stack.
 *
 * Source: 1695×928 (≈1.83:1). Sized ~70–75vw wide; height follows automatically.
 * The opaque white plate is softened via `.why-hero-visual` in globals.css.
 */
export function WhyHeroIllustration({
  variant = "desktop",
  children,
}: WhyHeroIllustrationProps) {
  const { illustration } = whyPage.hero;
  const prefersReducedMotion = useReducedMotion();

  if (variant === "mobile") {
    return null;
  }

  return (
    <motion.div
      className="pointer-events-none absolute z-0 right-[-3vw] bottom-[-5%] w-[70vw] md:w-[72vw] lg:w-[74vw] xl:w-[75vw]"
      initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      aria-hidden="true"
    >
      <div className="why-hero-visual">
        <Image
          src={illustration.src}
          alt=""
          aria-hidden="true"
          width={illustration.width}
          height={illustration.height}
          quality={100}
          priority
          className="block h-auto w-full max-w-none"
          sizes="(min-width: 1280px) 75vw, (min-width: 1024px) 74vw, (min-width: 768px) 72vw, 70vw"
        />
      </div>

      {children ? (
        <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
          {children}
        </div>
      ) : null}
    </motion.div>
  );
}
