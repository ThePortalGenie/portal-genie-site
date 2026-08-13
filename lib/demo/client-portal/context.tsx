"use client";

import {
  createContext,
  useContext,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";
import {
  createDemoPortalState,
  demoPortalReducer,
  getOutstandingBalance,
  getPayableInvoices,
  getSelectedPaymentTotal,
} from "@/lib/demo/client-portal/state";
import type { DemoPortalAction, DemoPortalState } from "@/lib/demo/client-portal/types";

type DemoPortalContextValue = {
  state: DemoPortalState;
  dispatch: (action: DemoPortalAction) => void;
  outstandingBalance: number;
  selectedPaymentTotal: number;
  payableInvoices: ReturnType<typeof getPayableInvoices>;
};

const DemoPortalContext = createContext<DemoPortalContextValue | null>(null);

export function DemoPortalProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(demoPortalReducer, undefined, createDemoPortalState);

  const value = useMemo(() => {
    const payableInvoices = getPayableInvoices(state.invoices);
    return {
      state,
      dispatch,
      outstandingBalance: getOutstandingBalance(state.invoices),
      selectedPaymentTotal: getSelectedPaymentTotal(
        state.invoices,
        state.selectedInvoiceIds,
      ),
      payableInvoices,
    };
  }, [state]);

  return (
    <DemoPortalContext.Provider value={value}>{children}</DemoPortalContext.Provider>
  );
}

export function useDemoPortal() {
  const context = useContext(DemoPortalContext);
  if (!context) {
    throw new Error("useDemoPortal must be used within DemoPortalProvider");
  }
  return context;
}
