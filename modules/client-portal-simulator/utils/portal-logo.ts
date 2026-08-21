import { DEFAULT_LOGO_PATH } from "@/modules/client-portal-simulator/data/constants";
import type { DemoPortalState } from "@/modules/client-portal-simulator/types";

type PortalLogoState = Pick<
  DemoPortalState,
  "logoUrl" | "alternateLogoUrl" | "useAlternatePortalLogo"
>;

export function getPortalLogo(state: PortalLogoState): string {
  if (state.useAlternatePortalLogo && state.alternateLogoUrl) {
    return state.alternateLogoUrl;
  }

  return state.logoUrl ?? DEFAULT_LOGO_PATH;
}

export function revokeBlobUrl(url: string | null | undefined): void {
  if (url?.startsWith("blob:")) {
    URL.revokeObjectURL(url);
  }
}
