import type { BrandingTheme, BrandPresetId } from "@/lib/demo/client-portal/types";

export const DEFAULT_BRANDING: BrandingTheme = {
  brandColor: "#0077BE",
  sidebarBg: "#112136",
  menuText: "rgba(255,255,255,0.72)",
  menuSelectedText: "#ffffff",
  menuSelectedBg: "rgba(0,119,190,0.35)",
  portalText: "#112136",
  tableBodyText: "#334155",
  tableHeadingBg: "#F1F5F9",
  tableHeadingText: "#112136",
  payNowBg: "#0077BE",
  payNowText: "#ffffff",
  amountColor: "#0077BE",
  accentColor: "#00BEB9",
};

export const BRAND_PRESETS: Record<
  BrandPresetId,
  { label: string; branding: BrandingTheme }
> = {
  "portal-genie": {
    label: "Portal Genie",
    branding: { ...DEFAULT_BRANDING },
  },
  "professional-blue": {
    label: "Professional Blue",
    branding: {
      brandColor: "#1D4ED8",
      sidebarBg: "#0F172A",
      menuText: "rgba(255,255,255,0.7)",
      menuSelectedText: "#ffffff",
      menuSelectedBg: "rgba(29,78,216,0.4)",
      portalText: "#0F172A",
      tableBodyText: "#334155",
      tableHeadingBg: "#E2E8F0",
      tableHeadingText: "#0F172A",
      payNowBg: "#1D4ED8",
      payNowText: "#ffffff",
      amountColor: "#1D4ED8",
      accentColor: "#38BDF8",
    },
  },
  "modern-green": {
    label: "Modern Green",
    branding: {
      brandColor: "#059669",
      sidebarBg: "#064E3B",
      menuText: "rgba(255,255,255,0.72)",
      menuSelectedText: "#ffffff",
      menuSelectedBg: "rgba(5,150,105,0.35)",
      portalText: "#064E3B",
      tableBodyText: "#374151",
      tableHeadingBg: "#ECFDF5",
      tableHeadingText: "#064E3B",
      payNowBg: "#059669",
      payNowText: "#ffffff",
      amountColor: "#059669",
      accentColor: "#34D399",
    },
  },
  "executive-dark": {
    label: "Executive Dark",
    branding: {
      brandColor: "#C9A227",
      sidebarBg: "#1A1A2E",
      menuText: "rgba(255,255,255,0.65)",
      menuSelectedText: "#ffffff",
      menuSelectedBg: "rgba(201,162,39,0.25)",
      portalText: "#1A1A2E",
      tableBodyText: "#4B5563",
      tableHeadingBg: "#F3F4F6",
      tableHeadingText: "#1A1A2E",
      payNowBg: "#C9A227",
      payNowText: "#1A1A2E",
      amountColor: "#C9A227",
      accentColor: "#E5C76B",
    },
  },
};

export const BANNER_OPTIONS = [
  { id: "portal-genie" as const, label: "Portal Genie Promotion" },
  { id: "tax-season" as const, label: "Tax Season Reminder" },
  { id: "refer-client" as const, label: "Refer a Client" },
  { id: "new-service" as const, label: "New Service Announcement" },
];

export const DOCUMENT_FOLDERS = [
  { id: "bank-statements" as const, label: "Bank Statements" },
  { id: "tax-documents" as const, label: "Tax Documents" },
  { id: "payroll" as const, label: "Payroll" },
  { id: "financial-statements" as const, label: "Financial Statements" },
  { id: "agreements" as const, label: "Agreements" },
  { id: "supplier-documents" as const, label: "Supplier Documents" },
  { id: "other" as const, label: "Other" },
];

export const NAV_ITEMS = [
  { id: "invoices" as const, label: "Invoices" },
  { id: "statement" as const, label: "Statement" },
  { id: "quotes" as const, label: "Quotes" },
  { id: "credit-notes" as const, label: "Credit Notes" },
  { id: "agreements" as const, label: "Agreements" },
  { id: "financial-statements" as const, label: "Financial Statements" },
  { id: "notes" as const, label: "Notes" },
  { id: "upload-documents" as const, label: "Upload Documents" },
];

export const DEMO_ACCOUNTANT = {
  name: "Summit Accounting Partners",
  address: "42 Commerce Street, Sandton, Johannesburg, 2196",
  email: "accounts@summitaccounting.co.za",
  phone: "+27 11 555 0100",
  vatNumber: "4123456789",
};

export const DEMO_CUSTOMER = {
  company: "Aurora Global",
  contact: "Geoff Ferrier",
  address: "18 Innovation Drive, Cape Town, 8001",
  email: "geoff.ferrier@auroraglobal.demo",
  accountNumber: "AG-10482",
};
