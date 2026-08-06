"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { pricingPage } from "@/content/pricing";

type PricingHeroIllustrationProps = {
  variant?: "desktop" | "mobile";
};

/**
 * Pricing-page-only hero streak. The horizontal source is oversized and
 * cropped by the existing hero so its soft trails reach centre while the
 * strongest blue remains inside the right edge.
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
            : // Tablet stays farther right for copy clearance. At lg/xl the
              // crop moves left so the source's strong blue is visibly in-frame.
              "pricing-hero-visual absolute top-[-92%] bottom-[-104%] left-[40%] right-[-14%] origin-[52%_58%] rotate-[1deg] lg:top-[-96%] lg:bottom-[-108%] lg:left-[30%] lg:right-[-12%] xl:left-[26%] xl:right-[-12%] xl:rotate-[2deg]"
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
              : "h-full w-full object-cover object-[52%_60%] lg:object-[54%_58%] xl:object-[56%_56%]"
          }
          sizes={
            isMobile
              ? "1px"
              : "(min-width: 1280px) 86vw, (min-width: 1024px) 82vw, (min-width: 768px) 74vw, 1px"
          }
        />
      </div>
    </motion.div>
  );
}
