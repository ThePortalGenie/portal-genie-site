"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { pricingPage } from "@/content/pricing";

type PricingHeroIllustrationProps = {
  variant?: "desktop" | "mobile";
};

/**
 * Pricing-page-only hero streak. Same asset as Features, flattest composition:
 * oversized layer clipped to the hero so the mid-ribbon stays visible across
 * the right half (not parked below the overflow edge).
 */
export function PricingHeroIllustration({
  variant = "desktop",
}: PricingHeroIllustrationProps) {
  const { illustration } = pricingPage.hero;
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
        className={
          isMobile
            ? "pricing-hero-visual pricing-hero-visual--stacked absolute inset-0 h-full w-full"
            : // Features-style oversized layer (h/w %), right-biased. Clockwise
              // rotation flattens the asset's natural rise. Tall % height keeps
              // the ribbon visible even in Pricing's short hero at 1920px.
              "pricing-hero-visual absolute left-[30%] top-[-70%] h-[250%] w-[90%] origin-[48%_52%] rotate-[12deg] md:left-[34%] md:top-[-65%] md:h-[240%] md:w-[86%] md:rotate-[13deg] lg:left-[38%] lg:top-[-60%] lg:h-[230%] lg:w-[82%] lg:rotate-[14deg] xl:left-[40%] xl:w-[80%]"
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
              ? "h-full w-full object-cover object-center"
              : "h-full w-full object-cover object-[40%_52%] md:object-[42%_50%] lg:object-[44%_48%] xl:object-[46%_46%]"
          }
          sizes={
            isMobile
              ? "1px"
              : "(min-width: 1536px) 70vw, (min-width: 1280px) 75vw, (min-width: 768px) 80vw, 1px"
          }
        />
      </div>
    </motion.div>
  );
}
