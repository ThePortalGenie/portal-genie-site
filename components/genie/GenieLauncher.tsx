"use client";

import { Sparkles } from "lucide-react";

type GenieLauncherProps = {
  isOpen: boolean;
  controlsId: string;
  buttonRef: React.RefObject<HTMLButtonElement | null>;
  onToggle: () => void;
};

export function GenieLauncher({
  isOpen,
  controlsId,
  buttonRef,
  onToggle,
}: GenieLauncherProps) {
  return (
    <button
      ref={buttonRef}
      type="button"
      aria-expanded={isOpen}
      aria-controls={isOpen ? controlsId : undefined}
      aria-label={isOpen ? "Close Genie assistant" : "Ask Genie"}
      onClick={onToggle}
      className={[
        "fixed z-[90] inline-flex items-center gap-2 rounded-button bg-portal-navy px-4 py-3 text-sm font-medium text-white shadow-[0_12px_32px_-12px_rgba(17,33,54,0.45)] transition-[transform,box-shadow,background-color] duration-200 hover:bg-portal-navy/95 hover:shadow-[0_16px_36px_-12px_rgba(17,33,54,0.5)] motion-reduce:transition-none",
        "bottom-[max(5.5rem,env(safe-area-inset-bottom))] right-4 sm:bottom-6 sm:right-6",
      ].join(" ")}
    >
      <Sparkles className="h-4 w-4 text-portal-teal" aria-hidden="true" />
      <span>Ask Genie</span>
    </button>
  );
}
