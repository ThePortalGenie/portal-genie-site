import type { GenieEnquiryType } from "@/config/genie-enquiry";
import { GENIE_SUPPORT_COMPANY_FALLBACK } from "@/config/genie-enquiry";
import type { ValidatedGenieEnquiry } from "@/lib/genie/validate-enquiry";

export const GENIE_NOTE_TITLES: Record<GenieEnquiryType, string> = {
  sales: "Genie Sales Enquiry",
  callback: "Genie Callback Request",
  support: "Genie Support Request",
};

/** Stable Note titles used by Zoho CRM workflow filters (Leads + Contacts modules). */
export const GENIE_WORKFLOW_NOTE_TITLES = Object.values(GENIE_NOTE_TITLES);

export function formatEnquiryCompany(enquiry: ValidatedGenieEnquiry): string {
  if (enquiry.company?.trim()) {
    return enquiry.company.trim();
  }

  if (enquiry.enquiryType === "support") {
    return GENIE_SUPPORT_COMPANY_FALLBACK;
  }

  return "Not supplied";
}

export function buildGenieEnquiryNoteBody(
  enquiry: ValidatedGenieEnquiry,
  submittedAt: Date,
): string {
  const lines = [
    `Enquiry type: ${GENIE_NOTE_TITLES[enquiry.enquiryType]}`,
    `First name: ${enquiry.firstName}`,
    `Last name: ${enquiry.lastName}`,
    `Company: ${formatEnquiryCompany(enquiry)}`,
    `Email: ${enquiry.email}`,
  ];

  if (enquiry.phone) {
    lines.push(`Phone: ${enquiry.phone}`);
  }

  if (enquiry.accountingSoftware) {
    lines.push(`Accounting software: ${enquiry.accountingSoftware}`);
  }

  if (enquiry.message) {
    lines.push("", "Message:", enquiry.message);
  }

  lines.push("", `Submitted at: ${submittedAt.toISOString()}`);

  return lines.join("\n");
}

/** Initial Lead Description for newly created Leads only. */
export function buildInitialLeadDescription(enquiry: ValidatedGenieEnquiry): string {
  const lines = [GENIE_NOTE_TITLES[enquiry.enquiryType]];
  if (enquiry.message) {
    lines.push("", enquiry.message);
  }
  return lines.join("\n");
}
