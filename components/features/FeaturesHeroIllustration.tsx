"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { featuresPage } from "@/content/features";

type FeaturesHeroIllustrationProps = {
  variant?: "desktop" | "mobile";
};

/**
 * Features-page-only hero streak. Deliberately separate from WhyHeroIllustration
 * so each page can keep its own composition:
 * Why → more horizontal, right-entry
 * Features → steeper diagonal, lower-centre → upper-right
 */
export function FeaturesHeroIllustration({
  variant = "desktop",
}: FeaturesHeroIllustrationProps) {
  const { illustration } = featuresPage.hero;
  const prefersReducedMotion = useReducedMotion();
  const isMobile = variant === "mobile";

  return (
    <motion.div
      className={
        isMobile
          ? "pointer-events-none relative mx-auto w-full max-w-[min(100%,380px)] opacity-70"
          : "pointer-events-none absolute inset-0"
      }
      initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      aria-hidden="true"
    >
      <div
        className={
          isMobile
            ? "features-hero-visual features-hero-visual--stacked w-full"
            : // Larger than the hero, gently rotated for a steeper upward
              // trajectory, biased so strong blue crops past the upper-right.
              "features-hero-visual absolute left-[6%] top-[-18%] h-[130%] w-[108%] origin-[70%_55%] -rotate-[5deg] md:left-[6%] md:w-[100%] lg:left-[5%] lg:w-[105%] lg:-rotate-[6deg] xl:left-[7%] xl:w-[108%]"
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
              ? "h-auto w-full object-contain object-center"
              : "h-full w-full object-cover object-[58%_48%] lg:object-[58%_42%]"
          }
          sizes={
            isMobile
              ? "(max-width: 767px) 86vw, 380px"
              : "(min-width: 1280px) 75vw, (min-width: 768px) 70vw, 1px"
          }
        />
      </div>
    </motion.div>
  );
}
