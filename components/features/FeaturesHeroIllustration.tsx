import Image from "next/image";
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
  const isMobile = variant === "mobile";

  return (
    <div
      className={
        isMobile
          ? "hero-animate-enter-sm pointer-events-none relative mx-auto w-full max-w-[min(100%,380px)] opacity-70"
          : "hero-animate-enter-sm pointer-events-none absolute inset-0"
      }
      aria-hidden="true"
    >
      <div
        className={
          isMobile
            ? "features-hero-visual features-hero-visual--stacked w-full"
            : // Broad right-entry sweep — shifted upward so strong blue sits
              // around the hero centre rather than below the bottom edge.
              "features-hero-visual absolute top-[-42%] bottom-[-18%] left-[34%] right-[-18%] origin-[48%_48%] rotate-[3deg] lg:top-[-50%] lg:bottom-[-20%] lg:left-[22%] lg:right-[-20%] lg:rotate-[4deg] xl:top-[-52%] xl:bottom-[-22%] xl:left-[18%] xl:right-[-22%]"
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
              : "h-full w-full object-cover object-[42%_62%] lg:object-[44%_58%] xl:object-[46%_56%]"
          }
          sizes={
            isMobile
              ? "(max-width: 767px) 86vw, 380px"
              : "(min-width: 1280px) 88vw, (min-width: 1024px) 92vw, (min-width: 768px) 78vw, 1px"
          }
        />
      </div>
    </div>
  );
}
