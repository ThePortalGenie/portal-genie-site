import "server-only";

import type { GenieEnquiryType } from "@/config/genie-enquiry";
import { GENIE_SUPPORT_COMPANY_FALLBACK } from "@/config/genie-enquiry";
import {
  ZOHO_CURRENT_CAMPAIGN_PORTAL_GENIE_WEBSITE,
  ZOHO_LEAD_SOURCE_PORTAL_GENIE_CHATBOT,
} from "@/lib/zoho/constants";
import {
  createLead,
  resolveCrmPersonByEmail,
  updateContact,
  updateLead,
  type ZohoContactWritePayload,
  type ZohoLeadWritePayload,
} from "@/lib/zoho/crm-client";
import type { ValidatedGenieEnquiry } from "@/lib/genie/validate-enquiry";

export type GenieEnquiryResolution = "contact" | "lead" | "new_lead";

export type GenieEnquiryProcessResult = {
  resolution: GenieEnquiryResolution;
};

const ENQUIRY_TYPE_LABELS: Record<GenieEnquiryType, string> = {
  sales: "Genie Sales Enquiry",
  callback: "Genie Callback Request",
  support: "Genie Support Enquiry",
};

function buildLeadDescription(enquiry: ValidatedGenieEnquiry): string {
  const lines = [ENQUIRY_TYPE_LABELS[enquiry.enquiryType]];
  if (enquiry.message) {
    lines.push("", enquiry.message);
  }
  return lines.join("\n");
}

function mapLeadFields(enquiry: ValidatedGenieEnquiry): ZohoLeadWritePayload {
  const payload: ZohoLeadWritePayload = {
    First_Name: enquiry.firstName,
    Last_Name: enquiry.lastName,
    Email: enquiry.email,
    Lead_Source: ZOHO_LEAD_SOURCE_PORTAL_GENIE_CHATBOT,
    Current_Campaign: ZOHO_CURRENT_CAMPAIGN_PORTAL_GENIE_WEBSITE,
    Description: buildLeadDescription(enquiry),
  };

  if (enquiry.company) {
    payload.Company = enquiry.company;
  }

  if (enquiry.phone) {
    payload.Phone = enquiry.phone;
  }

  if (enquiry.accountingSoftware) {
    payload.Accounting_Software_Used = enquiry.accountingSoftware;
  }

  return payload;
}

function resolveCompanyForNewLead(enquiry: ValidatedGenieEnquiry): string {
  if (enquiry.company) {
    return enquiry.company;
  }

  if (enquiry.enquiryType === "support") {
    return GENIE_SUPPORT_COMPANY_FALLBACK;
  }

  return enquiry.company ?? GENIE_SUPPORT_COMPANY_FALLBACK;
}

/** Routes a validated Genie enquiry to Zoho CRM using Contact-first resolution. */
export async function processGenieEnquiry(
  enquiry: ValidatedGenieEnquiry,
): Promise<GenieEnquiryProcessResult> {
  const person = await resolveCrmPersonByEmail(enquiry.email);

  if (person.type === "contact") {
    const contactUpdate: ZohoContactWritePayload = {};
    if (enquiry.phone) {
      contactUpdate.Phone = enquiry.phone;
    }

    if (Object.keys(contactUpdate).length > 0) {
      await updateContact(person.id, contactUpdate);
    }

    return { resolution: "contact" };
  }

  const leadFields = mapLeadFields(enquiry);

  if (person.type === "lead") {
    await updateLead(person.id, leadFields);
    return { resolution: "lead" };
  }

  await createLead({
    ...leadFields,
    Company: resolveCompanyForNewLead(enquiry),
  });

  return { resolution: "new_lead" };
}

/**
 * Limitation: Lead Description is set to the latest enquiry summary on update.
 * Existing Description content is not fetched or appended to avoid an extra CRM read.
 */
