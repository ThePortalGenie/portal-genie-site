"use client";

import { useDemoPortal } from "@/modules/client-portal-simulator/state/context";
import { PortalSettingToggle } from "@/modules/client-portal-simulator/components/PortalSettingToggle";
import { PortalPasswordSetting } from "@/modules/client-portal-simulator/components/PortalPasswordSetting";
import { PortalDomainSetting } from "@/modules/client-portal-simulator/components/PortalDomainSetting";
import { CustomiseSection } from "@/modules/client-portal-simulator/components/CustomiseSection";

export function CustomiseSettingsTab() {
  const { state, dispatch } = useDemoPortal();

  return (
    <div className="space-y-2">
      <CustomiseSection title="Password on Client Portal">
        <PortalPasswordSetting />
      </CustomiseSection>

      <CustomiseSection title="Client Portal Domain">
        <PortalDomainSetting />
      </CustomiseSection>

      <CustomiseSection title="Allow Additional Contacts To Access The Portal">
        <PortalSettingToggle
          title="Allow Additional Contacts To Access The Portal"
          description="When enabled, additional contacts linked to the primary customer can be granted access to that customer's Client Portal."
          enabled={state.allowAdditionalContactsPortalAccess}
          onChange={(enabled) =>
            dispatch({ type: "SET_ALLOW_ADDITIONAL_CONTACTS", enabled })
          }
          ariaLabel="Allow additional contacts to access the portal"
          embedded
        />
      </CustomiseSection>
    </div>
  );
}
