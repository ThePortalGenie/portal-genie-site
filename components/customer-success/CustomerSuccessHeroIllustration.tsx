"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { customerSuccessPage } from "@/content/customer-success";
import type { CSSProperties } from "react";

type CustomerSuccessHeroIllustrationProps = {
  variant?: "desktop" | "mobile";
};

/** Soft left + bottom dissolve so the streak reads as environmental, not boxed. */
const desktopMaskStyle: CSSProperties = {
  WebkitMaskImage: `
    linear-gradient(
      to right,
      transparent 0%,
      transparent 4%,
      rgba(0, 0, 0, 0.06) 14%,
      rgba(0, 0, 0, 0.22) 26%,
      rgba(0, 0, 0, 0.55) 40%,
      black 54%,
      black 88%,
      rgba(0, 0, 0, 0.35) 96%,
      transparent 100%
    ),
    linear-gradient(
      to bottom,
      transparent 0%,
      rgba(0, 0, 0, 0.2) 10%,
      black 20%,
      black 58%,
      rgba(0, 0, 0, 0.65) 68%,
      rgba(0, 0, 0, 0.35) 78%,
      rgba(0, 0, 0, 0.12) 88%,
      transparent 100%
    )
  `,
  maskImage: `
    linear-gradient(
      to right,
      transparent 0%,
      transparent 4%,
      rgba(0, 0, 0, 0.06) 14%,
      rgba(0, 0, 0, 0.22) 26%,
      rgba(0, 0, 0, 0.55) 40%,
      black 54%,
      black 88%,
      rgba(0, 0, 0, 0.35) 96%,
      transparent 100%
    ),
    linear-gradient(
      to bottom,
      transparent 0%,
      rgba(0, 0, 0, 0.2) 10%,
      black 20%,
      black 58%,
      rgba(0, 0, 0, 0.65) 68%,
      rgba(0, 0, 0, 0.35) 78%,
      rgba(0, 0, 0, 0.12) 88%,
      transparent 100%
    )
  `,
  WebkitMaskComposite: "source-in",
  maskComposite: "intersect",
};

const mobileMaskStyle: CSSProperties = {
  WebkitMaskImage: `
    linear-gradient(
      to right,
      transparent 0%,
      rgba(0, 0, 0, 0.35) 12%,
      black 32%,
      black 78%,
      rgba(0, 0, 0, 0.35) 92%,
      transparent 100%
    ),
    linear-gradient(
      to bottom,
      transparent 0%,
      rgba(0, 0, 0, 0.3) 12%,
      black 28%,
      black 62%,
      rgba(0, 0, 0, 0.25) 82%,
      transparent 100%
    )
  `,
  maskImage: `
    linear-gradient(
      to right,
      transparent 0%,
      rgba(0, 0, 0, 0.35) 12%,
      black 32%,
      black 78%,
      rgba(0, 0, 0, 0.35) 92%,
      transparent 100%
    ),
    linear-gradient(
      to bottom,
      transparent 0%,
      rgba(0, 0, 0, 0.3) 12%,
      black 28%,
      black 62%,
      rgba(0, 0, 0, 0.25) 82%,
      transparent 100%
    )
  `,
  WebkitMaskComposite: "source-in",
  maskComposite: "intersect",
};

/**
 * Customer Success hero streak — same asset as Features/Pricing, gentler
 * composition: broad horizontal travel then a soft rise toward upper-right
 * (calmer than Features' energetic upward sweep).
 */
export function CustomerSuccessHeroIllustration({
  variant = "desktop",
}: CustomerSuccessHeroIllustrationProps) {
  const { illustration } = customerSuccessPage.hero;
  const prefersReducedMotion = useReducedMotion();
  const isMobile = variant === "mobile";

  return (
    <motion.div
      className="pointer-events-none absolute inset-0"
      initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      aria-hidden="true"
    >
      <div
        style={isMobile ? mobileMaskStyle : desktopMaskStyle}
        className={
          isMobile
            ? "absolute inset-0 h-full w-full origin-[68%_56%] -rotate-[1.5deg] opacity-65"
            : // Large environmental sweep: faint strands from centre-left, ribbon
              // through lower-middle/right, strongest blue in right third.
              "absolute top-[8%] bottom-[-18%] left-[-10%] right-[-24%] origin-[44%_54%] -rotate-[2deg] md:top-[10%] md:bottom-[-16%] md:left-[-8%] md:right-[-22%] lg:left-[-6%] lg:-rotate-[2.5deg] xl:left-[-4%] xl:right-[-26%]"
        }
      >
        <Image
          src={illustration.src}
          alt=""
          width={illustration.width}
          height={illustration.height}
          quality={100}
          priority
          className={
            isMobile
              ? "h-full w-full object-cover object-[42%_58%]"
              : "h-full w-full object-cover object-[22%_62%] md:object-[24%_60%] lg:object-[28%_56%]"
          }
          sizes={
            isMobile
              ? "(max-width: 767px) 70vw, 320px"
              : "(min-width: 1280px) 96vw, (min-width: 768px) 90vw, 1px"
          }
        />
      </div>
    </motion.div>
  );
}
