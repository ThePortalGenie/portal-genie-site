"use client";

import { Menu } from "lucide-react";
import { useDemoPortal } from "@/lib/demo/client-portal/context";
import { formatCurrency } from "@/lib/demo/client-portal/format";

export function DemoTopBar() {
  const { state, dispatch, selectedPaymentTotal } = useDemoPortal();
  const { branding, customerName, previewMode, selectedInvoiceIds } = state;
  const mobilePreview = previewMode === "mobile";

  const paymentLabel =
    selectedInvoiceIds.length > 0
      ? formatCurrency(selectedPaymentTotal)
      : "Select invoices to pay";

  const handlePayNow = () => {
    if (selectedPaymentTotal <= 0) {
      return;
    }
    dispatch({ type: "OPEN_PAYMENT_MODAL" });
  };

  return (
    <header
      className="flex shrink-0 items-center justify-between px-4 py-2.5 lg:px-5 min-[1700px]:px-6 min-[1700px]:py-3"
      style={{ backgroundColor: branding.sidebarBg }}
    >
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => dispatch({ type: "TOGGLE_SIDEBAR", open: true })}
          className={`rounded p-1 text-white ${mobilePreview ? "" : "lg:hidden"}`}
          aria-label="Open navigation menu"
        >
          <Menu className="h-5 w-5" />
        </button>
        <p className="text-[14px] font-bold text-white">Hi {customerName}</p>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-[14px] font-semibold text-white">{paymentLabel}</span>
        <button
          type="button"
          onClick={handlePayNow}
          disabled={selectedPaymentTotal <= 0}
          className={`px-4 py-1.5 text-[12px] font-semibold disabled:cursor-not-allowed disabled:opacity-50 rounded-[3px]`}
          style={{
            backgroundColor: branding.payNowBg,
            color: branding.payNowText,
          }}
        >
          Pay Now
        </button>
      </div>
    </header>
  );
}
