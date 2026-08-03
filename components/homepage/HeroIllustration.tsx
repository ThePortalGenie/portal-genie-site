"use client";



import Image from "next/image";

import { motion, useReducedMotion } from "framer-motion";

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

 * On large screens it's absolutely positioned *behind* the copy (see the

 * z-index handling in Hero.tsx) and deliberately reaches left underneath

 * the text column, so the wave feels like it flows through the whole hero

 * rather than sitting beside it. The source artwork enters from the top

 * *right* and sweeps down to a tail at the bottom left, so it's mirrored

 * horizontally (`-scale-x-100`) — that puts the thin, quiet entry point at

 * top-left (behind the headline) and lets the brighter, thicker body sweep

 * down and out to the right as it passes the CTAs, guiding the eye down

 * the page instead of just sideways across it.

 *

 * Desktop position and width are driven by CSS custom properties (see

 * `heroIllustrationLayout.ts` and `.hero-wave-wrapper` in globals.css) so

 * horizontal placement can be fine-tuned in one place without `translate-x`

 * or other transforms that would conflict with Framer Motion's y-axis

 * entrance and idle float animations.

 *

 * A very low-opacity ambient glow sits behind it for depth. Fades and lifts

 * in once on load, then holds a barely-visible idle float — the two

 * effects are separate, nested motion elements so the one-shot entrance

 * and the infinite float never fight each other.

 */

export function HeroIllustration() {

  const { illustration } = homepage.hero;

  const prefersReducedMotion = useReducedMotion();

  const { imageSizes } = heroIllustrationLayout;



  return (

    <motion.div

      className="hero-wave-wrapper pointer-events-none relative lg:mx-0 lg:max-w-none"

      style={heroIllustrationLayoutVars()}

      initial={{ opacity: 0, y: 24 }}

      animate={{ opacity: 1, y: 0 }}

      transition={{ duration: 0.8, ease: "easeOut" }}

    >

      <div

        aria-hidden="true"

        className="pointer-events-none absolute -inset-[15%] -z-10 rounded-full bg-portal-blue/5 blur-[130px]"

      />



      <motion.div

        aria-hidden="true"

        animate={prefersReducedMotion ? undefined : { y: [0, -4, 0] }}

        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}

      >

        <Image

          src={illustration.src}

          alt=""

          width={1536}

          height={1024}

          quality={100}

          priority

          className="h-auto w-full -scale-x-100 object-contain drop-shadow-[0_24px_48px_rgba(17,33,54,0.10)]"

          sizes={imageSizes}

        />

      </motion.div>

    </motion.div>

  );

}

