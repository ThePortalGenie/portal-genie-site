"use client";

import { isLightColor, normalizeHexColor } from "@/modules/client-portal-simulator/utils/color-contrast";

type PortalColourSelectorProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
};

export function PortalColourSelector({ label, value, onChange }: PortalColourSelectorProps) {
  const normalized = normalizeHexColor(value);
  const showLightRing = isLightColor(normalized);

  return (
    <div className="flex min-h-[42px] items-center justify-between gap-3">
      <span className="min-w-0 flex-1 pr-2 text-sm font-medium leading-tight text-portal-navy/80">
        {label}
      </span>

      <div className="flex w-[7.25rem] shrink-0 items-center gap-2 sm:w-[7.5rem]">
        <div className="relative h-8 w-8 shrink-0">
          <div
            className={`pointer-events-none absolute inset-0 rounded-[7px] border border-black/10 ${
              showLightRing ? "shadow-[inset_0_0_0_1px_rgba(0,0,0,0.06)]" : ""
            }`}
            style={{ backgroundColor: normalized }}
            aria-hidden="true"
          />
          <input
            type="color"
            value={normalized}
            onChange={(event) => onChange(event.target.value.toLowerCase())}
            className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
            aria-label={`Choose ${label}`}
          />
        </div>
        <span className="w-[4.75rem] shrink-0 text-[13px] font-medium tabular-nums text-[#9CA3AF]">
          {normalized}
        </span>
      </div>
    </div>
  );
}
