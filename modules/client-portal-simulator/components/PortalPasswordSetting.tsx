"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useDemoPortal } from "@/modules/client-portal-simulator/state/context";
import { DemoToggle } from "@/modules/client-portal-simulator/components/PortalSettingToggle";

export function PortalPasswordSetting() {
  const { state, dispatch } = useDemoPortal();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <p className="text-xs leading-relaxed text-portal-navy/65">
        Add an extra password requirement for customers accessing your Client Portal.
      </p>
      <div className="mt-4 flex items-center gap-3 text-sm font-medium">
        <span className={!state.portalPasswordEnabled ? "text-portal-navy" : "text-portal-navy/45"}>
          Disable
        </span>
        <DemoToggle
          enabled={state.portalPasswordEnabled}
          onChange={(enabled) => dispatch({ type: "SET_PORTAL_PASSWORD_ENABLED", enabled })}
          ariaLabel="Password on Client Portal"
        />
        <span className={state.portalPasswordEnabled ? "text-portal-navy" : "text-portal-navy/45"}>
          Enable
        </span>
      </div>

      {state.portalPasswordEnabled ? (
        <div className="mt-4 space-y-2 border-t border-muted/15 pt-4">
          <label className="block">
            <span className="mb-1 block text-xs font-medium text-portal-navy/70">
              Portal password
            </span>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={state.portalPassword}
                onChange={(event) =>
                  dispatch({ type: "SET_PORTAL_PASSWORD", password: event.target.value })
                }
                placeholder="Enter password"
                className="w-full rounded-lg border border-muted/30 py-2 pl-3 pr-10 text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword((visible) => !visible)}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-portal-navy/50 hover:text-portal-navy"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <Eye className="h-4 w-4" aria-hidden="true" />
                )}
              </button>
            </div>
          </label>
          <p className="text-[11px] leading-relaxed text-portal-navy/55">
            Customers will need this password in addition to the normal portal sign-in process.
          </p>
        </div>
      ) : null}
    </div>
  );
}
