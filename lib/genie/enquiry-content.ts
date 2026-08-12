import type { GenieEnquiryType } from "@/config/genie-enquiry";
import { GENIE_SUPPORT_COMPANY_FALLBACK } from "@/config/genie-enquiry";
import type { ValidatedGenieEnquiry } from "@/lib/genie/validate-enquiry";

export const GENIE_NOTE_TITLES: Record<GenieEnquiryType, string> = {
  sales: "Genie Sales Enquiry",
  callback: "Genie Callback Request",
  support: "Genie Support Request",
};

export const GENIE_NOTIFICATION_SUBJECT_LABELS: Record<GenieEnquiryType, string> = {
  sales: "Sales Enquiry",
  callback: "Callback Request",
  support: "Support Request",
};

export const GENIE_RESOLUTION_LABELS = {
  contact: "Existing Contact",
  lead: "Existing Lead",
  new_lead: "New Lead",
} as const;

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

export function buildGenieEnquiryNotificationSubject(
  enquiry: ValidatedGenieEnquiry,
): string {
  const label = GENIE_NOTIFICATION_SUBJECT_LABELS[enquiry.enquiryType];
  const company = formatEnquiryCompany(enquiry);
  return `Genie ${label} — ${enquiry.firstName} ${enquiry.lastName} — ${company}`;
}

export function buildGenieEnquiryNotificationBody(options: {
  enquiry: ValidatedGenieEnquiry;
  resolution: keyof typeof GENIE_RESOLUTION_LABELS;
  submittedAt: Date;
  crmRecordUrl?: string;
}): string {
  const { enquiry, resolution, submittedAt, crmRecordUrl } = options;
  const lines = [
    `Enquiry type: ${GENIE_NOTIFICATION_SUBJECT_LABELS[enquiry.enquiryType]}`,
    `CRM resolution: ${GENIE_RESOLUTION_LABELS[resolution]}`,
    "",
    `First name: ${enquiry.firstName}`,
    `Last name: ${enquiry.lastName}`,
    `Company: ${formatEnquiryCompany(enquiry)}`,
    `Email: ${enquiry.email}`,
    `Phone: ${enquiry.phone ?? "Not supplied"}`,
    `Accounting software: ${enquiry.accountingSoftware ?? "Not supplied"}`,
    "",
    "Message:",
    enquiry.message ?? "Not supplied",
    "",
    `Submitted at: ${submittedAt.toISOString()}`,
  ];

  if (crmRecordUrl) {
    lines.push("", `Zoho CRM record: ${crmRecordUrl}`);
  }

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
