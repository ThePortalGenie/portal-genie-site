"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Short, elegant connection stubs — not long sweeping curves — hinting at
 * the link between the dashboard and its companion devices without
 * competing for attention. Percentage-based so they track the
 * absolutely-positioned devices at any composition size.
 */
const PATHS = [
  "M41,45 C35,50 29,54 24,59",
  "M63,46 C70,51 76,55 80,59",
  "M56,80 C59,85 61,88 63,92",
];

export function ConnectorLines() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className="absolute inset-0 z-20 hidden h-full w-full md:block"
      aria-hidden="true"
    >
      {PATHS.map((d, index) => (
        <motion.path
          key={d}
          d={d}
          fill="none"
          stroke="var(--portal-blue)"
          strokeOpacity={0.22}
          strokeWidth={0.35}
          strokeDasharray="1.2 1.4"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{
            duration: prefersReducedMotion ? 0 : 0.9,
            delay: 0.6 + index * 0.2,
            ease: "easeInOut",
          }}
        />
      ))}
    </svg>
  );
}
