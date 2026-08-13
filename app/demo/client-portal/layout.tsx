import { Montserrat } from "next/font/google";
import type { ReactNode } from "react";

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
