"use client";

import { useDemoPortal } from "@/lib/demo/client-portal/context";
import { CommercialDocumentView } from "@/components/demo/client-portal/CommercialDocumentView";
import { DemoModal } from "@/components/demo/client-portal/DemoModal";
import { formatDate, formatFileSize } from "@/lib/demo/client-portal/format";

export function DemoViewModals() {
  const { state, dispatch } = useDemoPortal();

  const invoice = state.invoices.find((item) => item.id === state.viewInvoiceId);
  const quote = state.quotes.find((item) => item.id === state.viewQuoteId);
  const creditNote = state.creditNotes.find((item) => item.id === state.viewCreditNoteId);
  const agreement = state.agreements.find((item) => item.id === state.viewAgreementId);
  const document = state.documents.find((item) => item.id === state.viewDocumentId);

  const financialDoc = state.viewFinancialDoc
    ? state.financialStatements
        .find((folder) => folder.id === state.viewFinancialDoc?.folderId)
        ?.documents.find((doc) => doc.id === state.viewFinancialDoc?.docId)
    : null;

  return (
    <>
      {invoice ? (
        <CommercialDocumentView
          open
          onClose={() => dispatch({ type: "VIEW_INVOICE", invoiceId: null })}
          title={`Invoice ${invoice.number}`}
          documentNumber={invoice.number}
          documentDate={invoice.date}
          dueOrExpiryLabel="Due date"
          dueOrExpiryDate={invoice.dueDate}
          statusLabel={invoice.status}
          statusTone={invoice.status === "paid" ? "success" : invoice.status === "overdue" ? "warning" : "neutral"}
          lineItems={invoice.lineItems}
          total={invoice.amount}
          amountPaid={invoice.amountPaid}
          balance={invoice.balance}
        />
      ) : null}

      {quote ? (
        <CommercialDocumentView
          open
          onClose={() => dispatch({ type: "VIEW_QUOTE", quoteId: null })}
          title={`Quote ${quote.number}`}
          documentNumber={quote.number}
          documentDate={quote.date}
          dueOrExpiryLabel="Expiry date"
          dueOrExpiryDate={quote.expiryDate}
          statusLabel={quote.status}
          statusTone={quote.status === "accepted" ? "success" : quote.status === "expired" ? "warning" : "neutral"}
          lineItems={quote.lineItems}
          total={quote.amount}
        />
      ) : null}

      {creditNote ? (
        <CommercialDocumentView
          open
          onClose={() => dispatch({ type: "VIEW_CREDIT_NOTE", creditNoteId: null })}
          title={`Credit Note ${creditNote.number}`}
          documentNumber={creditNote.number}
          documentDate={creditNote.date}
          dueOrExpiryLabel="Reference"
          dueOrExpiryDate={creditNote.date}
          statusLabel={creditNote.status}
          statusTone={creditNote.status === "applied" ? "success" : "neutral"}
          lineItems={creditNote.lineItems}
          total={creditNote.amount}
          reference={creditNote.reference}
        />
      ) : null}

      {agreement ? (
        <DemoModal
          open
          onClose={() => dispatch({ type: "VIEW_AGREEMENT", agreementId: null })}
          title={agreement.title}
          size="lg"
        >
          <div className="space-y-4">
            <p className="text-sm text-portal-navy/65">
              {formatDate(agreement.date)} ·{" "}
              <span className="capitalize">{agreement.status}</span>
            </p>
            <p className="text-sm font-medium text-portal-navy">{agreement.summary}</p>
            <div className="rounded-lg border border-muted/20 bg-background p-4 text-sm leading-relaxed whitespace-pre-line text-portal-navy/80">
              {agreement.body}
            </div>
          </div>
        </DemoModal>
      ) : null}

      {financialDoc ? (
        <DemoModal
          open
          onClose={() => dispatch({ type: "VIEW_FINANCIAL_DOC", payload: null })}
          title={financialDoc.name}
          size="lg"
        >
          <div className="rounded-lg border border-muted/20 bg-background p-6 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-card bg-portal-blue/10 text-portal-blue">
              PDF
            </div>
            <p className="text-sm font-medium text-portal-navy">{financialDoc.name}</p>
            <p className="mt-2 text-sm text-portal-navy/65">
              Demo document preview — this is a simulated financial statement shared via
              the client portal.
            </p>
          </div>
        </DemoModal>
      ) : null}

      {document ? (
        <DemoModal
          open
          onClose={() => dispatch({ type: "VIEW_DOCUMENT", documentId: null })}
          title={document.name}
          size="lg"
        >
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-portal-navy/65">Filename</dt>
              <dd className="font-medium text-portal-navy">{document.name}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-portal-navy/65">Folder</dt>
              <dd className="capitalize">{document.folderId.replace(/-/g, " ")}</dd>
            </div>
            {document.uploadedAt ? (
              <div className="flex justify-between gap-4">
                <dt className="text-portal-navy/65">Uploaded</dt>
                <dd>{formatDate(document.uploadedAt)}</dd>
              </div>
            ) : null}
            {document.size ? (
              <div className="flex justify-between gap-4">
                <dt className="text-portal-navy/65">Size</dt>
                <dd>{formatFileSize(document.size)}</dd>
              </div>
            ) : null}
          </dl>
          <p className="mt-5 rounded-lg border border-muted/20 bg-background px-4 py-3 text-sm text-portal-navy/70">
            {document.isSessionUpload
              ? "This file was added during your current demo session and exists only in browser memory."
              : "Demo document preview — file contents are not stored on a server."}
          </p>
        </DemoModal>
      ) : null}
    </>
  );
}

export function ResetConfirmModal() {
  const { state, dispatch } = useDemoPortal();

  return (
    <DemoModal
      open={state.resetConfirmOpen}
      onClose={() => dispatch({ type: "SET_RESET_CONFIRM", open: false })}
      title="Reset demo?"
      footer={
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => dispatch({ type: "SET_RESET_CONFIRM", open: false })}
            className="rounded-button border border-muted/30 px-4 py-2 text-sm font-medium text-portal-navy/80"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              dispatch({ type: "RESET_DEMO" });
              dispatch({ type: "SET_RESET_CONFIRM", open: false });
            }}
            className="rounded-button bg-portal-blue px-4 py-2 text-sm font-semibold text-white"
          >
            Reset Demo
          </button>
        </div>
      }
    >
      <p className="text-sm leading-relaxed text-portal-navy/75">
        This will restore the original invoices, balances, branding, logo, banner, uploaded
        demo documents, and all portal state.
      </p>
    </DemoModal>
  );
}
