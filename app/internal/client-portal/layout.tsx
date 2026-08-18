import { Montserrat } from "next/font/google";
import type { ReactNode } from "react";
import "@/app/demo/client-portal/portal-statement-scroll.css";
import "@/app/demo/client-portal/portal-customise-scroll.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
});

export default function InternalClientPortalLayout({
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
