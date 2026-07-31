"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

export interface FloatingBadgeProps {
  icon: LucideIcon;
  label: string;
  className?: string;
  delay?: number;
  floatDuration?: number;
  floatDistance?: number;
}

/**
 * A small, secondary "capability node" — glass surface, tiny icon, one line
 * of text. Deliberately compact (~48px tall) so it never competes with the
 * dashboard for attention.
 */
export function FloatingBadge({
  icon: Icon,
  label,
  className = "",
  delay = 0,
  floatDuration = 5,
  floatDistance = 3,
}: FloatingBadgeProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={`flex h-12 items-center gap-2 rounded-badge border border-white/60 bg-white/55 px-3.5 shadow-[0_6px_16px_-8px_rgba(17,33,54,0.25)] backdrop-blur-md ${className}`}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      <motion.div
        className="flex items-center gap-2"
        animate={
          prefersReducedMotion
            ? undefined
            : { y: [0, -floatDistance, 0] }
        }
        transition={{
          duration: floatDuration,
          repeat: Infinity,
          ease: "easeInOut",
          delay,
        }}
      >
        <Icon
          className="size-3.5 shrink-0 text-portal-blue"
          strokeWidth={2}
          aria-hidden="true"
        />
        <span className="whitespace-nowrap text-xs font-medium text-portal-navy/90">
          {label}
        </span>
      </motion.div>
    </motion.div>
  );
}
