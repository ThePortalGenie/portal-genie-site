"use client";

import { Monitor, Smartphone } from "lucide-react";
import { useDemoPortal } from "@/lib/demo/client-portal/context";
import type { PreviewMode } from "@/lib/demo/client-portal/types";

function PreviewModeButton({
  mode,
  label,
  icon: Icon,
  active,
  onSelect,
}: {
  mode: PreviewMode;
  label: string;
  icon: typeof Monitor;
  active: boolean;
  onSelect: (mode: PreviewMode) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(mode)}
      className={`inline-flex h-[30px] items-center gap-1 rounded-md px-2.5 text-[11px] font-semibold transition-colors ${
        active
          ? "bg-portal-blue/15 text-portal-navy"
          : "text-portal-navy/55 hover:text-portal-navy"
      }`}
      aria-pressed={active}
    >
      <Icon className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
      {label}
    </button>
  );
}

export function PreviewModeSelector() {
  const { state, dispatch } = useDemoPortal();

  const setMode = (mode: PreviewMode) => {
    dispatch({ type: "SET_PREVIEW_MODE", mode });
  };

  return (
    <div
      className="inline-flex h-[36px] items-center rounded-lg border border-muted/25 bg-background/60 p-0.5"
      role="group"
      aria-label="Portal preview mode"
    >
      <PreviewModeButton
        mode="desktop"
        label="Desktop"
        icon={Monitor}
        active={state.previewMode === "desktop"}
        onSelect={setMode}
      />
      <PreviewModeButton
        mode="mobile"
        label="Mobile"
        icon={Smartphone}
        active={state.previewMode === "mobile"}
        onSelect={setMode}
      />
    </div>
  );
}
