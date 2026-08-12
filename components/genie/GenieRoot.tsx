import { isGenieEnabled } from "@/config/genie";
import { GenieClientRoot } from "@/components/genie/GenieClientRoot";

/**
 * Server hint for Genie visibility. The client re-checks `/api/genie/status` at
 * runtime when this is false so Preview/production env vars are respected even
 * if the root layout was statically prerendered without them.
 */
export function GenieRoot() {
  return <GenieClientRoot initiallyEnabled={isGenieEnabled()} />;
}
