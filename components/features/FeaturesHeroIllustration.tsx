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
            : // Broad right-entry sweep: flatter than the previous diagonal,
              // with faint strands reaching centre and saturated blue in view.
              "features-hero-visual absolute top-[-28%] bottom-[-32%] left-[34%] right-[-18%] origin-[48%_54%] rotate-[3deg] lg:top-[-34%] lg:bottom-[-40%] lg:left-[22%] lg:right-[-20%] lg:rotate-[4deg] xl:left-[18%] xl:right-[-22%]"
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
              : "h-full w-full object-cover object-[42%_54%] lg:object-[44%_50%] xl:object-[46%_48%]"
          }
          sizes={
            isMobile
              ? "(max-width: 767px) 86vw, 380px"
              : "(min-width: 1280px) 88vw, (min-width: 1024px) 92vw, (min-width: 768px) 78vw, 1px"
          }
        />
      </div>
    </motion.div>
  );
}
