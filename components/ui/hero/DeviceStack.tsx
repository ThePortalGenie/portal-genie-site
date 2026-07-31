"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

export interface DeviceImage {
  src: string;
  alt: string;
}

export interface DeviceStackProps {
  laptop: DeviceImage;
  tablet: DeviceImage;
  phone: DeviceImage;
  /** Renders devices stacked vertically for narrow viewports. */
  compact?: boolean;
}

/** Subtle diagonal sheen so screens read as glass rather than flat images. */
function ScreenReflection() {
  return (
    <div
      className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,0.28)_0%,rgba(255,255,255,0)_38%)]"
      aria-hidden="true"
    />
  );
}

function LaptopFrame({ src, alt }: DeviceImage) {
  return (
    <figure className="w-full">
      <div className="rounded-t-xl border border-muted/20 bg-portal-navy p-[1.6%] shadow-[0_50px_90px_-30px_rgba(17,33,54,0.4)]">
        <div className="relative aspect-[16/10] overflow-hidden rounded-[4px] bg-surface">
          <Image
            src={src}
            alt={alt}
            fill
            quality={90}
            className="object-cover object-top"
            sizes="(max-width: 1024px) 78vw, 520px"
            priority
          />
          <ScreenReflection />
        </div>
      </div>
      <div className="mx-auto h-[7px] w-[92%] rounded-b-[3px] bg-muted/25" />
      <div className="mx-auto h-[3px] w-[48%] rounded-full bg-muted/20" />
    </figure>
  );
}

function TabletFrame({ src, alt }: DeviceImage) {
  return (
    <figure className="w-full overflow-hidden rounded-[1.1rem] border border-muted/20 bg-portal-navy p-[2.6%] shadow-[0_36px_64px_-24px_rgba(17,33,54,0.35)]">
      <div className="relative aspect-[4/3] overflow-hidden rounded-[6px] bg-surface">
        <Image
          src={src}
          alt={alt}
          fill
          quality={90}
          className="object-cover object-top"
          sizes="(max-width: 1024px) 42vw, 280px"
        />
        <ScreenReflection />
      </div>
    </figure>
  );
}

function PhoneFrame({ src, alt }: DeviceImage) {
  return (
    <figure className="w-full overflow-hidden rounded-[1.1rem] border border-muted/20 bg-portal-navy p-[4%] shadow-[0_28px_52px_-22px_rgba(17,33,54,0.35)]">
      <div className="relative aspect-[9/18] overflow-hidden rounded-[0.7rem] bg-surface">
        <Image
          src={src}
          alt={alt}
          fill
          quality={90}
          className="object-cover object-top"
          sizes="(max-width: 1024px) 26vw, 170px"
        />
        <ScreenReflection />
      </div>
    </figure>
  );
}

export function DeviceStack({ laptop, tablet, phone, compact = false }: DeviceStackProps) {
  const prefersReducedMotion = useReducedMotion();

  if (compact) {
    return (
      <div className="flex w-full flex-col items-center gap-6">
        <div className="w-full max-w-[300px]">
          <LaptopFrame {...laptop} />
        </div>
        <div className="flex w-full max-w-[260px] items-end justify-center gap-5">
          <div className="w-[32%] rotate-[-6deg]">
            <PhoneFrame {...phone} />
          </div>
          <div className="w-[56%] rotate-[4deg]">
            <TabletFrame {...tablet} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Layer 3 — the dashboard: the hero's undisputed focal point */}
      <motion.div
        className="absolute left-1/2 top-0 z-20 w-[84%] -translate-x-1/2"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div
          style={{
            transform: "perspective(1600px) rotateX(4deg)",
            transformOrigin: "50% 100%",
          }}
          animate={prefersReducedMotion ? undefined : { y: [0, -4, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          <LaptopFrame {...laptop} />
        </motion.div>
      </motion.div>

      {/* Layer 4 — supporting devices, overlapping the laptop's corners */}
      <motion.div
        className="absolute -right-[3%] bottom-[-3%] z-30 w-[46%]"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
      >
        <motion.div
          className="rotate-[6deg]"
          animate={prefersReducedMotion ? undefined : { y: [0, -6, 0] }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        >
          <TabletFrame {...tablet} />
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute -left-[4%] bottom-[6%] z-30 w-[29%]"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
      >
        <motion.div
          className="rotate-[-8deg]"
          animate={prefersReducedMotion ? undefined : { y: [0, -5, 0] }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.9,
          }}
        >
          <PhoneFrame {...phone} />
        </motion.div>
      </motion.div>
    </>
  );
}
