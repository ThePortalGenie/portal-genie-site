import Image from "next/image";
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
      black 68%,
      rgba(0, 0, 0, 0.55) 78%,
      rgba(0, 0, 0, 0.2) 90%,
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
      black 68%,
      rgba(0, 0, 0, 0.55) 78%,
      rgba(0, 0, 0, 0.2) 90%,
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
  const isMobile = variant === "mobile";

  return (
    <div
      className="hero-animate-enter-sm pointer-events-none absolute inset-0"
      aria-hidden="true"
    >
      <div
        style={isMobile ? mobileMaskStyle : desktopMaskStyle}
        className={
          isMobile
            ? "absolute inset-0 h-full w-full origin-[68%_56%] -rotate-[1.5deg] opacity-65"
            : // Upward-sweeping right-entry — raised so the strong ribbon sits
              // through the hero centre/right rather than below the fold.
              "absolute top-[-34%] bottom-[-20%] left-[34%] right-[-18%] origin-[52%_50%] -rotate-[1deg] lg:top-[-40%] lg:bottom-[-22%] lg:left-[22%] lg:right-[-20%] lg:-rotate-[2deg] xl:top-[-44%] xl:bottom-[-24%] xl:left-[18%] xl:right-[-22%] xl:-rotate-[2.5deg]"
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
              : "h-full w-full object-cover object-[40%_64%] lg:object-[42%_60%] xl:object-[44%_58%]"
          }
          sizes={
            isMobile
              ? "(max-width: 767px) 70vw, 320px"
              : "(min-width: 1280px) 88vw, (min-width: 1024px) 92vw, (min-width: 768px) 78vw, 1px"
          }
        />
      </div>
    </div>
  );
}
