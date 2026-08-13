"use client";

import { useDemoPortal } from "@/lib/demo/client-portal/context";
import { formatZar } from "@/lib/demo/client-portal/format";
import { DemoToolbar } from "@/components/demo/client-portal/DemoToolbar";

export function DemoTopBar() {
  const {
    state,
    dispatch,
    selectedPaymentTotal,
    outstandingBalance,
  } = useDemoPortal();
  const { branding, customerName } = state;

  const displayAmount =
    selectedPaymentTotal > 0 ? selectedPaymentTotal : outstandingBalance;
  const hasSelection = selectedPaymentTotal > 0;

  const handlePayNow = () => {
    if (selectedPaymentTotal <= 0) {
      return;
    }
    dispatch({ type: "OPEN_PAYMENT_MODAL" });
  };

  return (
    <header
      className="border-b border-muted/20 bg-surface px-4 py-4 sm:px-6"
      style={{ color: branding.portalText }}
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0">
          <p className="text-sm text-portal-navy/60">Welcome back</p>
          <h1 className="truncate text-xl font-semibold sm:text-2xl">{customerName}</h1>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between lg:justify-end">
          <DemoToolbar />
          <div className="flex items-center justify-between gap-4 rounded-card border border-muted/20 bg-background px-4 py-3 sm:justify-end">
            <div className="text-left sm:text-right">
              <p className="text-xs font-medium uppercase tracking-wide text-portal-navy/55">
                {hasSelection ? "Selected to pay" : "Outstanding balance"}
              </p>
              <p
                className="text-lg font-semibold sm:text-xl"
                style={{ color: branding.amountColor }}
              >
                {formatZar(displayAmount)}
              </p>
            </div>
            <button
              type="button"
              onClick={handlePayNow}
              disabled={selectedPaymentTotal <= 0}
              className="rounded-button px-4 py-2.5 text-sm font-semibold transition-opacity disabled:cursor-not-allowed disabled:opacity-45"
              style={{
                backgroundColor: branding.payNowBg,
                color: branding.payNowText,
              }}
              title={
                selectedPaymentTotal <= 0
                  ? "Select unpaid invoices to pay"
                  : undefined
              }
            >
              Pay Now
            </button>
          </div>
        </div>
      </div>
      {selectedPaymentTotal <= 0 ? (
        <p className="mt-3 text-xs text-portal-navy/55 lg:text-right">
          Select unpaid invoices below to pay online.
        </p>
      ) : null}
    </header>
  );
}
