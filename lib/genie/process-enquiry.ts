import "server-only";

import {
  buildGenieEnquiryNoteBody,
  buildInitialLeadDescription,
  GENIE_NOTE_TITLES,
} from "@/lib/genie/enquiry-content";
import { GENIE_SUPPORT_COMPANY_FALLBACK } from "@/config/genie-enquiry";
import { GenieEnquiryNotificationError } from "@/lib/genie/enquiry-errors";
import { sendGenieEnquiryNotification } from "@/lib/genie/send-enquiry-notification";
import type { ValidatedGenieEnquiry } from "@/lib/genie/validate-enquiry";
import {
  ZOHO_CURRENT_CAMPAIGN_PORTAL_GENIE_WEBSITE,
  ZOHO_LEAD_SOURCE_PORTAL_GENIE_CHATBOT,
} from "@/lib/zoho/constants";
import {
  createCrmNote,
  createLead,
  resolveCrmPersonByEmail,
  updateContact,
  updateLead,
  type ZohoContactWritePayload,
  type ZohoLeadWritePayload,
} from "@/lib/zoho/crm-client";

export type GenieEnquiryResolution = "contact" | "lead" | "new_lead";

export type GenieEnquiryProcessResult = {
  resolution: GenieEnquiryResolution;
};

type CrmWriteResult = {
  resolution: GenieEnquiryResolution;
  recordModule: "Leads" | "Contacts";
  recordId: string;
};

function mapLeadFieldsForUpdate(enquiry: ValidatedGenieEnquiry): ZohoLeadWritePayload {
  const payload: ZohoLeadWritePayload = {
    First_Name: enquiry.firstName,
    Last_Name: enquiry.lastName,
    Email: enquiry.email,
    Lead_Source: ZOHO_LEAD_SOURCE_PORTAL_GENIE_CHATBOT,
    Current_Campaign: ZOHO_CURRENT_CAMPAIGN_PORTAL_GENIE_WEBSITE,
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

function mapLeadFieldsForCreate(enquiry: ValidatedGenieEnquiry): ZohoLeadWritePayload {
  return {
    ...mapLeadFieldsForUpdate(enquiry),
    Description: buildInitialLeadDescription(enquiry),
  };
}

function resolveCompanyForNewLead(enquiry: ValidatedGenieEnquiry): string {
  if (enquiry.company) {
    return enquiry.company;
  }

  return GENIE_SUPPORT_COMPANY_FALLBACK;
}

async function writeCrmEnquiry(
  enquiry: ValidatedGenieEnquiry,
  submittedAt: Date,
): Promise<CrmWriteResult> {
  const person = await resolveCrmPersonByEmail(enquiry.email);
  const noteTitle = GENIE_NOTE_TITLES[enquiry.enquiryType];
  const noteBody = buildGenieEnquiryNoteBody(enquiry, submittedAt);

  if (person.type === "contact") {
    const contactUpdate: ZohoContactWritePayload = {};
    if (enquiry.phone) {
      contactUpdate.Phone = enquiry.phone;
    }

    if (Object.keys(contactUpdate).length > 0) {
      await updateContact(person.id, contactUpdate);
    }

    await createCrmNote({
      module: "Contacts",
      recordId: person.id,
      title: noteTitle,
      content: noteBody,
    });

    return {
      resolution: "contact",
      recordModule: "Contacts",
      recordId: person.id,
    };
  }

  if (person.type === "lead") {
    await updateLead(person.id, mapLeadFieldsForUpdate(enquiry));

    await createCrmNote({
      module: "Leads",
      recordId: person.id,
      title: noteTitle,
      content: noteBody,
    });

    return {
      resolution: "lead",
      recordModule: "Leads",
      recordId: person.id,
    };
  }

  const created = await createLead({
    ...mapLeadFieldsForCreate(enquiry),
    Company: resolveCompanyForNewLead(enquiry),
  });

  await createCrmNote({
    module: "Leads",
    recordId: created.id,
    title: noteTitle,
    content: noteBody,
  });

  return {
    resolution: "new_lead",
    recordModule: "Leads",
    recordId: created.id,
  };
}

/**
 * Routes a validated Genie enquiry to Zoho CRM, attaches a Note, and notifies the team.
 * CRM writes are not retried if notification fails.
 */
export async function processGenieEnquiry(
  enquiry: ValidatedGenieEnquiry,
): Promise<GenieEnquiryProcessResult> {
  const submittedAt = new Date();
  const crmResult = await writeCrmEnquiry(enquiry, submittedAt);

  try {
    await sendGenieEnquiryNotification({
      enquiry,
      resolution: crmResult.resolution,
      recordModule: crmResult.recordModule,
      recordId: crmResult.recordId,
      submittedAt,
    });
  } catch (error) {
    if (error instanceof GenieEnquiryNotificationError) {
      throw error;
    }

    throw new GenieEnquiryNotificationError(
      "Email notification could not be sent.",
      { code: "notification_failed", httpStatus: 503 },
    );
  }

  return { resolution: crmResult.resolution };
}
