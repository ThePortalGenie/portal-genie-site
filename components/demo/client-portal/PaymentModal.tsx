"use client";

import { useEffect } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useDemoPortal } from "@/lib/demo/client-portal/context";
import { formatAmountPlain } from "@/lib/demo/client-portal/statement";
import { DemoModal } from "@/components/demo/client-portal/DemoModal";
import { PortalActionButton } from "@/components/demo/client-portal/PortalPrimitives";

export function PaymentModal() {
  const { state, dispatch, selectedPaymentTotal } = useDemoPortal();
  const { paymentModalOpen, paymentStep, invoices, selectedInvoiceIds, companyName, customerName, branding } = state;

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

  const amountFormatted = formatAmountPlain(selectedPaymentTotal);

  const footer =
    paymentStep === "form" ? (
      <div className="flex justify-end">
        <PortalActionButton branding={branding} variant="primary" onClick={() => dispatch({ type: "START_PAYMENT" })}>
          Pay Now
        </PortalActionButton>
      </div>
    ) : paymentStep === "success" ? (
      <div className="flex justify-end">
        <PortalActionButton
          branding={branding}
          variant="primary"
          onClick={() => dispatch({ type: "CLOSE_PAYMENT_MODAL" })}
        >
          Done
        </PortalActionButton>
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
      title=""
      size="md"
      footer={footer}
      hideTitle
    >
      {paymentStep === "processing" ? (
        <div className="flex flex-col items-center gap-3 py-8 text-center">
          <Loader2 className="h-8 w-8 animate-spin text-[#0055FF]" aria-hidden="true" />
          <p className="text-[13px] font-medium">Processing payment...</p>
        </div>
      ) : paymentStep === "success" ? (
        <div className="flex flex-col items-center gap-3 py-8 text-center">
          <CheckCircle2 className="h-12 w-12 text-[#15803d]" aria-hidden="true" />
          <p className="text-[16px] font-bold">Payment successful</p>
          <p className="text-[12px] text-[#666]">
            R{amountFormatted} applied to selected invoices in this demo.
          </p>
        </div>
      ) : (
        <div className="text-[12px] text-[#112136]">
          <p className="mb-1">
            <span className="font-semibold">Company Name:</span> {companyName}
          </p>
          <p className="mb-4">
            <span className="font-semibold">Client Portal:</span> {customerName}
          </p>

          <h3 className="mb-2 text-[13px] font-bold">Payment Details</h3>
          <div className="mb-4 divide-y divide-[#ececec] border-y border-[#ececec]">
            <div className="flex justify-between py-2">
              <span>Payment From:</span>
              <span className="font-semibold">{customerName}</span>
            </div>
            <div className="flex justify-between py-2">
              <span>To Recipient:</span>
              <span className="font-semibold">{companyName}</span>
            </div>
            <div className="flex justify-between py-2">
              <span>Amount:</span>
              <span className="font-bold">
                {amountFormatted} ZAR ({amountFormatted} ZAR)
              </span>
            </div>
          </div>

          <p className="mb-3 rounded border border-amber-200 bg-amber-50 px-2 py-1.5 text-[11px] text-amber-900">
            Demo payment — no real transaction will be processed.
          </p>

          <h3 className="mb-2 text-[13px] font-bold">Card Details</h3>
          <div className="mx-auto max-w-[360px] space-y-3">
            {[
              ["Card Number", "4111 1111 1111 1111"],
              ["Expiry Date", "12 / 28"],
              ["Card holder", "Demo User"],
              ["CVV", "123"],
            ].map(([label, value]) => (
              <label key={label} className="block">
                <span className="mb-1 block text-[11px] text-[#666]">{label}</span>
                <input
                  readOnly
                  defaultValue={value}
                  className="h-9 w-full rounded border border-[#d9d9d9] px-3 text-[12px]"
                />
              </label>
            ))}
          </div>

          <ul className="mt-4 space-y-1 text-[11px] text-[#666]">
            {selectedInvoices.map((invoice) => (
              <li key={invoice.id}>
                {invoice.number} — R{formatAmountPlain(invoice.balance)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </DemoModal>
  );
}
