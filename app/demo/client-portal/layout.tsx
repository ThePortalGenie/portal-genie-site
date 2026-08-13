import { Montserrat } from "next/font/google";
import type { ReactNode } from "react";
import "./portal-statement-scroll.css";
import "./portal-customise-scroll.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
});

export default function ClientPortalDemoLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div
      className={montserrat.className}
      style={{ fontFamily: "'Montserrat', sans-serif" }}
    >
      {children}
    </div>
  );
}
