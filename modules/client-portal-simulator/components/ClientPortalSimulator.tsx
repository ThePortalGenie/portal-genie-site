"use client";

import { DemoPortalProvider, useDemoPortal } from "@/modules/client-portal-simulator/state/context";
import type { PortalDemoMode } from "@/modules/client-portal-simulator/state/mode";
import { DemoSidebar } from "@/modules/client-portal-simulator/components/DemoSidebar";
import { DemoTopBar } from "@/modules/client-portal-simulator/components/DemoTopBar";
import {
  DemoPortalAdvertisingMobile,
  DemoPortalAdvertisingPanel,
} from "@/modules/client-portal-simulator/components/DemoPortalAdvertisingPanel";
import { DemoFloatingControls } from "@/modules/client-portal-simulator/components/DemoFloatingControls";
import { ClientPortalSetupToolbar } from "@/modules/client-portal-simulator/components/ClientPortalSetupToolbar";
import { CustomisePortalPanel } from "@/modules/client-portal-simulator/components/CustomisePortalPanel";
import { PaymentModal } from "@/modules/client-portal-simulator/components/PaymentModal";
import { UploadDocumentsModal } from "@/modules/client-portal-simulator/components/UploadDocumentsModal";
import { ResetConfirmModal } from "@/modules/client-portal-simulator/components/ResetConfirmModal";
import { isDedicatedPortalSection } from "@/modules/client-portal-simulator/utils/folders";
import { MobilePreviewArea } from "@/modules/client-portal-simulator/components/mobile/MobilePreviewDevice";
import { InvoicesSection } from "@/modules/client-portal-simulator/components/sections/InvoicesSection";
import { StatementSection } from "@/modules/client-portal-simulator/components/sections/StatementSection";
import {
  CreditNotesSection,
  QuotesSection,
} from "@/modules/client-portal-simulator/components/sections/QuotesSection";
import {
  AgreementsSection,
  CustomPortalFolderSection,
  FinancialStatementsSection,
  NotesSection,
} from "@/modules/client-portal-simulator/components/sections/OtherSections";
import {
  AgreementDocumentView,
  CreditNoteDocumentView,
  FinancialDocumentView,
  InvoiceDocumentView,
  QuoteDocumentView,
} from "@/modules/client-portal-simulator/components/documents/DocumentViews";

function PortalContentArea() {
  const { state } = useDemoPortal();

  if (state.viewInvoiceId) {
    const invoice = state.invoices.find((item) => item.id === state.viewInvoiceId);
    if (invoice) {
      return <InvoiceDocumentView invoice={invoice} />;
    }
  }

  if (state.viewQuoteId) {
    return <QuoteDocumentView quoteId={state.viewQuoteId} />;
  }

  if (state.viewCreditNoteId) {
    return <CreditNoteDocumentView creditNoteId={state.viewCreditNoteId} />;
  }

  if (state.viewAgreementId) {
    return <AgreementDocumentView agreementId={state.viewAgreementId} />;
  }

  if (state.viewFinancialDoc) {
    return (
      <FinancialDocumentView
        folderId={state.viewFinancialDoc.folderId}
        docId={state.viewFinancialDoc.docId}
      />
    );
  }

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
    default: {
      if (!isDedicatedPortalSection(state.section)) {
        const folder = state.portalFolders.find((item) => item.id === state.section);
        if (folder) {
          return <CustomPortalFolderSection folderId={folder.id} />;
        }
      }
      return <InvoicesSection />;
    }
  }
}

function PortalShell() {
  return (
    <div className="grid h-full min-h-0 overflow-hidden lg:grid-cols-[minmax(200px,220px)_minmax(0,1fr)] lg:grid-rows-[auto_minmax(0,1fr)]">
      <DemoSidebar />
      <DemoSidebar mobile />

      <div className="min-w-0 lg:col-start-2 lg:row-start-1">
        <DemoTopBar />
      </div>

      <div className="grid h-full min-h-0 min-w-0 grid-rows-[minmax(0,1fr)] overflow-hidden lg:col-start-2 lg:row-start-2 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div className="flex h-full min-h-0 min-w-0 flex-col overflow-hidden">
          <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
            <PortalContentArea />
          </div>
          <DemoPortalAdvertisingMobile />
        </div>
        <div className="hidden h-full min-h-0 min-w-0 overflow-hidden lg:block">
          <DemoPortalAdvertisingPanel />
        </div>
      </div>
    </div>
  );
}

function ClientPortalSimulatorInner() {
  const { state, mode } = useDemoPortal();
  const mobilePreview = state.previewMode === "mobile";
  const isInternal = mode === "internal";

  const demoNotice = (
    <div className="shrink-0 border-b border-[#ececec] bg-[#fafafa] px-3 py-1">
      <p className="text-center text-[10px] text-[#666]">
        Demo Portal · Interactive demonstration — no real transactions
      </p>
    </div>
  );

  const previewContent = mobilePreview ? (
    <MobilePreviewArea interactiveCustomise={state.customiseOpen} />
  ) : (
    <PortalShell />
  );

  const modals = (
    <>
      <PaymentModal />
      <UploadDocumentsModal />
      <ResetConfirmModal />
    </>
  );

  const previewPane = (
    <div className="flex h-full min-h-0 flex-1 flex-col overflow-hidden">{previewContent}</div>
  );

  if (isInternal) {
    return (
      <div className="flex h-dvh min-h-0 flex-col overflow-hidden bg-white">
        <ClientPortalSetupToolbar />
        <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden">
          {previewPane}
          <CustomisePortalPanel contained />
        </div>
        {modals}
      </div>
    );
  }

  return (
    <div className="flex h-dvh min-h-0 flex-col overflow-hidden bg-white">
      {demoNotice}
      {previewPane}
      <DemoFloatingControls />
      <CustomisePortalPanel />
      {modals}
    </div>
  );
}

type ClientPortalSimulatorProps = {
  mode?: PortalDemoMode;
};

export function ClientPortalSimulator({ mode = "public" }: ClientPortalSimulatorProps) {
  return (
    <DemoPortalProvider mode={mode}>
      <ClientPortalSimulatorInner />
    </DemoPortalProvider>
  );
}
