import Image from "next/image";
import { homepage } from "@/content/homepage";
import {
  heroIllustrationLayout,
  heroIllustrationLayoutVars,
} from "@/components/homepage/heroIllustrationLayout";

/**
 * Portal Genie's signature brand graphic. Deliberately unframed — no card,
 * border or coloured container — so it reads as part of the page rather
 * than a picture sitting on it.
 *
 * On large screens it's absolutely positioned as a right-hand visual (see
 * z-index handling in Hero.tsx). A left-edge CSS mask keeps the copy column
 * predominantly clear while allowing a soft integrated transition. The
 * source artwork is mirrored horizontally (`-scale-x-100`) so the quieter
 * entry sits toward the copy boundary and the brighter body expands into
 * the bottom-right of the hero.
 *
 * Desktop position and width are driven by CSS custom properties (see
 * `heroIllustrationLayout.ts` and `.hero-wave-wrapper` in globals.css).
 */
export function HeroIllustration() {
  const { illustration } = homepage.hero;
  const { imageSizes } = heroIllustrationLayout;

  return (
    <div
      className="hero-wave-wrapper hero-animate-enter pointer-events-none relative lg:mx-0 lg:max-w-none"
      style={heroIllustrationLayoutVars()}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-[10%] -z-10 translate-x-[12%] rounded-full bg-portal-blue/5 blur-[130px]"
      />

      <div aria-hidden="true" className="hero-animate-float">
        <Image
          src={illustration.src}
          alt=""
          width={1536}
          height={1024}
          quality={100}
          priority
          className="h-auto w-full -scale-x-100 object-contain opacity-95 drop-shadow-[0_24px_48px_rgba(17,33,54,0.08)]"
          sizes={imageSizes}
        />
      </div>
    </div>
  );
}
