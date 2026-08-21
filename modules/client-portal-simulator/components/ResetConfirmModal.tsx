"use client";

import { useDemoPortal } from "@/lib/demo/client-portal/context";
import { DemoModal } from "@/components/demo/client-portal/DemoModal";
import { PortalActionButton } from "@/components/demo/client-portal/PortalPrimitives";

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
            className="border border-[#d9d9d9] px-4 py-2 text-[12px]"
          >
            Cancel
          </button>
          <PortalActionButton
            branding={state.branding}
            variant="primary"
            onClick={() => {
              dispatch({ type: "RESET_DEMO" });
              dispatch({ type: "SET_RESET_CONFIRM", open: false });
            }}
          >
            Reset Demo
          </PortalActionButton>
        </div>
      }
    >
      <p className="text-[12px] leading-relaxed text-[#112136]">
        This will restore the original invoices, balances, branding, logo, banner, and
        portal state.
      </p>
    </DemoModal>
  );
}
