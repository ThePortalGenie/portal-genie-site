import {
  BRAND_PRESETS,
  DEFAULT_BRANDING,
  DEMO_CUSTOMER,
} from "@/lib/demo/client-portal/constants";
import { createInitialState } from "@/lib/demo/client-portal/mock-data";
import type {
  DemoPortalAction,
  DemoPortalState,
  Invoice,
} from "@/lib/demo/client-portal/types";

function deriveInvoiceStatus(invoice: Invoice): Invoice["status"] {
  if (invoice.balance <= 0) {
    return "paid";
  }
  const today = new Date("2026-08-13");
  const due = new Date(invoice.dueDate);
  if (due < today) {
    return "overdue";
  }
  return "unpaid";
}

function withDerivedStatuses(invoices: Invoice[]): Invoice[] {
  return invoices.map((invoice) => ({
    ...invoice,
    status: deriveInvoiceStatus(invoice),
  }));
}

export function createDemoPortalState(): DemoPortalState {
  const initial = createInitialState();
  return {
    section: "invoices",
    invoices: withDerivedStatuses(initial.invoices),
    selectedInvoiceIds: [],
    quotes: initial.quotes,
    creditNotes: initial.creditNotes,
    agreements: initial.agreements,
    financialStatements: initial.financialStatements,
    notes: initial.notes,
    documents: initial.documents,
    payments: initial.payments,
    branding: { ...DEFAULT_BRANDING },
    companyName: DEMO_CUSTOMER.company,
    customerName: DEMO_CUSTOMER.contact,
    logoUrl: null,
    activeBanner: "portal-genie",
    paymentModalOpen: false,
    paymentStep: "form",
    uploadModalOpen: false,
    customiseOpen: false,
    sidebarOpen: false,
    resetConfirmOpen: false,
    viewInvoiceId: null,
    viewQuoteId: null,
    viewCreditNoteId: null,
    viewAgreementId: null,
    viewFinancialDoc: null,
    viewDocumentId: null,
    invoiceSearch: "",
    invoiceStatusFilter: "all",
    invoiceSort: { field: "date", direction: "desc" },
    uploadFolder: "bank-statements",
    uploadProgress: null,
    uploadFeedback: null,
    logoError: null,
    downloadFeedback: null,
    selectedDocumentFolder: null,
    statementDateFrom: "2026-07-01",
    statementDateTo: "2026-08-13",
  };
}

export function demoPortalReducer(
  state: DemoPortalState,
  action: DemoPortalAction,
): DemoPortalState {
  switch (action.type) {
    case "SET_SECTION":
      return {
        ...state,
        section: action.section,
        sidebarOpen: false,
        downloadFeedback: null,
        uploadFeedback: null,
        viewInvoiceId: null,
        viewQuoteId: null,
        viewCreditNoteId: null,
        viewAgreementId: null,
        viewFinancialDoc: null,
        viewDocumentId: null,
      };

    case "SET_UPLOAD_MODAL":
      return { ...state, uploadModalOpen: action.open };

    case "SET_STATEMENT_DATE_FROM":
      return { ...state, statementDateFrom: action.date };

    case "SET_STATEMENT_DATE_TO":
      return { ...state, statementDateTo: action.date };

    case "TOGGLE_SIDEBAR":
      return { ...state, sidebarOpen: action.open ?? !state.sidebarOpen };

    case "SET_CUSTOMISE_OPEN":
      return { ...state, customiseOpen: action.open };

    case "SET_RESET_CONFIRM":
      return { ...state, resetConfirmOpen: action.open };

    case "RESET_DEMO": {
      if (state.logoUrl?.startsWith("blob:")) {
        URL.revokeObjectURL(state.logoUrl);
      }
      return createDemoPortalState();
    }

    case "SET_BRANDING":
      return {
        ...state,
        branding: { ...state.branding, ...action.branding },
      };

    case "APPLY_PRESET":
      return {
        ...state,
        branding: { ...BRAND_PRESETS[action.presetId].branding },
      };

    case "SET_COMPANY_NAME":
      return { ...state, companyName: action.name };

    case "SET_CUSTOMER_NAME":
      return { ...state, customerName: action.name };

    case "SET_LOGO":
      return { ...state, logoUrl: action.logoUrl, logoError: null };

    case "SET_LOGO_ERROR":
      return { ...state, logoError: action.error };

    case "SET_BANNER":
      return { ...state, activeBanner: action.banner };

    case "SET_INVOICE_SEARCH":
      return { ...state, invoiceSearch: action.search };

    case "SET_INVOICE_STATUS_FILTER":
      return { ...state, invoiceStatusFilter: action.filter };

    case "SET_INVOICE_SORT": {
      const sameField = state.invoiceSort.field === action.field;
      return {
        ...state,
        invoiceSort: {
          field: action.field,
          direction:
            sameField && state.invoiceSort.direction === "asc" ? "desc" : "asc",
        },
      };
    }

    case "TOGGLE_INVOICE_SELECTION": {
      const invoice = state.invoices.find((item) => item.id === action.invoiceId);
      if (!invoice || invoice.status === "paid") {
        return state;
      }
      const selected = state.selectedInvoiceIds.includes(action.invoiceId)
        ? state.selectedInvoiceIds.filter((id) => id !== action.invoiceId)
        : [...state.selectedInvoiceIds, action.invoiceId];
      return { ...state, selectedInvoiceIds: selected };
    }

    case "SELECT_ALL_UNPAID_INVOICES":
      return { ...state, selectedInvoiceIds: action.invoiceIds };

    case "CLEAR_INVOICE_SELECTION":
      return { ...state, selectedInvoiceIds: [] };

    case "OPEN_PAYMENT_MODAL":
      return {
        ...state,
        paymentModalOpen: true,
        paymentStep: "form",
      };

    case "CLOSE_PAYMENT_MODAL":
      return {
        ...state,
        paymentModalOpen: false,
        paymentStep: "form",
      };

    case "START_PAYMENT":
      return { ...state, paymentStep: "processing" };

    case "COMPLETE_PAYMENT": {
      const paidIds = state.selectedInvoiceIds;
      const paidTotal = state.invoices
        .filter((inv) => paidIds.includes(inv.id))
        .reduce((sum, inv) => sum + inv.balance, 0);

      const updatedInvoices = withDerivedStatuses(
        state.invoices.map((invoice) => {
          if (!paidIds.includes(invoice.id)) {
            return invoice;
          }
          return {
            ...invoice,
            balance: 0,
            amountPaid: invoice.amount,
            status: "paid" as const,
          };
        }),
      );

      const payment = {
        id: `pay-${Date.now()}`,
        date: new Date().toISOString().slice(0, 10),
        reference: `PAY-${String(state.payments.length + 1).padStart(4, "0")}`,
        amount: paidTotal,
        invoiceIds: paidIds,
      };

      return {
        ...state,
        invoices: updatedInvoices,
        payments: [...state.payments, payment],
        selectedInvoiceIds: [],
        paymentStep: "success",
        section: "invoices",
      };
    }

    case "VIEW_INVOICE":
      return { ...state, viewInvoiceId: action.invoiceId };

    case "VIEW_QUOTE":
      return { ...state, viewQuoteId: action.quoteId };

    case "VIEW_CREDIT_NOTE":
      return { ...state, viewCreditNoteId: action.creditNoteId };

    case "VIEW_AGREEMENT":
      return { ...state, viewAgreementId: action.agreementId };

    case "VIEW_FINANCIAL_DOC":
      return { ...state, viewFinancialDoc: action.payload };

    case "VIEW_DOCUMENT":
      return { ...state, viewDocumentId: action.documentId };

    case "SET_UPLOAD_FOLDER":
      return { ...state, uploadFolder: action.folderId };

    case "SET_UPLOAD_PROGRESS":
      return { ...state, uploadProgress: action.progress };

    case "SET_UPLOAD_FEEDBACK":
      return { ...state, uploadFeedback: action.message };

    case "ADD_UPLOADED_DOCUMENT":
      return {
        ...state,
        documents: [...state.documents, action.document],
        uploadProgress: null,
        uploadFeedback: `"${action.document.name}" added to ${action.document.folderId.replace(/-/g, " ")}.`,
      };

    case "SET_DOCUMENT_FOLDER":
      return { ...state, selectedDocumentFolder: action.folderId };

    case "SET_DOWNLOAD_FEEDBACK":
      return { ...state, downloadFeedback: action.message };

    default:
      return state;
  }
}

export function getOutstandingBalance(invoices: Invoice[]): number {
  return invoices.reduce((sum, invoice) => sum + invoice.balance, 0);
}

export function getSelectedPaymentTotal(
  invoices: Invoice[],
  selectedIds: string[],
): number {
  return invoices
    .filter((invoice) => selectedIds.includes(invoice.id))
    .reduce((sum, invoice) => sum + invoice.balance, 0);
}

export function getPayableInvoices(invoices: Invoice[]): Invoice[] {
  return invoices.filter((invoice) => invoice.balance > 0);
}
