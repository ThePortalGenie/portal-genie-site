"use client";

import { motion, useReducedMotion } from "framer-motion";

export interface AnimatedWaveProps {
  path: string;
  color: string;
  opacity?: number;
  duration: number;
  reverse?: boolean;
  blur?: number;
  className?: string;
}

/**
 * Renders one flowing, seamlessly looping translucent ribbon using two
 * adjacent copies of the same path inside a 200%-wide track, translated by
 * -50% on loop. Only `transform` is animated, keeping the effect GPU-friendly.
 * This is Portal Genie's signature background motif — large, soft and slow
 * enough to feel ambient rather than "animated".
 */
export function AnimatedWave({
  path,
  color,
  opacity = 0.12,
  duration,
  reverse = false,
  blur = 48,
  className = "",
}: AnimatedWaveProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={`h-full w-[200%] ${className}`}
      style={{ opacity, filter: `blur(${blur}px)` }}
      animate={
        prefersReducedMotion
          ? undefined
          : { x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }
      }
      transition={{ duration, repeat: Infinity, ease: "linear" }}
    >
      <svg
        viewBox="0 0 1200 400"
        preserveAspectRatio="none"
        className="h-full w-1/2"
      >
        <path d={path} fill={color} />
      </svg>
      <svg
        viewBox="0 0 1200 400"
        preserveAspectRatio="none"
        className="h-full w-1/2"
      >
        <path d={path} fill={color} />
      </svg>
    </motion.div>
  );
}
