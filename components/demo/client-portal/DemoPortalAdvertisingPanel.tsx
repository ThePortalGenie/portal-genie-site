"use client";

import { useDemoPortal } from "@/lib/demo/client-portal/context";
import { BANNER_ASSETS } from "@/lib/demo/client-portal/constants";

function CssBanner({
  title,
  subtitle,
  gradient,
}: {
  title: string;
  subtitle: string;
  gradient: string;
}) {
  return (
    <div
      className={`flex h-full min-h-[420px] flex-col justify-center px-8 py-10 text-white ${gradient}`}
    >
      <p className="text-[11px] font-semibold uppercase tracking-[0.08em] opacity-80">
        Portal Genie
      </p>
      <h3 className="mt-3 text-3xl font-bold leading-tight">{title}</h3>
      <p className="mt-4 max-w-sm text-sm leading-relaxed opacity-90">{subtitle}</p>
    </div>
  );
}

export function DemoPortalAdvertisingPanel() {
  const { state } = useDemoPortal();
  const banner = BANNER_ASSETS[state.activeBanner];

  let content: React.ReactNode;

  if (state.activeBanner === "portal-genie" && banner.image) {
    content = (
      <img
        src={banner.image}
        alt={banner.alt}
        className="max-h-full max-w-full object-contain"
        draggable={false}
      />
    );
  } else if (state.activeBanner === "tax-season") {
    content = (
      <CssBanner
        title="Provisional tax deadline approaching"
        subtitle="Ensure your supporting documents are uploaded before 28 August to avoid delays."
        gradient="bg-gradient-to-br from-[#1D4ED8] to-[#3B82F6]"
      />
    );
  } else if (state.activeBanner === "refer-client") {
    content = (
      <CssBanner
        title="Refer a client"
        subtitle="Refer a business to your accountant and receive a thank-you credit on your next invoice."
        gradient="bg-gradient-to-br from-[#059669] to-[#34D399]"
      />
    );
  } else {
    content = (
      <CssBanner
        title="New service announcement"
        subtitle="CFO advisory sessions are now available for growing businesses."
        gradient="bg-gradient-to-br from-[#112136] to-[#0055FF]"
      />
    );
  }

  return (
    <aside
      className="flex h-full min-h-0 items-center justify-center border-l border-[#ececec] bg-white p-3"
      aria-label="Promotional banner"
    >
      {content}
    </aside>
  );
}

export function DemoPortalAdvertisingMobile() {
  const { state } = useDemoPortal();
  const banner = BANNER_ASSETS[state.activeBanner];

  if (state.activeBanner === "portal-genie" && banner.image) {
    return (
      <div className="mt-4 border-t border-[#ececec] bg-white p-4 lg:hidden">
        <img
          src={banner.image}
          alt={banner.alt}
          className="mx-auto max-h-[420px] w-full max-w-[420px] object-contain"
          draggable={false}
        />
      </div>
    );
  }

  return null;
}
