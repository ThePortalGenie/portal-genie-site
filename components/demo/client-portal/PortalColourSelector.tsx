"use client";

import { useRef } from "react";

function normalizeColorForInput(value: string): string {
  if (/^#[0-9A-Fa-f]{6}$/.test(value)) {
    return value.toLowerCase();
  }
  return "#112136";
}

function formatHexDisplay(value: string): string {
  return normalizeColorForInput(value);
}

function isLightColor(hex: string): boolean {
  const normalized = normalizeColorForInput(hex);
  const red = Number.parseInt(normalized.slice(1, 3), 16);
  const green = Number.parseInt(normalized.slice(3, 5), 16);
  const blue = Number.parseInt(normalized.slice(5, 7), 16);
  const luminance = (0.299 * red + 0.587 * green + 0.114 * blue) / 255;
  return luminance > 0.85;
}

type PortalColourSelectorProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
};

export function PortalColourSelector({ label, value, onChange }: PortalColourSelectorProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const normalized = normalizeColorForInput(value);
  const showLightRing = isLightColor(normalized);

  return (
    <div className="flex min-h-[42px] items-center justify-between gap-3">
      <span className="min-w-0 flex-1 pr-2 text-sm font-medium leading-tight text-portal-navy/80">
        {label}
      </span>

      <div className="flex w-[7.25rem] shrink-0 items-center gap-2 sm:w-[7.5rem]">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className={`relative h-8 w-8 shrink-0 cursor-pointer rounded-[7px] border border-black/10 transition-shadow hover:ring-2 hover:ring-portal-blue/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-portal-blue/35 ${
            showLightRing ? "shadow-[inset_0_0_0_1px_rgba(0,0,0,0.06)]" : ""
          }`}
          style={{ backgroundColor: normalized }}
          aria-label={`Choose ${label}`}
        />
        <input
          ref={inputRef}
          type="color"
          value={normalized}
          onChange={(event) => onChange(event.target.value.toLowerCase())}
          className="sr-only"
          aria-hidden="true"
          tabIndex={-1}
        />
        <span className="w-[4.75rem] shrink-0 text-[13px] font-medium tabular-nums text-[#9CA3AF]">
          {formatHexDisplay(value)}
        </span>
      </div>
    </div>
  );
}
