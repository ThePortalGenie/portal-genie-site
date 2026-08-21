import { Montserrat } from "next/font/google";
import type { ReactNode } from "react";
import "./styles/portal-statement-scroll.css";
import "./styles/portal-customise-scroll.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
});

type ClientPortalSimulatorLayoutProps = {
  children: ReactNode;
  /** Internal route uses flex column to fill the app shell. */
  contained?: boolean;
};

export function ClientPortalSimulatorLayout({
  children,
  contained = false,
}: ClientPortalSimulatorLayoutProps) {
  return (
    <div
      className={`${montserrat.className}${contained ? " flex min-h-0 flex-1 flex-col" : ""}`}
      style={{ fontFamily: "'Montserrat', sans-serif" }}
    >
      {children}
    </div>
  );
}
