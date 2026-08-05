"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { Header } from "@/components/navigation/Header";
import { Footer } from "@/components/layout/Footer";

/** Routes that use their own campaign chrome instead of the main site header/footer */
const CAMPAIGN_ROUTES = ["/xerocon"];

export function AppChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isCampaignRoute = CAMPAIGN_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  if (isCampaignRoute) {
    return <div className="flex-1">{children}</div>;
  }

  return (
    <>
      <Header />
      <div className="flex-1">{children}</div>
      <Footer />
    </>
  );
}
