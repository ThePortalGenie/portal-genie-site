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
import { InvoicesSection } from "@/components/demo/client-portal/sections/InvoicesSection";
import { StatementSection } from "@/components/demo/client-portal/sections/StatementSection";
import {
  CreditNotesSection,
  QuotesSection,
} from "@/components/demo/client-portal/sections/QuotesSection";
import {
  AgreementsSection,
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
    default:
      return <InvoicesSection />;
  }
}

function ClientPortalDemoInner() {
  return (
    <div className="flex min-h-[100dvh] flex-col bg-white">
      <div className="shrink-0 border-b border-[#ececec] bg-[#fafafa] px-3 py-1">
        <p className="text-center text-[10px] text-[#666]">
          Demo Portal · Interactive demonstration — no real transactions
        </p>
      </div>

      <div className="grid min-h-[calc(100dvh-28px)] flex-1 lg:grid-cols-[minmax(180px,15%)_1fr] lg:grid-rows-[auto_1fr]">
        <DemoSidebar />
        <DemoSidebar mobile />

        <div className="min-w-0 lg:col-start-2 lg:row-start-1">
          <DemoTopBar />
        </div>

        <div className="grid min-h-0 min-w-0 lg:col-start-2 lg:row-start-2 lg:grid-cols-2">
          <div className="flex min-h-0 min-w-0 flex-col overflow-hidden">
            <PortalContentArea />
            <DemoPortalAdvertisingMobile />
          </div>
          <div className="hidden min-h-0 min-w-0 lg:block">
            <DemoPortalAdvertisingPanel />
          </div>
        </div>
      </div>

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
