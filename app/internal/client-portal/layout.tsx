import type { ReactNode } from "react";
import { ClientPortalSimulatorLayout } from "@/modules/client-portal-simulator";

export default function InternalClientPortalLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ClientPortalSimulatorLayout contained>{children}</ClientPortalSimulatorLayout>
  );
}
