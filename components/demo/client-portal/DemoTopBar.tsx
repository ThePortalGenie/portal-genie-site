"use client";

import { Menu } from "lucide-react";
import { useDemoPortal } from "@/lib/demo/client-portal/context";
import { formatAmountPlain } from "@/lib/demo/client-portal/statement";

export function DemoTopBar() {
  const { state, dispatch, selectedPaymentTotal, outstandingBalance } = useDemoPortal();
  const { branding, customerName } = state;

  const displayAmount =
    selectedPaymentTotal > 0 ? selectedPaymentTotal : outstandingBalance;
  const amountLabel =
    selectedPaymentTotal > 0
      ? `ZAR ${formatAmountPlain(displayAmount)}`
      : formatAmountPlain(displayAmount);

  const handlePayNow = () => {
    if (selectedPaymentTotal <= 0) {
      return;
    }
    dispatch({ type: "OPEN_PAYMENT_MODAL" });
  };

  return (
    <header
      className="flex shrink-0 items-center justify-between px-4 py-3 lg:px-6"
      style={{ backgroundColor: branding.sidebarBg }}
    >
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => dispatch({ type: "TOGGLE_SIDEBAR", open: true })}
          className="rounded p-1 text-white lg:hidden"
          aria-label="Open navigation menu"
        >
          <Menu className="h-5 w-5" />
        </button>
        <p className="text-[14px] font-bold text-white">Hi {customerName}</p>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-[14px] font-semibold text-white">{amountLabel}</span>
        <button
          type="button"
          onClick={handlePayNow}
          disabled={selectedPaymentTotal <= 0}
          className="px-4 py-1.5 text-[12px] font-semibold disabled:cursor-not-allowed disabled:opacity-50"
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
