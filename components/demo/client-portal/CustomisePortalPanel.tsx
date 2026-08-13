"use client";

import { useRef } from "react";
import { X } from "lucide-react";
import {
  BANNER_OPTIONS,
  BRAND_PRESETS,
  DEMO_CUSTOMER,
} from "@/lib/demo/client-portal/constants";
import { useDemoPortal } from "@/lib/demo/client-portal/context";
import type { BrandPresetId, BrandingTheme } from "@/lib/demo/client-portal/types";

const ACCEPTED_LOGO_TYPES = ["image/png", "image/jpeg", "image/webp", "image/svg+xml"];

const BRANDING_FIELDS: {
  key: keyof BrandingTheme;
  label: string;
}[] = [
  { key: "brandColor", label: "Main brand colour" },
  { key: "sidebarBg", label: "Sidebar background" },
  { key: "menuText", label: "Unselected menu text" },
  { key: "menuSelectedText", label: "Selected menu text" },
  { key: "menuSelectedBg", label: "Selected menu background" },
  { key: "portalText", label: "General portal text" },
  { key: "tableBodyText", label: "Table body text" },
  { key: "tableHeadingBg", label: "Table heading background" },
  { key: "tableHeadingText", label: "Table heading text" },
  { key: "payNowBg", label: "Pay Now button background" },
  { key: "payNowText", label: "Pay Now button text" },
  { key: "amountColor", label: "Amount / balance text" },
  { key: "accentColor", label: "Accent colour" },
];

export function CustomisePortalPanel() {
  const { state, dispatch } = useDemoPortal();
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!state.customiseOpen) {
    return null;
  }

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file) {
      return;
    }

    if (!ACCEPTED_LOGO_TYPES.includes(file.type)) {
      dispatch({
        type: "SET_LOGO_ERROR",
        error: "Please choose a PNG, JPG, WebP, or SVG image.",
      });
      return;
    }

    if (state.logoUrl?.startsWith("blob:")) {
      URL.revokeObjectURL(state.logoUrl);
    }

    dispatch({ type: "SET_LOGO", logoUrl: URL.createObjectURL(file) });
  };

  const restoreDefaultLogo = () => {
    if (state.logoUrl?.startsWith("blob:")) {
      URL.revokeObjectURL(state.logoUrl);
    }
    dispatch({ type: "SET_LOGO", logoUrl: null });
  };

  return (
    <>
      <button
        type="button"
        className="fixed inset-0 z-[110] bg-portal-navy/40"
        aria-label="Close customise panel"
        onClick={() => dispatch({ type: "SET_CUSTOMISE_OPEN", open: false })}
      />
      <aside
        className="fixed inset-y-0 right-0 z-[115] flex w-full max-w-md flex-col border-l border-muted/20 bg-surface shadow-2xl"
        aria-label="Customise portal"
      >
        <div className="flex items-center justify-between border-b border-muted/20 px-4 py-4">
          <h2 className="text-lg font-semibold text-portal-navy">Customise Portal</h2>
          <button
            type="button"
            onClick={() => dispatch({ type: "SET_CUSTOMISE_OPEN", open: false })}
            className="rounded-button p-2 text-portal-navy/70 hover:bg-background"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4">
          <section className="mb-6">
            <h3 className="text-sm font-semibold text-portal-navy">Brand presets</h3>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {(Object.keys(BRAND_PRESETS) as BrandPresetId[]).map((presetId) => (
                <button
                  key={presetId}
                  type="button"
                  onClick={() => dispatch({ type: "APPLY_PRESET", presetId })}
                  className="rounded-lg border border-muted/25 px-3 py-2 text-left text-sm font-medium text-portal-navy/80 transition-colors hover:border-portal-blue/30 hover:text-portal-blue"
                >
                  {BRAND_PRESETS[presetId].label}
                </button>
              ))}
            </div>
          </section>

          <section className="mb-6">
            <h3 className="text-sm font-semibold text-portal-navy">Portal identity</h3>
            <div className="mt-3 space-y-3">
              <label className="block">
                <span className="mb-1 block text-xs font-medium text-portal-navy/70">
                  Company name
                </span>
                <input
                  value={state.companyName}
                  onChange={(event) =>
                    dispatch({ type: "SET_COMPANY_NAME", name: event.target.value })
                  }
                  className="w-full rounded-lg border border-muted/30 px-3 py-2 text-sm"
                />
              </label>
              <label className="block">
                <span className="mb-1 block text-xs font-medium text-portal-navy/70">
                  Greeting / customer name
                </span>
                <input
                  value={state.customerName}
                  onChange={(event) =>
                    dispatch({ type: "SET_CUSTOMER_NAME", name: event.target.value })
                  }
                  className="w-full rounded-lg border border-muted/30 px-3 py-2 text-sm"
                />
              </label>
            </div>
          </section>

          <section className="mb-6">
            <h3 className="text-sm font-semibold text-portal-navy">Logo</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="rounded-button border border-muted/30 px-3 py-2 text-sm font-medium text-portal-navy/80 hover:border-portal-blue/30"
              >
                Upload Logo
              </button>
              <button
                type="button"
                onClick={restoreDefaultLogo}
                className="rounded-button border border-muted/30 px-3 py-2 text-sm font-medium text-portal-navy/80 hover:border-portal-blue/30"
              >
                Restore Default Logo
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept={ACCEPTED_LOGO_TYPES.join(",")}
                className="sr-only"
                onChange={handleLogoUpload}
              />
            </div>
            {state.logoError ? (
              <p className="mt-2 text-sm text-red-600" role="alert">
                {state.logoError}
              </p>
            ) : null}
          </section>

          <section className="mb-6">
            <h3 className="text-sm font-semibold text-portal-navy">Active banner</h3>
            <div className="mt-3 space-y-2">
              {BANNER_OPTIONS.map((option) => (
                <label
                  key={option.id}
                  className="flex cursor-pointer items-center gap-2 rounded-lg border border-muted/20 px-3 py-2 text-sm"
                >
                  <input
                    type="radio"
                    name="demo-banner"
                    checked={state.activeBanner === option.id}
                    onChange={() => dispatch({ type: "SET_BANNER", banner: option.id })}
                  />
                  {option.label}
                </label>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-sm font-semibold text-portal-navy">Colour controls</h3>
            <div className="mt-3 space-y-3">
              {BRANDING_FIELDS.map((field) => (
                <label key={field.key} className="flex items-center justify-between gap-3">
                  <span className="text-xs font-medium text-portal-navy/70">{field.label}</span>
                  <input
                    type="color"
                    value={normalizeColorForInput(state.branding[field.key])}
                    onChange={(event) =>
                      dispatch({
                        type: "SET_BRANDING",
                        branding: { [field.key]: event.target.value },
                      })
                    }
                    className="h-9 w-14 cursor-pointer rounded border border-muted/30 bg-surface p-1"
                    aria-label={field.label}
                  />
                </label>
              ))}
            </div>
          </section>
        </div>

        <div className="border-t border-muted/20 px-4 py-3">
          <button
            type="button"
            onClick={() => {
              dispatch({ type: "SET_COMPANY_NAME", name: DEMO_CUSTOMER.company });
              dispatch({ type: "SET_CUSTOMER_NAME", name: DEMO_CUSTOMER.contact });
              restoreDefaultLogo();
            }}
            className="text-sm font-medium text-portal-blue hover:text-portal-blue/80"
          >
            Reset identity to defaults
          </button>
        </div>
      </aside>
    </>
  );
}

function normalizeColorForInput(value: string): string {
  if (/^#[0-9A-Fa-f]{6}$/.test(value)) {
    return value;
  }
  return "#112136";
}
