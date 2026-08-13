"use client";

import { useEffect } from "react";
import { CheckCircle2, CreditCard, Loader2 } from "lucide-react";
import { useDemoPortal } from "@/lib/demo/client-portal/context";
import { formatZar } from "@/lib/demo/client-portal/format";
import { DemoModal } from "@/components/demo/client-portal/DemoModal";

export function PaymentModal() {
  const { state, dispatch, selectedPaymentTotal } = useDemoPortal();
  const { paymentModalOpen, paymentStep, invoices, selectedInvoiceIds } = state;

  const selectedInvoices = invoices.filter((invoice) =>
    selectedInvoiceIds.includes(invoice.id),
  );

  useEffect(() => {
    if (paymentStep !== "processing") {
      return;
    }

    const timer = window.setTimeout(() => {
      dispatch({ type: "COMPLETE_PAYMENT" });
    }, 1600);

    return () => window.clearTimeout(timer);
  }, [paymentStep, dispatch]);

  const handlePay = () => {
    dispatch({ type: "START_PAYMENT" });
  };

  const footer =
    paymentStep === "form" ? (
      <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={() => dispatch({ type: "CLOSE_PAYMENT_MODAL" })}
          className="rounded-button border border-muted/30 px-4 py-2.5 text-sm font-medium text-portal-navy/80 hover:bg-background"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handlePay}
          className="rounded-button bg-portal-blue px-4 py-2.5 text-sm font-semibold text-white hover:bg-portal-blue/90"
        >
          Pay {formatZar(selectedPaymentTotal)}
        </button>
      </div>
    ) : paymentStep === "success" ? (
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => dispatch({ type: "CLOSE_PAYMENT_MODAL" })}
          className="rounded-button bg-portal-blue px-4 py-2.5 text-sm font-semibold text-white hover:bg-portal-blue/90"
        >
          Done
        </button>
      </div>
    ) : null;

  return (
    <DemoModal
      open={paymentModalOpen}
      onClose={() => {
        if (paymentStep !== "processing") {
          dispatch({ type: "CLOSE_PAYMENT_MODAL" });
        }
      }}
      title="Pay selected invoices"
      size="lg"
      footer={footer}
    >
      {paymentStep === "processing" ? (
        <div className="flex flex-col items-center gap-4 py-10 text-center">
          <Loader2 className="h-10 w-10 animate-spin text-portal-blue" aria-hidden="true" />
          <p className="text-base font-medium text-portal-navy">Processing payment...</p>
          <p className="text-sm text-portal-navy/65">This is a simulated demo transaction.</p>
        </div>
      ) : paymentStep === "success" ? (
        <div className="flex flex-col items-center gap-4 py-8 text-center">
          <CheckCircle2 className="h-14 w-14 text-portal-teal" aria-hidden="true" />
          <h3 className="text-xl font-semibold text-portal-navy">Payment successful</h3>
          <p className="max-w-sm text-sm leading-relaxed text-portal-navy/70">
            {formatZar(selectedPaymentTotal)} has been applied to your selected invoices in
            this demo.
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          <p className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900">
            Demo payment — no real transaction will be processed.
          </p>

          <div>
            <h3 className="text-sm font-semibold text-portal-navy">Selected invoices</h3>
            <ul className="mt-2 divide-y divide-muted/20 rounded-lg border border-muted/20">
              {selectedInvoices.map((invoice) => (
                <li
                  key={invoice.id}
                  className="flex items-center justify-between px-3 py-2.5 text-sm"
                >
                  <span>{invoice.number}</span>
                  <span className="font-medium">{formatZar(invoice.balance)}</span>
                </li>
              ))}
            </ul>
            <div className="mt-3 flex items-center justify-between border-t border-muted/20 pt-3">
              <span className="text-sm font-semibold text-portal-navy">Total</span>
              <span className="text-lg font-semibold text-portal-blue">
                {formatZar(selectedPaymentTotal)}
              </span>
            </div>
          </div>

          <div className="rounded-lg border border-muted/20 bg-background p-4">
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-portal-navy">
              <CreditCard className="h-4 w-4" aria-hidden="true" />
              Credit / Debit Card
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="block sm:col-span-2">
                <span className="mb-1 block text-xs font-medium text-portal-navy/70">
                  Cardholder Name
                </span>
                <input
                  readOnly
                  defaultValue="Demo User"
                  className="w-full rounded-lg border border-muted/30 bg-surface px-3 py-2 text-sm"
                />
              </label>
              <label className="block sm:col-span-2">
                <span className="mb-1 block text-xs font-medium text-portal-navy/70">
                  Card Number
                </span>
                <input
                  readOnly
                  defaultValue="4111 1111 1111 1111"
                  className="w-full rounded-lg border border-muted/30 bg-surface px-3 py-2 text-sm"
                />
              </label>
              <label className="block">
                <span className="mb-1 block text-xs font-medium text-portal-navy/70">
                  Expiry
                </span>
                <input
                  readOnly
                  defaultValue="12/28"
                  className="w-full rounded-lg border border-muted/30 bg-surface px-3 py-2 text-sm"
                />
              </label>
              <label className="block">
                <span className="mb-1 block text-xs font-medium text-portal-navy/70">CVV</span>
                <input
                  readOnly
                  defaultValue="123"
                  className="w-full rounded-lg border border-muted/30 bg-surface px-3 py-2 text-sm"
                />
              </label>
            </div>
          </div>
        </div>
      )}
    </DemoModal>
  );
}
