"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const Genie = dynamic(
  () => import("@/components/genie/Genie").then((module) => module.Genie),
  { ssr: false },
);

type GenieClientRootProps = {
  /** SSR hint from GenieRoot — skipped when true to avoid an extra status fetch. */
  initiallyEnabled?: boolean;
};

const DEMO_ROUTE_PREFIX = "/demo/client-portal";

export function GenieClientRoot({
  initiallyEnabled = false,
}: GenieClientRootProps) {
  const pathname = usePathname();
  const [enabled, setEnabled] = useState<boolean | null>(
    initiallyEnabled ? true : null,
  );

  useEffect(() => {
    if (initiallyEnabled) {
      return;
    }

    let cancelled = false;

    fetch("/api/genie/status")
      .then(async (response) => {
        if (!response.ok) {
          return { enabled: false };
        }

        return (await response.json()) as { enabled?: boolean };
      })
      .then((payload) => {
        if (!cancelled) {
          setEnabled(payload.enabled === true);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setEnabled(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [initiallyEnabled]);

  if (pathname === DEMO_ROUTE_PREFIX || pathname.startsWith(`${DEMO_ROUTE_PREFIX}/`)) {
    return null;
  }

  if (enabled !== true) {
    return null;
  }

  return <Genie />;
}
