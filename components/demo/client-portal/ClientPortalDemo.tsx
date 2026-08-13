"use client";

import { DemoPortalProvider, useDemoPortal } from "@/lib/demo/client-portal/context";
import { DemoSidebar } from "@/components/demo/client-portal/DemoSidebar";
import { DemoTopBar } from "@/components/demo/client-portal/DemoTopBar";
import {
  DemoBannerMobile,
  DemoBannerPanel,
} from "@/components/demo/client-portal/DemoBannerPanel";
import { CustomisePortalPanel } from "@/components/demo/client-portal/CustomisePortalPanel";
import { PaymentModal } from "@/components/demo/client-portal/PaymentModal";
import {
  DemoViewModals,
  ResetConfirmModal,
} from "@/components/demo/client-portal/DemoViewModals";
import { InvoicesSection } from "@/components/demo/client-portal/sections/InvoicesSection";
import { StatementSection } from "@/components/demo/client-portal/sections/StatementSection";
import {
  CreditNotesSection,
  QuotesSection,
} from "@/components/demo/client-portal/sections/QuotesSection";
import {
  AgreementsSection,
  DocumentsSection,
  FinancialStatementsSection,
  NotesSection,
} from "@/components/demo/client-portal/sections/OtherSections";

function DemoMainContent() {
  const { state } = useDemoPortal();

  switch (state.section) {
    case "invoices":
      return <InvoicesSection />;
    case "statement":
      return <StatementSection />;
    case "quotes":
      return <QuotesSection />;
    case "credit-notes":
      return <CreditNotesSection />;
    case "agreements":
      return <AgreementsSection />;
    case "financial-statements":
      return <FinancialStatementsSection />;
    case "notes":
      return <NotesSection />;
    case "upload-documents":
      return <DocumentsSection />;
    default:
      return <InvoicesSection />;
  }
}

function ClientPortalDemoInner() {
  const { state } = useDemoPortal();
  const { branding } = state;

  return (
    <div
      className="flex min-h-[100dvh] flex-col bg-background"
      style={
        {
          "--demo-brand": branding.brandColor,
          "--demo-accent": branding.accentColor,
          color: branding.portalText,
        } as React.CSSProperties
      }
    >
      <div className="border-b border-muted/20 bg-surface px-4 py-2 sm:px-6">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-3">
          <p className="text-xs font-medium text-portal-navy/60">
            Demo Portal · Interactive demonstration — no real transactions
          </p>
          <span className="rounded-badge bg-portal-blue/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-portal-blue sm:hidden">
            Demo
          </span>
        </div>
      </div>

      <div className="mx-auto flex min-h-0 w-full max-w-[1600px] flex-1">
        <DemoSidebar />
        <DemoSidebar mobile />

        <div className="flex min-h-0 min-w-0 flex-1 flex-col lg:flex-row">
          <div className="flex min-h-0 min-w-0 flex-1 flex-col">
            <DemoTopBar />
            <main className="min-h-0 flex-1 overflow-y-auto px-4 py-4 sm:px-6 sm:py-6">
              <DemoMainContent />
              <DemoBannerMobile />
            </main>
          </div>
          <div className="hidden shrink-0 p-4 pl-0 xl:block">
            <DemoBannerPanel />
          </div>
        </div>
      </div>

      <CustomisePortalPanel />
      <PaymentModal />
      <DemoViewModals />
      <ResetConfirmModal />
    </div>
  );
}

export function ClientPortalDemo() {
  return (
    <DemoPortalProvider>
      <ClientPortalDemoInner />
    </DemoPortalProvider>
  );
}
