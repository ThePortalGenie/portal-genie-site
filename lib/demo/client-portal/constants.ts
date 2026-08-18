import type { BrandingTheme, BrandPresetId, CustomDomainSubdomain } from "@/lib/demo/client-portal/types";

/** Aurora Global reference portal — bright cyan shell. */
export const DEFAULT_BRANDING: BrandingTheme = {
  brandColor: "#00CCFF",
  sidebarBg: "#00d8ff",
  menuText: "#FFFFFF",
  menuSelectedText: "#00CCFF",
  menuSelectedBg: "#F5F5F5",
  portalText: "#112136",
  tableBodyText: "#112136",
  tableHeadingBg: "#00CCFF",
  tableHeadingText: "#FFFFFF",
  payNowBg: "#0055FF",
  payNowText: "#FFFFFF",
  amountColor: "#FFFFFF",
  accentColor: "#0055FF",
};

export const BRAND_PRESETS: Record<
  BrandPresetId,
  { label: string; branding: BrandingTheme }
> = {
  "portal-genie": {
    label: "Portal Genie (Aurora)",
    branding: { ...DEFAULT_BRANDING },
  },
  "professional-blue": {
    label: "Professional Blue",
    branding: {
      brandColor: "#1D4ED8",
      sidebarBg: "#1D4ED8",
      menuText: "#FFFFFF",
      menuSelectedText: "#1D4ED8",
      menuSelectedBg: "#F0F4FF",
      portalText: "#0F172A",
      tableBodyText: "#334155",
      tableHeadingBg: "#1D4ED8",
      tableHeadingText: "#FFFFFF",
      payNowBg: "#1E40AF",
      payNowText: "#FFFFFF",
      amountColor: "#FFFFFF",
      accentColor: "#3B82F6",
    },
  },
  "modern-green": {
    label: "Modern Green",
    branding: {
      brandColor: "#059669",
      sidebarBg: "#059669",
      menuText: "#FFFFFF",
      menuSelectedText: "#059669",
      menuSelectedBg: "#ECFDF5",
      portalText: "#064E3B",
      tableBodyText: "#374151",
      tableHeadingBg: "#059669",
      tableHeadingText: "#FFFFFF",
      payNowBg: "#047857",
      payNowText: "#FFFFFF",
      amountColor: "#FFFFFF",
      accentColor: "#34D399",
    },
  },
  "executive-dark": {
    label: "Executive Dark",
    branding: {
      brandColor: "#112136",
      sidebarBg: "#112136",
      menuText: "#FFFFFF",
      menuSelectedText: "#112136",
      menuSelectedBg: "#F3F4F6",
      portalText: "#112136",
      tableBodyText: "#4B5563",
      tableHeadingBg: "#112136",
      tableHeadingText: "#FFFFFF",
      payNowBg: "#C9A227",
      payNowText: "#112136",
      amountColor: "#FFFFFF",
      accentColor: "#C9A227",
    },
  },
};

export const BANNER_OPTIONS = [
  { id: "portal-genie" as const, label: "Portal Genie Promotion" },
  { id: "tax-season" as const, label: "Tax Season Reminder" },
  { id: "refer-client" as const, label: "Refer a Client" },
  { id: "new-service" as const, label: "New Service Announcement" },
];

export const BANNER_ASSETS: Record<
  (typeof BANNER_OPTIONS)[number]["id"],
  { image?: string; alt: string }
> = {
  "portal-genie": {
    image: "/demo/client-portal/banners/demo-banner (21 x 21 cm).png",
    alt: "Portal Genie — Win This TV contest entry (Xerocon Denver)",
  },
  "tax-season": { alt: "Tax season reminder" },
  "refer-client": { alt: "Refer a client promotion" },
  "new-service": { alt: "New service announcement" },
};

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
] as const;

export const DEMO_ACCOUNTANT = {
  name: "Aurora Global",
  address: "18 Innovation Drive, Cape Town, 8001",
  email: "accounts@auroraglobal.demo",
  phone: "+27 21 555 0180",
  vatNumber: "4123456789",
};

export const DEMO_CUSTOMER = {
  company: "Aurora Global",
  contact: "Geoff Ferrier",
  address: "18 Innovation Drive, Cape Town, 8001",
  email: "geoff.ferrier@auroraglobal.demo",
  accountNumber: "AG-10482",
};

export const DEFAULT_LOGO_PATH = "/demo/client-portal/aurora-logo.svg";

/** Demo Aurora Global client portal link — read-only in Customise → Design. */
export const DEMO_CLIENT_PORTAL_LINK =
  "https://clients.theportalgenie.com/api/5f08a5e2c4b91d7a3f6e8901";

/** Demo-only CNAME target for custom domain DNS configuration. */
export const DEMO_CUSTOM_DOMAIN_CNAME_TARGET =
  "5f08a5e2c4b91d7a3f6e8901.clients.theportalgenie.com";

/** Subdomain options documented for Portal Genie custom portal domains. */
export const CUSTOM_DOMAIN_SUBDOMAIN_OPTIONS: ReadonlyArray<{
  value: CustomDomainSubdomain;
  label: string;
}> = [
  { value: "portal", label: "portal" },
  { value: "clients", label: "clients" },
  { value: "my", label: "my" },
];
