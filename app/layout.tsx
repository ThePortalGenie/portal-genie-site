import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { GoogleTagManager } from "@/components/analytics/GoogleTagManager";
import { AnalyticsBootstrap } from "@/components/analytics/AnalyticsBootstrap";
import { ConsentBanner } from "@/components/analytics/ConsentBanner";
import { AppChrome } from "@/components/layout/AppChrome";
import { SiteStructuredData } from "@/components/seo/SiteStructuredData";
import { getGtmId, isAnalyticsEnabled } from "@/config/analytics";
import {
  getDefaultLayoutRobots,
  getMetadataBase,
  getRootSocialMetadata,
  seo,
} from "@/config/seo";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: seo.siteName,
  description: seo.defaultDescription,
  robots: getDefaultLayoutRobots(),
  ...getRootSocialMetadata(),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gtmId = isAnalyticsEnabled() ? getGtmId() : undefined;

  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        {gtmId ? <GoogleTagManager gtmId={gtmId} /> : null}
        <AnalyticsBootstrap />
        <SiteStructuredData />
        <AppChrome>{children}</AppChrome>
        <ConsentBanner />
      </body>
    </html>
  );
}
