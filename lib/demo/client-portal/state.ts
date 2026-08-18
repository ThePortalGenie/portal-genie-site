import {
  DEFAULT_BRANDING,
  DEMO_CUSTOMER,
  DEMO_CUSTOM_DOMAIN_CNAME_TARGET,
} from "@/lib/demo/client-portal/constants";
import {
  applyCoreBrandColours,
  PRESET_THEMES,
  readCoreBrandColours,
} from "@/lib/demo/client-portal/brand-colours";
import {
  createCustomPortalFolder,
  createInitialPortalFolders,
  getLandingFolderId,
  getUploadablePortalFolders,
  getVisiblePortalFolders,
  getFolderNameValidationError,
  normalizePortalFolder,
  normalizePortalFolders,
  reorderPortalFolders,
} from "@/lib/demo/client-portal/folders";
import {
  createInitialNoticeBoards,
  DEFAULT_NOTICE_BOARD_ID,
  revokeNoticeBoardImages,
} from "@/lib/demo/client-portal/notice-boards";
import { revokeBlobUrl } from "@/lib/demo/client-portal/portal-logo";
import { DEFAULT_MOBILE_DESIGN } from "@/lib/demo/client-portal/mobile-design";
import { captureCustomisationSnapshot, cloneCustomisationSnapshot } from "@/lib/demo/client-portal/customisation-snapshot";
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
    alternateLogoUrl: null,
    useAlternatePortalLogo: false,
    previewMode: "desktop",
    mobilePortalView: "home",
    mobileBannerUrl: null,
    mobileDesign: { ...DEFAULT_MOBILE_DESIGN },
    noticeBoards: createInitialNoticeBoards(),
    activeNoticeBoardId: DEFAULT_NOTICE_BOARD_ID,
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
    invoiceSort: { field: "dueDate", direction: "desc" },
    invoiceUserSorted: false,
    uploadFolder: "agreements",
    uploadProgress: null,
    uploadFeedback: null,
    logoError: null,
    downloadFeedback: null,
    selectedDocumentFolder: null,
    statementDateFrom: "2026-07-01",
    statementDateTo: "2026-08-13",
    customiseTab: "design",
    portalFolders: normalizePortalFolders(createInitialPortalFolders()),
    notificationEnabled: true,
    allowAdditionalContactsPortalAccess: true,
    portalPasswordEnabled: false,
    portalPassword: "",
    customDomainSubdomain: "portal",
    customDomainName: "",
    customDomainDnsGenerated: false,
    customDomainDnsRecord: null,
    customDomainVerificationStatus: "idle",
    activeBrandPresetId: "portal-genie",
    savedCustomisation: null,
    publishedCustomisation: null,
  };
}

export function demoPortalReducer(
  state: DemoPortalState,
  action: DemoPortalAction,
): DemoPortalState {
  switch (action.type) {
    case "SET_SECTION": {
      const visibleIds = getVisiblePortalFolders(state.portalFolders).map((f) => f.id);
      const nextSection = visibleIds.includes(action.section)
        ? action.section
        : getLandingFolderId(state.portalFolders);
      return {
        ...state,
        section: nextSection,
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
    }

    case "SET_UPLOAD_MODAL":
      return { ...state, uploadModalOpen: action.open };

    case "SET_STATEMENT_DATE_FROM":
      return { ...state, statementDateFrom: action.date };

    case "SET_STATEMENT_DATE_TO":
      return { ...state, statementDateTo: action.date };

    case "TOGGLE_SIDEBAR":
      return { ...state, sidebarOpen: action.open ?? !state.sidebarOpen };

    case "SET_CUSTOMISE_OPEN":
      return {
        ...state,
        customiseOpen: action.open,
        ...(action.open && state.previewMode === "mobile"
          ? { mobilePortalView: "home" as const }
          : {}),
      };

    case "SET_CUSTOMISE_TAB":
      return { ...state, customiseTab: action.tab };

    case "SET_RESET_CONFIRM":
      return { ...state, resetConfirmOpen: action.open };

    case "RESET_DEMO": {
      revokeBlobUrl(state.logoUrl);
      revokeBlobUrl(state.alternateLogoUrl);
      revokeBlobUrl(state.mobileBannerUrl);
      revokeNoticeBoardImages(state.noticeBoards);
      return createDemoPortalState();
    }

    case "SET_BRANDING":
      return {
        ...state,
        branding: { ...state.branding, ...action.branding },
        activeBrandPresetId: null,
      };

    case "APPLY_PRESET": {
      const theme = PRESET_THEMES[action.presetId];
      return {
        ...state,
        branding: { ...theme.branding },
        mobileDesign: { ...theme.mobileDesign },
        activeBrandPresetId: action.presetId,
      };
    }

    case "APPLY_CORE_BRAND_COLOUR": {
      const cores = readCoreBrandColours(state);
      const updated = { ...cores, [action.key]: action.color };
      const { branding, mobileDesign } = applyCoreBrandColours(updated);
      return {
        ...state,
        branding,
        mobileDesign,
        activeBrandPresetId: null,
      };
    }

    case "SET_COMPANY_NAME":
      return { ...state, companyName: action.name };

    case "SET_CUSTOMER_NAME":
      return { ...state, customerName: action.name };

    case "SET_LOGO": {
      if (state.logoUrl?.startsWith("blob:") && state.logoUrl !== action.logoUrl) {
        revokeBlobUrl(state.logoUrl);
      }
      return { ...state, logoUrl: action.logoUrl, logoError: null };
    }

    case "SET_ALTERNATE_LOGO": {
      if (
        state.alternateLogoUrl?.startsWith("blob:") &&
        state.alternateLogoUrl !== action.alternateLogoUrl
      ) {
        revokeBlobUrl(state.alternateLogoUrl);
      }
      const useAlternatePortalLogo =
        action.alternateLogoUrl !== null ? state.useAlternatePortalLogo : false;
      return {
        ...state,
        alternateLogoUrl: action.alternateLogoUrl,
        useAlternatePortalLogo,
        logoError: null,
      };
    }

    case "SET_USE_ALTERNATE_PORTAL_LOGO":
      return {
        ...state,
        useAlternatePortalLogo: state.alternateLogoUrl ? action.enabled : false,
      };

    case "SET_PREVIEW_MODE":
      return {
        ...state,
        previewMode: action.mode,
        sidebarOpen: false,
        mobilePortalView: action.mode === "mobile" ? "home" : state.mobilePortalView,
      };

    case "SET_MOBILE_PORTAL_VIEW":
      return { ...state, mobilePortalView: action.view };

    case "SET_MOBILE_BANNER": {
      if (
        state.mobileBannerUrl?.startsWith("blob:") &&
        state.mobileBannerUrl !== action.mobileBannerUrl
      ) {
        revokeBlobUrl(state.mobileBannerUrl);
      }
      return { ...state, mobileBannerUrl: action.mobileBannerUrl };
    }

    case "SET_MOBILE_DESIGN":
      return {
        ...state,
        mobileDesign: { ...state.mobileDesign, ...action.mobileDesign },
        activeBrandPresetId: null,
      };

    case "SET_LOGO_ERROR":
      return { ...state, logoError: action.error };

    case "SET_ACTIVE_NOTICE_BOARD":
      return state.noticeBoards.some((board) => board.id === action.noticeBoardId)
        ? { ...state, activeNoticeBoardId: action.noticeBoardId }
        : state;

    case "ADD_NOTICE_BOARD":
      return {
        ...state,
        noticeBoards: [...state.noticeBoards, action.board],
      };

    case "UPDATE_NOTICE_BOARD": {
      const existing = state.noticeBoards.find((board) => board.id === action.noticeBoardId);
      if (!existing) {
        return state;
      }

      const nextImageUrl =
        action.patch.imageUrl !== undefined ? action.patch.imageUrl : existing.imageUrl;
      if (
        existing.imageUrl?.startsWith("blob:") &&
        nextImageUrl !== existing.imageUrl
      ) {
        revokeBlobUrl(existing.imageUrl);
      }

      return {
        ...state,
        noticeBoards: state.noticeBoards.map((board) =>
          board.id === action.noticeBoardId ? { ...board, ...action.patch } : board,
        ),
      };
    }

    case "DELETE_NOTICE_BOARD": {
      const board = state.noticeBoards.find((item) => item.id === action.noticeBoardId);
      if (!board?.removable) {
        return state;
      }

      if (board.imageUrl?.startsWith("blob:")) {
        revokeBlobUrl(board.imageUrl);
      }

      const noticeBoards = state.noticeBoards.filter((item) => item.id !== action.noticeBoardId);
      const activeNoticeBoardId =
        state.activeNoticeBoardId === action.noticeBoardId
          ? DEFAULT_NOTICE_BOARD_ID
          : state.activeNoticeBoardId;

      return { ...state, noticeBoards, activeNoticeBoardId };
    }

    case "SET_INVOICE_SEARCH":
      return { ...state, invoiceSearch: action.search };

    case "SET_INVOICE_STATUS_FILTER":
      return { ...state, invoiceStatusFilter: action.filter };

    case "SET_INVOICE_SORT": {
      const sameField = state.invoiceSort.field === action.field;
      return {
        ...state,
        invoiceUserSorted: true,
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

    case "SET_UPLOAD_FOLDER": {
      const uploadable = getUploadablePortalFolders(state.portalFolders);
      const folderId = uploadable.some((folder) => folder.id === action.folderId)
        ? action.folderId
        : (uploadable[0]?.id ?? state.uploadFolder);
      return { ...state, uploadFolder: folderId };
    }

    case "SET_UPLOAD_PROGRESS":
      return { ...state, uploadProgress: action.progress };

    case "SET_UPLOAD_FEEDBACK":
      return { ...state, uploadFeedback: action.message };

    case "ADD_UPLOADED_DOCUMENT": {
      const portalFolder = state.portalFolders.find(
        (folder) => folder.id === action.document.folderId,
      );
      const folderLabel =
        portalFolder?.name ?? action.document.folderId.replace(/-/g, " ");
      const notificationSuffix = state.notificationEnabled
        ? " Customer notification would be sent in the live portal."
        : "";
      return {
        ...state,
        documents: [...state.documents, action.document],
        uploadProgress: null,
        uploadFeedback: `"${action.document.name}" added to ${folderLabel}.${notificationSuffix}`,
      };
    }

    case "SET_DOCUMENT_FOLDER":
      return { ...state, selectedDocumentFolder: action.folderId };

    case "SET_DOWNLOAD_FEEDBACK":
      return { ...state, downloadFeedback: action.message };

    case "UPDATE_PORTAL_FOLDER": {
      const patch = { ...action.patch };

      if (patch.name !== undefined) {
        const targetFolder = state.portalFolders.find((folder) => folder.id === action.folderId);
        if (!targetFolder || targetFolder.type === "system") {
          delete patch.name;
        } else {
          const validationError = getFolderNameValidationError(
            state.portalFolders,
            patch.name,
            action.folderId,
          );
          if (validationError) {
            return state;
          }
          patch.name = patch.name.trim();
        }
      }

      const portalFolders = normalizePortalFolders(
        state.portalFolders.map((folder) => {
          if (folder.id !== action.folderId) {
            return folder;
          }
          const folderPatch = { ...patch };
          if (folder.type === "system") {
            delete folderPatch.allowUpload;
            delete folderPatch.name;
          }
          return { ...folder, ...folderPatch };
        }),
      );
      const uploadable = getUploadablePortalFolders(portalFolders);
      const uploadFolder = uploadable.some((folder) => folder.id === state.uploadFolder)
        ? state.uploadFolder
        : (uploadable[0]?.id ?? state.uploadFolder);
      const visibleIds = getVisiblePortalFolders(portalFolders).map((item) => item.id);
      const section = visibleIds.includes(state.section)
        ? state.section
        : getLandingFolderId(portalFolders);
      return { ...state, portalFolders, section, uploadFolder };
    }

    case "SET_LANDING_FOLDER":
      return {
        ...state,
        portalFolders: state.portalFolders.map((folder) => ({
          ...folder,
          isLandingFolder: folder.id === action.folderId,
        })),
      };

    case "REORDER_PORTAL_FOLDERS":
      return {
        ...state,
        portalFolders: reorderPortalFolders(
          state.portalFolders,
          action.activeId,
          action.overId,
          action.insertAfter,
        ),
      };

    case "ADD_CUSTOM_PORTAL_FOLDER": {
      const validationError = getFolderNameValidationError(state.portalFolders, action.name);
      if (validationError) {
        return state;
      }

      const newFolder = normalizePortalFolder(
        createCustomPortalFolder(action.name, {
          visible: action.visible,
          allowUpload: action.allowUpload,
          isLandingFolder: action.isLandingFolder,
        }),
      );

      let portalFolders = [...state.portalFolders, newFolder];

      if (action.isLandingFolder) {
        portalFolders = portalFolders.map((folder) => ({
          ...folder,
          isLandingFolder: folder.id === newFolder.id,
        }));
      }

      const uploadable = getUploadablePortalFolders(portalFolders);
      const uploadFolder = uploadable.some((folder) => folder.id === state.uploadFolder)
        ? state.uploadFolder
        : (uploadable[0]?.id ?? state.uploadFolder);

      return {
        ...state,
        portalFolders: normalizePortalFolders(portalFolders),
        uploadFolder,
      };
    }

    case "REMOVE_PORTAL_FOLDER": {
      const folder = state.portalFolders.find((item) => item.id === action.folderId);
      if (!folder?.removable) {
        return state;
      }
      const portalFolders = state.portalFolders.filter((item) => item.id !== action.folderId);
      const landingId = getLandingFolderId(portalFolders);
      const visibleIds = getVisiblePortalFolders(portalFolders).map((item) => item.id);
      const uploadable = getUploadablePortalFolders(portalFolders);
      const uploadFolder =
        state.uploadFolder === action.folderId
          ? (uploadable[0]?.id ?? state.uploadFolder)
          : uploadable.some((item) => item.id === state.uploadFolder)
            ? state.uploadFolder
            : (uploadable[0]?.id ?? state.uploadFolder);
      const section =
        state.section === action.folderId
          ? landingId
          : visibleIds.includes(state.section)
            ? state.section
            : landingId;
      return { ...state, portalFolders, section, uploadFolder };
    }

    case "SET_NOTIFICATION_ENABLED":
      return { ...state, notificationEnabled: action.enabled };

    case "SET_ALLOW_ADDITIONAL_CONTACTS":
      return { ...state, allowAdditionalContactsPortalAccess: action.enabled };

    case "SET_PORTAL_PASSWORD_ENABLED":
      return { ...state, portalPasswordEnabled: action.enabled };

    case "SET_PORTAL_PASSWORD":
      return { ...state, portalPassword: action.password };

    case "SET_CUSTOM_DOMAIN_SUBDOMAIN":
      return {
        ...state,
        customDomainSubdomain: action.subdomain,
        customDomainDnsGenerated: false,
        customDomainDnsRecord: null,
        customDomainVerificationStatus: "idle",
      };

    case "SET_CUSTOM_DOMAIN_NAME":
      return {
        ...state,
        customDomainName: action.name,
        customDomainDnsGenerated: false,
        customDomainDnsRecord: null,
        customDomainVerificationStatus: "idle",
      };

    case "GENERATE_CUSTOM_DOMAIN_DNS": {
      const domainName = state.customDomainName.trim();
      if (!domainName) {
        return state;
      }
      return {
        ...state,
        customDomainDnsGenerated: true,
        customDomainDnsRecord: {
          type: "CNAME",
          host: state.customDomainSubdomain,
          value: DEMO_CUSTOM_DOMAIN_CNAME_TARGET,
        },
        customDomainVerificationStatus: "idle",
      };
    }

    case "SET_CUSTOM_DOMAIN_VERIFICATION_STATUS":
      return { ...state, customDomainVerificationStatus: action.status };

    case "SAVE_CUSTOMISATION":
      return {
        ...state,
        savedCustomisation: captureCustomisationSnapshot(state),
      };

    case "PUBLISH_CUSTOMISATION":
      if (!state.savedCustomisation) {
        return state;
      }
      return {
        ...state,
        publishedCustomisation: cloneCustomisationSnapshot(state.savedCustomisation),
      };

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
