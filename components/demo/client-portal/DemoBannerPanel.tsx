"use client";

import { ArrowRight, Gift, Megaphone, Receipt } from "lucide-react";
import { useDemoPortal } from "@/lib/demo/client-portal/context";
import type { BannerId } from "@/lib/demo/client-portal/types";

const BANNERS: Record<
  BannerId,
  {
    eyebrow: string;
    title: string;
    body: string;
    cta: string;
    icon: typeof Receipt;
    gradient: string;
  }
> = {
  "portal-genie": {
    eyebrow: "Portal Genie",
    title: "Your clients deserve a better portal experience",
    body: "Give customers 24/7 access to invoices, documents, and account services — without the admin burden.",
    cta: "Learn more",
    icon: Megaphone,
    gradient: "from-[#0077BE] to-[#00BEB9]",
  },
  "tax-season": {
    eyebrow: "Tax Season",
    title: "Provisional tax deadline approaching",
    body: "Ensure your supporting documents are uploaded before 28 August to avoid delays.",
    cta: "Upload documents",
    icon: Receipt,
    gradient: "from-[#1D4ED8] to-[#3B82F6]",
  },
  "refer-client": {
    eyebrow: "Refer a Client",
    title: "Know someone who needs better client service?",
    body: "Refer a business to Summit Accounting Partners and receive a thank-you credit on your next invoice.",
    cta: "Refer now",
    icon: Gift,
    gradient: "from-[#059669] to-[#34D399]",
  },
  "new-service": {
    eyebrow: "New Service",
    title: "CFO advisory now available",
    body: "Strategic financial guidance for growing businesses — monthly sessions with a senior advisor.",
    cta: "Find out more",
    icon: ArrowRight,
    gradient: "from-[#112136] to-[#0077BE]",
  },
};

export function DemoBannerPanel() {
  const { state } = useDemoPortal();
  const banner = BANNERS[state.activeBanner];
  const Icon = banner.icon;

  return (
    <aside
      className="hidden w-72 shrink-0 xl:block 2xl:w-80"
      aria-label="Promotional banner"
    >
      <div
        className={`sticky top-4 overflow-hidden rounded-card bg-gradient-to-br ${banner.gradient} p-6 text-white shadow-[0_16px_40px_-20px_rgba(17,33,54,0.35)]`}
      >
        <div className="mb-4 inline-flex rounded-badge bg-white/15 p-2">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-white/75">
          {banner.eyebrow}
        </p>
        <h2 className="mt-2 text-lg font-semibold leading-snug">{banner.title}</h2>
        <p className="mt-3 text-sm leading-relaxed text-white/85">{banner.body}</p>
        <button
          type="button"
          className="mt-5 inline-flex items-center gap-2 rounded-button bg-white/15 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/25"
        >
          {banner.cta}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </aside>
  );
}

export function DemoBannerMobile() {
  const { state } = useDemoPortal();
  const banner = BANNERS[state.activeBanner];

  return (
    <div
      className={`mt-4 overflow-hidden rounded-card bg-gradient-to-br ${banner.gradient} p-5 text-white xl:hidden`}
      aria-label="Promotional banner"
    >
      <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-white/75">
        {banner.eyebrow}
      </p>
      <h2 className="mt-1 text-base font-semibold">{banner.title}</h2>
      <p className="mt-2 text-sm text-white/85">{banner.body}</p>
    </div>
  );
}
