"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { Header } from "@/components/navigation/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTopOnNavigate } from "@/components/layout/ScrollToTopOnNavigate";

/** Routes that use their own campaign chrome instead of the main site header/footer */
const CAMPAIGN_ROUTES = ["/xerocon", "/demo", "/internal/client-portal"];

export function AppChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isCampaignRoute = CAMPAIGN_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  if (isCampaignRoute) {
    return (
      <>
        <ScrollToTopOnNavigate />
        <div className="flex-1">{children}</div>
      </>
    );
  }

  return (
    <>
      <ScrollToTopOnNavigate />
      <Header />
      <div className="flex-1">{children}</div>
      <Footer />
    </>
  );
}
