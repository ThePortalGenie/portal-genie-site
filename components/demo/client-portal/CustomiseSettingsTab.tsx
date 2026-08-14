"use client";

import { useDemoPortal } from "@/lib/demo/client-portal/context";
import { PortalSettingToggle } from "@/components/demo/client-portal/PortalSettingToggle";

export function CustomiseSettingsTab() {
  const { state, dispatch } = useDemoPortal();

  return (
    <section>
      <h3 className="text-sm font-semibold text-portal-navy">Settings</h3>
      <p className="mt-1 text-xs text-portal-navy/60">
        Portal behaviour and customer access settings.
      </p>

      <div className="mt-4 space-y-4">
        <PortalSettingToggle
          title="Allow Additional Contacts To Access The Portal"
          description="When enabled, additional contacts linked to the primary customer can be granted access to that customer's Client Portal."
          enabled={state.allowAdditionalContactsPortalAccess}
          onChange={(enabled) =>
            dispatch({ type: "SET_ALLOW_ADDITIONAL_CONTACTS", enabled })
          }
          ariaLabel="Allow additional contacts to access the portal"
        />
      </div>
    </section>
  );
}
