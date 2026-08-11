import { isGenieEnabled } from "@/config/genie";
import { GenieClientRoot } from "@/components/genie/GenieClientRoot";

/** Server gate — renders Genie UI only when GENIE_ENABLED=true. */
export function GenieRoot() {
  if (!isGenieEnabled()) {
    return null;
  }

  return <GenieClientRoot />;
}
