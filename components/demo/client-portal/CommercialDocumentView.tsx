"use client";

import { useDemoPortal } from "@/lib/demo/client-portal/context";
import { DemoModal } from "@/components/demo/client-portal/DemoModal";
import {
  calculateLineItemsTotal,
  calculateVat,
  formatDate,
  formatZar,
} from "@/lib/demo/client-portal/format";
import { DEMO_ACCOUNTANT, DEMO_CUSTOMER } from "@/lib/demo/client-portal/constants";

type CommercialDocumentViewProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  documentNumber: string;
  documentDate: string;
  dueOrExpiryLabel: string;
  dueOrExpiryDate: string;
  statusLabel: string;
  statusTone?: "neutral" | "success" | "warning";
  lineItems: { description: string; quantity: number; unitPrice: number }[];
  total: number;
  amountPaid?: number;
  balance?: number;
  reference?: string;
};

export function CommercialDocumentView({
  open,
  onClose,
  title,
  documentNumber,
  documentDate,
  dueOrExpiryLabel,
  dueOrExpiryDate,
  statusLabel,
  statusTone = "neutral",
  lineItems,
  total,
  amountPaid,
  balance,
  reference,
}: CommercialDocumentViewProps) {
  const { state } = useDemoPortal();
  const subtotal = calculateLineItemsTotal(lineItems);
  const vat = calculateVat(subtotal);
  const computedTotal = subtotal + vat;

  const statusClass =
    statusTone === "success"
      ? "bg-emerald-50 text-emerald-700"
      : statusTone === "warning"
        ? "bg-amber-50 text-amber-800"
        : "bg-slate-100 text-slate-700";

  return (
    <DemoModal open={open} onClose={onClose} title={title} size="xl">
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-portal-navy">{DEMO_ACCOUNTANT.name}</p>
            <p className="mt-1 text-xs leading-relaxed text-portal-navy/65">
              {DEMO_ACCOUNTANT.address}
            </p>
            <p className="text-xs text-portal-navy/65">VAT: {DEMO_ACCOUNTANT.vatNumber}</p>
          </div>
          <span className={`self-start rounded-badge px-3 py-1 text-xs font-semibold ${statusClass}`}>
            {statusLabel}
          </span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-muted/20 bg-background p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-portal-navy/55">
              Bill to
            </p>
            <p className="mt-2 text-sm font-semibold text-portal-navy">{state.companyName}</p>
            <p className="text-sm text-portal-navy/70">{state.customerName}</p>
            <p className="mt-1 text-xs text-portal-navy/65">{DEMO_CUSTOMER.address}</p>
          </div>
          <div className="rounded-lg border border-muted/20 bg-background p-4 text-sm">
            <dl className="space-y-2">
              <div className="flex justify-between gap-4">
                <dt className="text-portal-navy/65">Document</dt>
                <dd className="font-medium text-portal-navy">{documentNumber}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-portal-navy/65">Date</dt>
                <dd>{formatDate(documentDate)}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-portal-navy/65">{dueOrExpiryLabel}</dt>
                <dd>{formatDate(dueOrExpiryDate)}</dd>
              </div>
              {reference ? (
                <div className="flex justify-between gap-4">
                  <dt className="text-portal-navy/65">Reference</dt>
                  <dd>{reference}</dd>
                </div>
              ) : null}
            </dl>
          </div>
        </div>

        <div className="overflow-x-auto rounded-lg border border-muted/20">
          <table className="min-w-full text-sm">
            <thead style={{ backgroundColor: state.branding.tableHeadingBg }}>
              <tr>
                <th
                  className="px-4 py-3 text-left font-semibold"
                  style={{ color: state.branding.tableHeadingText }}
                >
                  Description
                </th>
                <th
                  className="px-4 py-3 text-right font-semibold"
                  style={{ color: state.branding.tableHeadingText }}
                >
                  Qty
                </th>
                <th
                  className="px-4 py-3 text-right font-semibold"
                  style={{ color: state.branding.tableHeadingText }}
                >
                  Unit Price
                </th>
                <th
                  className="px-4 py-3 text-right font-semibold"
                  style={{ color: state.branding.tableHeadingText }}
                >
                  Amount
                </th>
              </tr>
            </thead>
            <tbody style={{ color: state.branding.tableBodyText }}>
              {lineItems.map((item) => (
                <tr key={item.description} className="border-t border-muted/15">
                  <td className="px-4 py-3">{item.description}</td>
                  <td className="px-4 py-3 text-right">{item.quantity}</td>
                  <td className="px-4 py-3 text-right">{formatZar(item.unitPrice)}</td>
                  <td className="px-4 py-3 text-right">
                    {formatZar(item.quantity * item.unitPrice)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="ml-auto max-w-xs space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-portal-navy/65">Subtotal</span>
            <span>{formatZar(subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-portal-navy/65">VAT (15%)</span>
            <span>{formatZar(vat)}</span>
          </div>
          <div className="flex justify-between border-t border-muted/20 pt-2 text-base font-semibold">
            <span>Total</span>
            <span style={{ color: state.branding.amountColor }}>
              {formatZar(total || computedTotal)}
            </span>
          </div>
          {amountPaid !== undefined ? (
            <div className="flex justify-between">
              <span className="text-portal-navy/65">Amount paid</span>
              <span>{formatZar(amountPaid)}</span>
            </div>
          ) : null}
          {balance !== undefined ? (
            <div className="flex justify-between font-semibold">
              <span>Balance</span>
              <span style={{ color: state.branding.amountColor }}>{formatZar(balance)}</span>
            </div>
          ) : null}
        </div>
      </div>
    </DemoModal>
  );
}
