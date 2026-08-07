import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AppChrome } from "@/components/layout/AppChrome";
import {
  getDefaultLayoutRobots,
  getMetadataBase,
  seo,
} from "@/config/seo";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: seo.siteName,
  description: seo.defaultDescription,
  robots: getDefaultLayoutRobots(),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <AppChrome>{children}</AppChrome>
      </body>
    </html>
  );
}
