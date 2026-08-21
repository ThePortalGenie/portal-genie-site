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
import type { PortalDemoMode } from "@/lib/demo/client-portal/mode";
import type { DemoPortalAction, DemoPortalState } from "@/lib/demo/client-portal/types";

type DemoPortalContextValue = {
  mode: PortalDemoMode;
  state: DemoPortalState;
  dispatch: (action: DemoPortalAction) => void;
  outstandingBalance: number;
  selectedPaymentTotal: number;
  payableInvoices: ReturnType<typeof getPayableInvoices>;
};

const DemoPortalContext = createContext<DemoPortalContextValue | null>(null);

type DemoPortalProviderProps = {
  children: ReactNode;
  mode?: PortalDemoMode;
};

export function DemoPortalProvider({ children, mode = "public" }: DemoPortalProviderProps) {
  const [state, dispatch] = useReducer(demoPortalReducer, undefined, createDemoPortalState);

  const value = useMemo(() => {
    const payableInvoices = getPayableInvoices(state.invoices);
    return {
      mode,
      state,
      dispatch,
      outstandingBalance: getOutstandingBalance(state.invoices),
      selectedPaymentTotal: getSelectedPaymentTotal(
        state.invoices,
        state.selectedInvoiceIds,
      ),
      payableInvoices,
    };
  }, [mode, state]);

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

export function usePortalDemoMode(): PortalDemoMode {
  return useDemoPortal().mode;
}
