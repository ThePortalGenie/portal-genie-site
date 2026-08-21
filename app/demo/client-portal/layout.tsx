import type { ReactNode } from "react";
import { ClientPortalSimulatorLayout } from "@/modules/client-portal-simulator";

export default function ClientPortalDemoLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <ClientPortalSimulatorLayout>{children}</ClientPortalSimulatorLayout>;
}
