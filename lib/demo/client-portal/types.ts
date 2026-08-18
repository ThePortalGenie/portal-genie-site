export type PortalSection =
  | "invoices"
  | "statement"
  | "quotes"
  | "credit-notes"
  | "agreements"
  | "financial-statements"
  | "notes"
  | (string & {});

export type CustomiseTab = "design" | "folder-management" | "settings";

export type PortalFolderType = "system" | "custom";

export type PortalFolderConfig = {
  id: string;
  name: string;
  type: PortalFolderType;
  visible: boolean;
  allowUpload: boolean;
  isLandingFolder: boolean;
  removable: boolean;
};

export type InvoiceStatus = "paid" | "unpaid";

export type LineItem = {
  description: string;
  quantity: number;
  unitPrice: number;
};

export type Invoice = {
  id: string;
  number: string;
  date: string;
  dueDate: string;
  amount: number;
  balance: number;
  status: InvoiceStatus;
  lineItems: LineItem[];
  amountPaid: number;
};

export type QuoteStatus = "draft" | "sent" | "accepted" | "expired" | "open";

export type Quote = {
  id: string;
  number: string;
  date: string;
  expiryDate: string;
  amount: number;
  status: QuoteStatus;
  lineItems: LineItem[];
};

export type CreditNoteStatus = "applied" | "available";

export type CreditNote = {
  id: string;
  number: string;
  date: string;
  reference: string;
  amount: number;
  status: CreditNoteStatus;
  lineItems: LineItem[];
};

export type AgreementStatus = "active" | "expired" | "pending";

export type Agreement = {
  id: string;
  title: string;
  date: string;
  status: AgreementStatus;
  docType: string;
  summary: string;
  body: string;
};

export type FinancialDocument = {
  id: string;
  name: string;
  type: "pdf";
};

export type FinancialStatementFolder = {
  id: string;
  year: string;
  documents: FinancialDocument[];
};

export type PortalNote = {
  id: string;
  date: string;
  name: string;
  author: string;
  role: string;
  content: string;
};

export type DocumentFolderId =
  | "bank-statements"
  | "tax-documents"
  | "payroll"
  | "financial-statements"
  | "agreements"
  | "supplier-documents"
  | "other";

export type DocumentFolder = {
  id: DocumentFolderId;
  label: string;
};

export type DemoDocument = {
  id: string;
  name: string;
  folderId: string;
  size?: number;
  uploadedAt?: string;
  isSessionUpload?: boolean;
};

export type StatementEntry = {
  id: string;
  date: string;
  reference: string;
  description: string;
  docNumber: string;
  transactionDate: string;
  dueDate: string;
  amount: number;
  paid: number;
  credit: number;
  balanceDue: number;
};

export type BannerId =
  | "portal-genie"
  | "tax-season"
  | "refer-client"
  | "new-service";

export type PreviewMode = "desktop" | "mobile";

export type MobilePortalView = "home" | "content" | "notice-board";

export type MobileDesignTheme = {
  tileIconColour: string;
  tileLabelColour: string;
  tileBackgroundColour: string;
  mainBackgroundColour: string;
  footerBackgroundColour: string;
  headerBackgroundColour: string;
  addToCartButtonColour: string;
  footerIconLabelColour: string;
};

export type NoticeBoardKind = "preset-image" | "preset-css" | "custom";

export type NoticeBoard = {
  id: string;
  name: string;
  kind: NoticeBoardKind;
  headline?: string;
  body?: string;
  ctaText?: string;
  imageUrl?: string | null;
  imageAlt?: string;
  destinationUrl?: string;
  gradient?: string;
  removable: boolean;
};

export type BrandingTheme = {
  brandColor: string;
  sidebarBg: string;
  menuText: string;
  menuSelectedText: string;
  menuSelectedBg: string;
  portalText: string;
  tableBodyText: string;
  tableHeadingBg: string;
  tableHeadingText: string;
  payNowBg: string;
  payNowText: string;
  amountColor: string;
  accentColor: string;
};

export type BrandPresetId =
  | "portal-genie"
  | "professional-blue"
  | "modern-green"
  | "executive-dark";

export type CoreBrandColourKey = "primary" | "secondary" | "accent";

export type CustomDomainSubdomain = "portal" | "clients" | "my";

export type DomainVerificationStatus = "idle" | "checking" | "verified";

export type DemoDnsRecord = {
  type: "CNAME";
  host: string;
  value: string;
};

export type PaymentRecord = {
  id: string;
  date: string;
  reference: string;
  amount: number;
  invoiceIds: string[];
};

export type PortalCustomisationSnapshot = {
  branding: BrandingTheme;
  companyName: string;
  logoUrl: string | null;
  alternateLogoUrl: string | null;
  useAlternatePortalLogo: boolean;
  mobileBannerUrl: string | null;
  mobileDesign: MobileDesignTheme;
  noticeBoards: NoticeBoard[];
  activeNoticeBoardId: string;
  portalFolders: PortalFolderConfig[];
  notificationEnabled: boolean;
  allowAdditionalContactsPortalAccess: boolean;
  portalPasswordEnabled: boolean;
  portalPassword: string;
  customDomainSubdomain: CustomDomainSubdomain;
  customDomainName: string;
};

export type DemoPortalState = {
  section: PortalSection;
  invoices: Invoice[];
  selectedInvoiceIds: string[];
  quotes: Quote[];
  creditNotes: CreditNote[];
  agreements: Agreement[];
  financialStatements: FinancialStatementFolder[];
  notes: PortalNote[];
  documents: DemoDocument[];
  payments: PaymentRecord[];
  branding: BrandingTheme;
  companyName: string;
  customerName: string;
  logoUrl: string | null;
  alternateLogoUrl: string | null;
  useAlternatePortalLogo: boolean;
  previewMode: PreviewMode;
  mobilePortalView: MobilePortalView;
  mobileBannerUrl: string | null;
  mobileDesign: MobileDesignTheme;
  noticeBoards: NoticeBoard[];
  activeNoticeBoardId: string;
  paymentModalOpen: boolean;
  paymentStep: "form" | "processing" | "success";
  uploadModalOpen: boolean;
  customiseOpen: boolean;
  sidebarOpen: boolean;
  resetConfirmOpen: boolean;
  viewInvoiceId: string | null;
  viewQuoteId: string | null;
  viewCreditNoteId: string | null;
  viewAgreementId: string | null;
  viewFinancialDoc: { folderId: string; docId: string } | null;
  viewDocumentId: string | null;
  invoiceSearch: string;
  invoiceStatusFilter: "all" | InvoiceStatus;
  invoiceSort: { field: "number" | "date" | "dueDate" | "amount" | "balance"; direction: "asc" | "desc" };
  invoiceUserSorted: boolean;
  uploadFolder: string;
  uploadProgress: number | null;
  uploadFeedback: string | null;
  logoError: string | null;
  downloadFeedback: string | null;
  selectedDocumentFolder: DocumentFolderId | null;
  statementDateFrom: string;
  statementDateTo: string;
  customiseTab: CustomiseTab;
  portalFolders: PortalFolderConfig[];
  notificationEnabled: boolean;
  allowAdditionalContactsPortalAccess: boolean;
  portalPasswordEnabled: boolean;
  portalPassword: string;
  customDomainSubdomain: CustomDomainSubdomain;
  customDomainName: string;
  customDomainDnsGenerated: boolean;
  customDomainDnsRecord: DemoDnsRecord | null;
  customDomainVerificationStatus: DomainVerificationStatus;
  activeBrandPresetId: BrandPresetId | null;
  savedCustomisation: PortalCustomisationSnapshot | null;
  publishedCustomisation: PortalCustomisationSnapshot | null;
};

export type DemoPortalAction =
  | { type: "SET_UPLOAD_MODAL"; open: boolean }
  | { type: "SET_STATEMENT_DATE_FROM"; date: string }
  | { type: "SET_STATEMENT_DATE_TO"; date: string }
  | { type: "SET_SECTION"; section: PortalSection }
  | { type: "TOGGLE_SIDEBAR"; open?: boolean }
  | { type: "SET_CUSTOMISE_OPEN"; open: boolean }
  | { type: "SET_CUSTOMISE_TAB"; tab: CustomiseTab }
  | { type: "SET_RESET_CONFIRM"; open: boolean }
  | { type: "RESET_DEMO" }
  | { type: "SET_BRANDING"; branding: Partial<BrandingTheme> }
  | { type: "APPLY_PRESET"; presetId: BrandPresetId }
  | { type: "APPLY_CORE_BRAND_COLOUR"; key: CoreBrandColourKey; color: string }
  | { type: "SET_COMPANY_NAME"; name: string }
  | { type: "SET_CUSTOMER_NAME"; name: string }
  | { type: "SET_LOGO"; logoUrl: string | null }
  | { type: "SET_ALTERNATE_LOGO"; alternateLogoUrl: string | null }
  | { type: "SET_USE_ALTERNATE_PORTAL_LOGO"; enabled: boolean }
  | { type: "SET_PREVIEW_MODE"; mode: PreviewMode }
  | { type: "SET_MOBILE_PORTAL_VIEW"; view: MobilePortalView }
  | { type: "SET_MOBILE_BANNER"; mobileBannerUrl: string | null }
  | { type: "SET_MOBILE_DESIGN"; mobileDesign: Partial<MobileDesignTheme> }
  | { type: "SET_LOGO_ERROR"; error: string | null }
  | { type: "SET_ACTIVE_NOTICE_BOARD"; noticeBoardId: string }
  | { type: "ADD_NOTICE_BOARD"; board: NoticeBoard }
  | { type: "UPDATE_NOTICE_BOARD"; noticeBoardId: string; patch: Partial<Omit<NoticeBoard, "id" | "removable">> }
  | { type: "DELETE_NOTICE_BOARD"; noticeBoardId: string }
  | { type: "SET_INVOICE_SEARCH"; search: string }
  | { type: "SET_INVOICE_STATUS_FILTER"; filter: DemoPortalState["invoiceStatusFilter"] }
  | { type: "SET_INVOICE_SORT"; field: DemoPortalState["invoiceSort"]["field"] }
  | { type: "TOGGLE_INVOICE_SELECTION"; invoiceId: string }
  | { type: "SELECT_ALL_UNPAID_INVOICES"; invoiceIds: string[] }
  | { type: "CLEAR_INVOICE_SELECTION" }
  | { type: "OPEN_PAYMENT_MODAL" }
  | { type: "CLOSE_PAYMENT_MODAL" }
  | { type: "START_PAYMENT" }
  | { type: "COMPLETE_PAYMENT" }
  | { type: "VIEW_INVOICE"; invoiceId: string | null }
  | { type: "VIEW_QUOTE"; quoteId: string | null }
  | { type: "VIEW_CREDIT_NOTE"; creditNoteId: string | null }
  | { type: "VIEW_AGREEMENT"; agreementId: string | null }
  | { type: "VIEW_FINANCIAL_DOC"; payload: DemoPortalState["viewFinancialDoc"] }
  | { type: "VIEW_DOCUMENT"; documentId: string | null }
  | { type: "SET_UPLOAD_FOLDER"; folderId: string }
  | { type: "SET_UPLOAD_PROGRESS"; progress: number | null }
  | { type: "SET_UPLOAD_FEEDBACK"; message: string | null }
  | { type: "ADD_UPLOADED_DOCUMENT"; document: DemoDocument }
  | { type: "SET_DOCUMENT_FOLDER"; folderId: DocumentFolderId | null }
  | { type: "SET_DOWNLOAD_FEEDBACK"; message: string | null }
  | { type: "UPDATE_PORTAL_FOLDER"; folderId: string; patch: Partial<Pick<PortalFolderConfig, "name" | "visible" | "allowUpload">> }
  | { type: "SET_LANDING_FOLDER"; folderId: string }
  | { type: "REORDER_PORTAL_FOLDERS"; activeId: string; overId: string; insertAfter: boolean }
  | {
      type: "ADD_CUSTOM_PORTAL_FOLDER";
      name: string;
      visible?: boolean;
      allowUpload?: boolean;
      isLandingFolder?: boolean;
    }
  | { type: "REMOVE_PORTAL_FOLDER"; folderId: string }
  | { type: "SET_NOTIFICATION_ENABLED"; enabled: boolean }
  | { type: "SET_ALLOW_ADDITIONAL_CONTACTS"; enabled: boolean }
  | { type: "SET_PORTAL_PASSWORD_ENABLED"; enabled: boolean }
  | { type: "SET_PORTAL_PASSWORD"; password: string }
  | { type: "SET_CUSTOM_DOMAIN_SUBDOMAIN"; subdomain: CustomDomainSubdomain }
  | { type: "SET_CUSTOM_DOMAIN_NAME"; name: string }
  | { type: "GENERATE_CUSTOM_DOMAIN_DNS" }
  | { type: "SET_CUSTOM_DOMAIN_VERIFICATION_STATUS"; status: DomainVerificationStatus }
  | { type: "SAVE_CUSTOMISATION" }
  | { type: "PUBLISH_CUSTOMISATION" };
