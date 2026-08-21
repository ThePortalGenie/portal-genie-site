"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { BRAND_PRESETS } from "@/lib/demo/client-portal/constants";
import {
  CORE_BRAND_COLOUR_FIELDS,
  DESKTOP_ADVANCED_COLOUR_FIELDS,
  readCoreBrandColours,
} from "@/lib/demo/client-portal/brand-colours";
import { MOBILE_COLOUR_FIELDS } from "@/lib/demo/client-portal/mobile-design";
import { useDemoPortal } from "@/lib/demo/client-portal/context";
import type { BrandPresetId, CoreBrandColourKey } from "@/lib/demo/client-portal/types";
import { PortalColourSelector } from "@/components/demo/client-portal/PortalColourSelector";

export function PortalColourControls() {
  const { state, dispatch } = useDemoPortal();
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const coreColours = readCoreBrandColours(state);

  return (
    <div className="space-y-5">
        <div>
          <p className="text-xs font-medium text-portal-navy/70">Brand Presets</p>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {(Object.keys(BRAND_PRESETS) as BrandPresetId[]).map((presetId) => {
              const isActive = state.activeBrandPresetId === presetId;
              return (
                <button
                  key={presetId}
                  type="button"
                  onClick={() => dispatch({ type: "APPLY_PRESET", presetId })}
                  className={`rounded-lg border px-3 py-2 text-left text-sm font-medium transition-colors ${
                    isActive
                      ? "border-portal-blue/40 bg-portal-blue/10 text-portal-blue"
                      : "border-muted/25 text-portal-navy/80 hover:border-portal-blue/30 hover:text-portal-blue"
                  }`}
                  aria-pressed={isActive}
                >
                  {BRAND_PRESETS[presetId].label}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <p className="text-xs font-medium text-portal-navy/70">Core Brand Colours</p>
          <p className="mt-1 text-xs leading-relaxed text-portal-navy/55">
            Choose three colours to quickly brand your entire Client Portal.
          </p>
          <div className="mt-3 space-y-2.5">
            {CORE_BRAND_COLOUR_FIELDS.map((field) => (
              <PortalColourSelector
                key={field.key}
                label={field.label}
                value={coreColours[field.key]}
                onChange={(color) =>
                  dispatch({
                    type: "APPLY_CORE_BRAND_COLOUR",
                    key: field.key as CoreBrandColourKey,
                    color,
                  })
                }
              />
            ))}
          </div>
        </div>

        <div>
          <button
            type="button"
            aria-expanded={advancedOpen}
            onClick={() => setAdvancedOpen((open) => !open)}
            className={`w-full cursor-pointer border bg-white px-3.5 py-3 text-left transition-colors hover:bg-[#fafafa] ${
              advancedOpen
                ? "rounded-b-none rounded-t-lg border-muted/30 border-b border-muted/20"
                : "rounded-lg border-muted/25 hover:border-muted/35"
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <span className="min-w-0">
                <span className="block text-sm font-semibold text-portal-navy">
                  Advanced Colour Controls
                </span>
                <span className="mt-1 block text-xs leading-relaxed text-portal-navy/60">
                  Fine-tune individual colours after applying your brand colours.
                </span>
              </span>
              <ChevronDown
                className={`mt-0.5 h-5 w-5 shrink-0 text-portal-navy/55 transition-transform duration-200 motion-reduce:transition-none ${
                  advancedOpen ? "rotate-180" : ""
                }`}
                strokeWidth={2}
                aria-hidden="true"
              />
            </div>
          </button>

          {advancedOpen ? (
            <div className="mt-3 space-y-4 rounded-lg border border-muted/20 bg-white p-3.5">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wide text-portal-navy/55">
                  Desktop
                </p>
                <div className="mt-2.5 space-y-2.5">
                  {DESKTOP_ADVANCED_COLOUR_FIELDS.map((field) => (
                    <PortalColourSelector
                      key={field.key}
                      label={field.label}
                      value={state.branding[field.key]}
                      onChange={(color) =>
                        dispatch({
                          type: "SET_BRANDING",
                          branding: { [field.key]: color },
                        })
                      }
                    />
                  ))}
                </div>
              </div>

              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wide text-portal-navy/55">
                  Mobile
                </p>
                <div className="mt-2.5 space-y-2.5">
                  {MOBILE_COLOUR_FIELDS.map((field) => (
                    <PortalColourSelector
                      key={field.key}
                      label={field.label}
                      value={state.mobileDesign[field.key]}
                      onChange={(color) =>
                        dispatch({
                          type: "SET_MOBILE_DESIGN",
                          mobileDesign: { [field.key]: color },
                        })
                      }
                    />
                  ))}
                </div>
              </div>
            </div>
          ) : null}
        </div>
    </div>
  );
}
