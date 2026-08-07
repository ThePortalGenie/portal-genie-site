"use client";

import { useState } from "react";
import { ConsentBanner } from "@/components/analytics/ConsentBanner";

export function ConsentPreferencesTrigger() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="text-sm text-portal-navy/70 transition-colors duration-200 hover:text-portal-blue"
      >
        Cookie preferences
      </button>
      {open ? (
        <ConsentBanner forceOpen onClose={() => setOpen(false)} />
      ) : null}
    </>
  );
}
