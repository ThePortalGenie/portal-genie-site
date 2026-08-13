"use client";

import {
  calculateLineItemsTotal,
  calculateVat,
  formatDate,
  formatZar,
} from "@/lib/demo/client-portal/format";
import { DEMO_CUSTOMER, DEFAULT_LOGO_PATH } from "@/lib/demo/client-portal/constants";
import { useDemoPortal } from "@/lib/demo/client-portal/context";
import {
  DocumentToolbar,
} from "@/components/demo/client-portal/PortalPrimitives";
import type { Invoice } from "@/lib/demo/client-portal/types";

export function InvoiceDocumentView({ invoice }: { invoice: Invoice }) {
  const { state, dispatch } = useDemoPortal();
  const subtotal = calculateLineItemsTotal(invoice.lineItems);
  const vat = calculateVat(subtotal);

  const handleDownload = () => {
    const content = [
      "TAX INVOICE",
      invoice.number,
      `Total: ${formatZar(invoice.amount)}`,
      "Demo document",
    ].join("\n");
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${invoice.number}-demo.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const logoSrc = state.logoUrl ?? DEFAULT_LOGO_PATH;

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-y-auto bg-white px-4 pb-4 pt-5 sm:px-5 sm:pb-5 sm:pt-6">
      <DocumentToolbar
        branding={state.branding}
        onClose={() => dispatch({ type: "VIEW_INVOICE", invoiceId: null })}
        onAddToCart={() =>
          dispatch({ type: "TOGGLE_INVOICE_SELECTION", invoiceId: invoice.id })
        }
        onDownload={handleDownload}
        showAddToCart={invoice.balance > 0}
      />

      <div className="mx-auto mt-6 w-full max-w-[680px] bg-white px-2 text-[11px] text-[#112136]">
        <div className="mb-8 flex items-start justify-between gap-4">
          <div>
            <h3 className="text-[16px] font-bold tracking-wide">TAX INVOICE</h3>
            <p className="mt-6 text-[11px] font-semibold">{state.customerName}</p>
            <p className="mt-1 text-[10px] text-[#666]">{DEMO_CUSTOMER.address}</p>
          </div>
          <div className="flex flex-col items-end gap-3">
            <img
              src={logoSrc}
              alt={`${state.companyName} logo`}
              className="h-[60px] w-[60px] object-contain"
            />
            <div className="text-right text-[10px] leading-relaxed">
              <p>Invoice Date: {formatDate(invoice.date)}</p>
              <p>Invoice Number: {invoice.number}</p>
            </div>
          </div>
        </div>

        <table className="mb-6 w-full border-collapse text-[10px]">
          <thead>
            <tr className="border-b border-[#112136]">
              {["Description", "Quantity", "Unit Price", "VAT", "Amount ZAR"].map((h) => (
                <th
                  key={h}
                  className={`px-1 py-1 font-bold ${h === "Amount ZAR" || h === "Unit Price" || h === "VAT" ? "text-right" : "text-left"}`}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {invoice.lineItems.map((item) => (
              <tr key={item.description} className="border-b border-[#e8e8e8]">
                <td className="px-1 py-2">{item.description}</td>
                <td className="px-1 py-2 text-center">{item.quantity}</td>
                <td className="px-1 py-2 text-right tabular-nums">{formatZar(item.unitPrice)}</td>
                <td className="px-1 py-2 text-right tabular-nums">
                  {formatZar(calculateVat(item.unitPrice * item.quantity))}
                </td>
                <td className="px-1 py-2 text-right tabular-nums">
                  {formatZar(
                    item.quantity * item.unitPrice +
                      calculateVat(item.quantity * item.unitPrice),
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="ml-auto max-w-[200px] space-y-1 text-[10px]">
          <div className="flex justify-between gap-6">
            <span>Subtotal</span>
            <span className="tabular-nums">{formatZar(subtotal)}</span>
          </div>
          <div className="flex justify-between gap-6">
            <span>TOTAL VAT</span>
            <span className="tabular-nums">{formatZar(vat)}</span>
          </div>
          <div className="flex justify-between gap-6 font-bold">
            <span>TOTAL ZAR</span>
            <span className="tabular-nums">{formatZar(invoice.amount)}</span>
          </div>
        </div>

        <p className="mt-10 text-[10px]">Due Date: {formatDate(invoice.dueDate)}</p>
      </div>
    </div>
  );
}

export function QuoteDocumentView({ quoteId }: { quoteId: string }) {
  const { state, dispatch } = useDemoPortal();
  const quote = state.quotes.find((q) => q.id === quoteId);
  if (!quote) {
    return null;
  }

  const subtotal = calculateLineItemsTotal(quote.lineItems);
  const vat = calculateVat(subtotal);

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-y-auto bg-white p-3 sm:p-4">
      <DocumentToolbar
        branding={state.branding}
        onClose={() => dispatch({ type: "VIEW_QUOTE", quoteId: null })}
      />
      <div className="mx-auto w-full max-w-[640px] border border-[#ececec] bg-white p-6 text-[12px]">
        <h3 className="text-[18px] font-bold">QUOTE</h3>
        <p className="mt-2">Quote Number: {quote.number}</p>
        <p>Date: {formatDate(quote.date)}</p>
        <p>Expiry: {formatDate(quote.expiryDate)}</p>
        <table className="mt-4 w-full border-collapse text-[11px]">
          <thead>
            <tr style={{ backgroundColor: state.branding.tableHeadingBg, color: state.branding.tableHeadingText }}>
              {["Description", "Qty", "Unit Price", "Amount"].map((h) => (
                <th key={h} className="border border-[#ddd] px-2 py-1 text-left">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {quote.lineItems.map((item) => (
              <tr key={item.description}>
                <td className="border border-[#ddd] px-2 py-1">{item.description}</td>
                <td className="border border-[#ddd] px-2 py-1">{item.quantity}</td>
                <td className="border border-[#ddd] px-2 py-1">{formatZar(item.unitPrice)}</td>
                <td className="border border-[#ddd] px-2 py-1">{formatZar(item.quantity * item.unitPrice)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4 ml-auto max-w-[220px] space-y-1 text-[11px]">
          <div className="flex justify-between"><span>Subtotal</span><span>{formatZar(subtotal)}</span></div>
          <div className="flex justify-between"><span>VAT</span><span>{formatZar(vat)}</span></div>
          <div className="flex justify-between font-bold"><span>Total</span><span>{formatZar(quote.amount)}</span></div>
        </div>
      </div>
    </div>
  );
}

export function CreditNoteDocumentView({ creditNoteId }: { creditNoteId: string }) {
  const { state, dispatch } = useDemoPortal();
  const note = state.creditNotes.find((c) => c.id === creditNoteId);
  if (!note) {
    return null;
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-y-auto bg-white p-3 sm:p-4">
      <DocumentToolbar
        branding={state.branding}
        onClose={() => dispatch({ type: "VIEW_CREDIT_NOTE", creditNoteId: null })}
      />
      <div className="mx-auto w-full max-w-[640px] border border-[#ececec] bg-white p-6 text-[12px]">
        <h3 className="text-[18px] font-bold">CREDIT NOTE</h3>
        <p className="mt-2">{note.number}</p>
        <p>Date: {formatDate(note.date)}</p>
        <p>Reference: {note.reference}</p>
        <p className="mt-4 font-bold">Amount: {formatZar(note.amount)}</p>
      </div>
    </div>
  );
}

export function AgreementDocumentView({ agreementId }: { agreementId: string }) {
  const { state, dispatch } = useDemoPortal();
  const agreement = state.agreements.find((a) => a.id === agreementId);
  if (!agreement) {
    return null;
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-y-auto bg-white p-3 sm:p-4">
      <DocumentToolbar
        branding={state.branding}
        onClose={() => dispatch({ type: "VIEW_AGREEMENT", agreementId: null })}
      />
      <div className="mx-auto w-full max-w-[640px] border border-[#ececec] bg-white p-8 text-[12px] leading-relaxed text-[#112136]">
        <h3 className="text-[20px] font-bold">{agreement.title}</h3>
        <p className="mt-6 whitespace-pre-line">{agreement.body}</p>
      </div>
    </div>
  );
}

export function FinancialDocumentView({
  folderId,
  docId,
}: {
  folderId: string;
  docId: string;
}) {
  const { state, dispatch } = useDemoPortal();
  const doc = state.financialStatements
    .find((f) => f.id === folderId)
    ?.documents.find((d) => d.id === docId);

  if (!doc) {
    return null;
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-y-auto bg-white p-3 sm:p-4">
      <DocumentToolbar
        branding={state.branding}
        onClose={() => dispatch({ type: "VIEW_FINANCIAL_DOC", payload: null })}
      />
      <div className="mx-auto flex w-full max-w-[640px] flex-col items-center border border-[#ececec] bg-white p-10 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center bg-[#eef9ff] text-[#0055FF]">
          PDF
        </div>
        <p className="text-[13px] font-semibold">{doc.name}</p>
        <p className="mt-2 text-[11px] text-[#666]">Demo document preview</p>
      </div>
    </div>
  );
}
