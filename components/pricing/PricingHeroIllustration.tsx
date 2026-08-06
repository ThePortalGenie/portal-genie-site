"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { pricingPage } from "@/content/pricing";

type PricingHeroIllustrationProps = {
  variant?: "desktop" | "mobile";
};

/**
 * Pricing-page-only hero streak. Same asset as Features, different composition:
 * broad gentle arc from upper/mid-right toward lower-centre — grounded and
 * guiding the eye toward the pricing plans below.
 */
export function PricingHeroIllustration({
  variant = "desktop",
}: PricingHeroIllustrationProps) {
  const { illustration } = pricingPage.hero;
  const prefersReducedMotion = useReducedMotion();
  const isMobile = variant === "mobile";

  return (
    <motion.div
      className={
        isMobile
          ? "pointer-events-none absolute inset-0"
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
            ? "pricing-hero-visual pricing-hero-visual--stacked absolute inset-0 h-full w-full origin-[65%_62%] rotate-[1deg] opacity-75"
            : // Broad horizontal ribbon: shifted far left, anchored in the lower
              // hero, tiny clockwise rotation to flatten the natural upward curve.
              "pricing-hero-visual absolute top-[22%] bottom-[-62%] left-[10%] right-[-12%] origin-[52%_68%] rotate-[2deg] md:top-[20%] md:bottom-[-58%] md:left-[14%] lg:left-[16%] lg:rotate-[3deg] xl:left-[18%] xl:right-[-14%]"
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
              ? "h-full w-full object-cover object-[62%_52%]"
              : "h-full w-full object-cover object-[34%_72%] lg:object-[38%_70%]"
          }
          sizes={
            isMobile
              ? "(max-width: 767px) 70vw, 340px"
              : "(min-width: 1280px) 72vw, (min-width: 768px) 68vw, 1px"
          }
        />
      </div>
    </motion.div>
  );
}
