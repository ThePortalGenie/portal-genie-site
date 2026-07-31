"use client";

import type { ReactNode } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
};

export function ScrollReveal({ children, className = "" }: ScrollRevealProps) {
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <div
      ref={ref}
      className={[
        "transition-all duration-500 motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </div>
  );
}
