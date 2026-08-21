"use client";

import { useMemo } from "react";
import { Eye } from "lucide-react";
import { isDedicatedPortalSection } from "@/lib/demo/client-portal/folders";
import { useDemoPortal } from "@/lib/demo/client-portal/context";
import { formatDate, formatCurrency } from "@/lib/demo/client-portal/format";
import {
  formatInvoiceStatusLabel,
  sortInvoicesForDisplay,
} from "@/lib/demo/client-portal/invoices";
import { buildStatementEntries, formatAmountPlain } from "@/lib/demo/client-portal/statement";
import {
  AgreementDocumentView,
  CreditNoteDocumentView,
  FinancialDocumentView,
  InvoiceDocumentView,
  QuoteDocumentView,
} from "@/components/demo/client-portal/documents/DocumentViews";

function MobilePageHeading({ title }: { title: string }) {
  return <h2 className="px-3 pb-2 pt-3 text-[15px] font-bold text-[#112136]">{title}</h2>;
}

function MobileInvoicesSection() {
  const { state, dispatch } = useDemoPortal();
  const { invoices, selectedInvoiceIds, invoiceSort, invoiceUserSorted } = state;

  const sorted = useMemo(
    () => sortInvoicesForDisplay([...invoices], invoiceSort, invoiceUserSorted),
    [invoices, invoiceSort, invoiceUserSorted],
  );

  return (
    <div className="px-3 pb-4">
      <MobilePageHeading title="Invoices" />
      <ul className="space-y-2">
        {sorted.map((invoice) => {
          const selected = selectedInvoiceIds.includes(invoice.id);
          const canSelect = invoice.status === "unpaid";
          return (
            <li
              key={invoice.id}
              className="rounded-lg border border-[#ececec] bg-white p-3 text-[12px] text-[#112136]"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <p className="font-semibold">{invoice.number}</p>
                  <p className="mt-1 text-[#666]">Due {formatDate(invoice.dueDate)}</p>
                </div>
                {canSelect ? (
                  <input
                    type="checkbox"
                    checked={selected}
                    onChange={() =>
                      dispatch({ type: "TOGGLE_INVOICE_SELECTION", invoiceId: invoice.id })
                    }
                    aria-label={`Select ${invoice.number}`}
                  />
                ) : null}
              </div>
              <div className="mt-2 grid grid-cols-2 gap-2 text-[11px]">
                <div>
                  <span className="text-[#666]">Amount</span>
                  <p className="font-medium">{formatCurrency(invoice.amount)}</p>
                </div>
                <div>
                  <span className="text-[#666]">Balance</span>
                  <p className="font-medium">{formatCurrency(invoice.balance)}</p>
                </div>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span className="rounded bg-[#f3f4f6] px-2 py-0.5 text-[10px] font-medium uppercase">
                  {formatInvoiceStatusLabel(invoice.status)}
                </span>
                <button
                  type="button"
                  onClick={() => dispatch({ type: "VIEW_INVOICE", invoiceId: invoice.id })}
                  className="inline-flex items-center gap-1 text-[11px] font-medium text-[#0055FF]"
                >
                  <Eye className="h-3.5 w-3.5" />
                  View
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function MobileStatementSection() {
  const { state } = useDemoPortal();
  const { entries, closingBalance, periodTotal, aging } = buildStatementEntries(state);

  return (
    <div className="px-3 pb-4">
      <MobilePageHeading title="Statement" />
      <div className="mb-3 rounded-lg border border-[#ececec] bg-white p-3 text-[11px]">
        <p className="text-[#666]">Period total</p>
        <p className="text-[14px] font-bold">{formatAmountPlain(periodTotal)}</p>
        <p className="mt-2 text-[#666]">Closing balance</p>
        <p className="font-semibold">{formatAmountPlain(closingBalance)}</p>
      </div>
      <ul className="space-y-2">
        {entries.map((entry) => (
          <li
            key={entry.id}
            className="rounded-lg border border-[#ececec] bg-white p-3 text-[11px] text-[#112136]"
          >
            <p className="font-semibold">{entry.description}</p>
            <p className="mt-1 text-[#666]">{formatDate(entry.date)}</p>
            <p className="mt-1 font-medium tabular-nums">{formatAmountPlain(entry.amount)}</p>
          </li>
        ))}
      </ul>
      <div className="mt-3 rounded-lg border border-[#ececec] bg-[#fafafa] p-3 text-[11px]">
        <p className="font-semibold">Account Summary</p>
        <p className="mt-1">Current: {formatAmountPlain(aging.current)}</p>
        <p>Account balance: {formatAmountPlain(aging.accountBalance)}</p>
      </div>
    </div>
  );
}

function MobileSimpleListSection({
  title,
  items,
  onView,
}: {
  title: string;
  items: { id: string; primary: string; secondary?: string }[];
  onView?: (id: string) => void;
}) {
  return (
    <div className="px-3 pb-4">
      <MobilePageHeading title={title} />
      {items.length === 0 ? (
        <p className="text-[12px] text-[#666]">No documents available.</p>
      ) : (
        <ul className="divide-y divide-[#ececec] rounded-lg border border-[#ececec] bg-white">
          {items.map((item) => (
            <li key={item.id}>
              {onView ? (
                <button
                  type="button"
                  onClick={() => onView(item.id)}
                  className="flex w-full flex-col px-3 py-2.5 text-left hover:bg-[#f9fcff]"
                >
                  <span className="text-[12px] font-medium text-[#112136]">{item.primary}</span>
                  {item.secondary ? (
                    <span className="text-[11px] text-[#666]">{item.secondary}</span>
                  ) : null}
                </button>
              ) : (
                <div className="px-3 py-2.5">
                  <span className="text-[12px] font-medium text-[#112136]">{item.primary}</span>
                  {item.secondary ? (
                    <span className="block text-[11px] text-[#666]">{item.secondary}</span>
                  ) : null}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function MobileCustomFolderSection({ folderId }: { folderId: string }) {
  const { state, dispatch } = useDemoPortal();
  const folder = state.portalFolders.find((item) => item.id === folderId);
  const folderName = folder?.name ?? "Custom Folder";
  const documents = state.documents.filter((document) => document.folderId === folderId);

  return (
    <div className="px-3 pb-4">
      <MobilePageHeading title={folderName} />
      {folder?.allowUpload ? (
        <button
          type="button"
          onClick={() => {
            dispatch({ type: "SET_UPLOAD_FOLDER", folderId });
            dispatch({ type: "SET_UPLOAD_MODAL", open: true });
          }}
          className="mb-3 rounded-lg border border-[#d9d9d9] px-3 py-2 text-[12px] font-semibold text-[#112136]"
        >
          Upload Documents
        </button>
      ) : null}
      {documents.length === 0 ? (
        <p className="text-[12px] text-[#666]">No documents available.</p>
      ) : (
        <ul className="divide-y divide-[#ececec] rounded-lg border border-[#ececec] bg-white">
          {documents.map((document) => (
            <li key={document.id} className="px-3 py-2.5 text-[12px] text-[#112136]">
              {document.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function MobilePortalContentRouter() {
  const { state, dispatch } = useDemoPortal();

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
      return <MobileInvoicesSection />;
    case "statement":
      return <MobileStatementSection />;
    case "quotes":
      return (
        <MobileSimpleListSection
          title="Quotes"
          items={state.quotes.map((quote) => ({
            id: quote.id,
            primary: quote.number,
            secondary: formatCurrency(quote.amount),
          }))}
          onView={(id) => dispatch({ type: "VIEW_QUOTE", quoteId: id })}
        />
      );
    case "credit-notes":
      return (
        <MobileSimpleListSection
          title="Credit Notes"
          items={state.creditNotes.map((note) => ({
            id: note.id,
            primary: note.number,
            secondary: formatCurrency(note.amount),
          }))}
          onView={(id) => dispatch({ type: "VIEW_CREDIT_NOTE", creditNoteId: id })}
        />
      );
    case "agreements":
      return (
        <MobileSimpleListSection
          title="Agreements"
          items={state.agreements.map((item) => ({
            id: item.id,
            primary: item.title,
            secondary: item.docType,
          }))}
          onView={(id) => dispatch({ type: "VIEW_AGREEMENT", agreementId: id })}
        />
      );
    case "financial-statements":
      return (
        <MobileSimpleListSection
          title="Financial Statements"
          items={state.financialStatements.flatMap((folder) =>
            folder.documents.map((doc) => ({
              id: `${folder.id}:${doc.id}`,
              primary: doc.name,
              secondary: folder.year,
            })),
          )}
          onView={(id) => {
            const [folderId, docId] = id.split(":");
            dispatch({ type: "VIEW_FINANCIAL_DOC", payload: { folderId, docId } });
          }}
        />
      );
    case "notes":
      return (
        <MobileSimpleListSection
          title="Notes"
          items={state.notes.map((note) => ({
            id: note.id,
            primary: note.name,
            secondary: note.author,
          }))}
        />
      );
    default: {
      if (!isDedicatedPortalSection(state.section)) {
        return <MobileCustomFolderSection folderId={state.section} />;
      }
      return <MobileInvoicesSection />;
    }
  }
}
