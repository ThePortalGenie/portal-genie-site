"use client";

import { DemoPortalProvider, useDemoPortal } from "@/lib/demo/client-portal/context";
import { DemoSidebar } from "@/components/demo/client-portal/DemoSidebar";
import { DemoTopBar } from "@/components/demo/client-portal/DemoTopBar";
import {
  DemoPortalAdvertisingMobile,
  DemoPortalAdvertisingPanel,
} from "@/components/demo/client-portal/DemoPortalAdvertisingPanel";
import { DemoFloatingControls } from "@/components/demo/client-portal/DemoFloatingControls";
import { CustomisePortalPanel } from "@/components/demo/client-portal/CustomisePortalPanel";
import { PaymentModal } from "@/components/demo/client-portal/PaymentModal";
import { UploadDocumentsModal } from "@/components/demo/client-portal/UploadDocumentsModal";
import { ResetConfirmModal } from "@/components/demo/client-portal/ResetConfirmModal";
import { isDedicatedPortalSection } from "@/lib/demo/client-portal/folders";
import { InvoicesSection } from "@/components/demo/client-portal/sections/InvoicesSection";
import { StatementSection } from "@/components/demo/client-portal/sections/StatementSection";
import {
  CreditNotesSection,
  QuotesSection,
} from "@/components/demo/client-portal/sections/QuotesSection";
import {
  AgreementsSection,
  CustomPortalFolderSection,
  FinancialStatementsSection,
  NotesSection,
} from "@/components/demo/client-portal/sections/OtherSections";
import {
  AgreementDocumentView,
  CreditNoteDocumentView,
  FinancialDocumentView,
  InvoiceDocumentView,
  QuoteDocumentView,
} from "@/components/demo/client-portal/documents/DocumentViews";

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
  const { state } = useDemoPortal();
  const mobilePreview = state.previewMode === "mobile";

  return (
    <div
      className={
        mobilePreview
          ? "flex h-full min-h-0 flex-col overflow-hidden"
          : "grid min-h-0 flex-1 overflow-hidden lg:grid-cols-[minmax(200px,220px)_minmax(0,1fr)] lg:grid-rows-[auto_minmax(0,1fr)]"
      }
    >
      {!mobilePreview ? <DemoSidebar /> : null}
      <DemoSidebar mobile />

      <div className={mobilePreview ? "min-w-0 shrink-0" : "min-w-0 lg:col-start-2 lg:row-start-1"}>
        <DemoTopBar />
      </div>

      <div
        className={
          mobilePreview
            ? "flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden"
            : "grid min-h-0 min-w-0 overflow-hidden lg:col-start-2 lg:row-start-2 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]"
        }
      >
        <div className="flex min-h-0 min-w-0 flex-col overflow-hidden">
          <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
            <PortalContentArea />
          </div>
          <DemoPortalAdvertisingMobile />
        </div>
        {!mobilePreview ? (
          <div className="hidden min-h-0 min-w-0 overflow-hidden lg:block">
            <DemoPortalAdvertisingPanel />
          </div>
        ) : null}
      </div>
    </div>
  );
}

function ClientPortalDemoInner() {
  const { state } = useDemoPortal();
  const mobilePreview = state.previewMode === "mobile";

  return (
    <div className="flex h-[100dvh] flex-col overflow-hidden bg-white">
      <div className="shrink-0 border-b border-[#ececec] bg-[#fafafa] px-3 py-1">
        <p className="text-center text-[10px] text-[#666]">
          Demo Portal · Interactive demonstration — no real transactions
        </p>
      </div>

      {mobilePreview ? (
        <div className="flex min-h-0 flex-1 items-start justify-center overflow-auto bg-[#e8eaed] p-4">
          <div className="flex h-[844px] w-[390px] shrink-0 flex-col overflow-hidden rounded-[22px] border border-black/10 bg-white shadow-lg">
            <PortalShell />
          </div>
        </div>
      ) : (
        <PortalShell />
      )}

      <DemoFloatingControls />
      <CustomisePortalPanel />
      <PaymentModal />
      <UploadDocumentsModal />
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
