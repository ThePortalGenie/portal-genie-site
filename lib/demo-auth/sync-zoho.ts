import "server-only";

import { isZohoConfigured } from "@/lib/zoho/config";
import {
  ZOHO_CURRENT_CAMPAIGN_PORTAL_GENIE_WEBSITE,
  ZOHO_LEAD_SOURCE_CLIENT_PORTAL_DEMO,
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
import type { DemoLeadPayload } from "@/lib/demo-auth/types";

const DEMO_NOTE_TITLE = "Client Portal Demo Lead";

function resolveAccountingSoftware(lead: DemoLeadPayload): string {
  if (lead.accountingSoftware === "Other" && lead.otherAccountingSoftware) {
    return `Other — ${lead.otherAccountingSoftware}`;
  }
  return lead.accountingSoftware;
}

function buildNoteBody(lead: DemoLeadPayload): string {
  const lines = [
    "Client Portal Demo — lead gate submission",
    "",
    `First name: ${lead.firstName}`,
    `Surname: ${lead.surname}`,
    `Company: ${lead.company}`,
    `Phone: ${lead.phone}`,
    `Email: ${lead.email}`,
    `Accounting software: ${resolveAccountingSoftware(lead)}`,
    "",
    "Email verification: Pending (submitted via demo gate)",
  ];
  return lines.join("\n");
}

function mapDemoLeadFields(lead: DemoLeadPayload): ZohoLeadWritePayload {
  return {
    First_Name: lead.firstName,
    Last_Name: lead.surname,
    Email: lead.email,
    Company: lead.company,
    Phone: lead.phone,
    Accounting_Software_Used: resolveAccountingSoftware(lead),
    Lead_Source: ZOHO_LEAD_SOURCE_CLIENT_PORTAL_DEMO,
    Current_Campaign: ZOHO_CURRENT_CAMPAIGN_PORTAL_GENIE_WEBSITE,
    Description: "Client Portal Demo interactive access request.",
  };
}

/**
 * Sync demo gate lead to Zoho CRM using the existing CRM client.
 * Non-blocking — callers should not await this for visitor-facing flows.
 */
export async function syncDemoLeadToZoho(lead: DemoLeadPayload): Promise<void> {
  if (!isZohoConfigured()) {
    return;
  }

  const person = await resolveCrmPersonByEmail(lead.email);
  const noteBody = buildNoteBody(lead);

  if (person.type === "contact") {
    const contactUpdate: ZohoContactWritePayload = { Phone: lead.phone };
    await updateContact(person.id, contactUpdate);
    await createCrmNote({
      module: "Contacts",
      recordId: person.id,
      title: DEMO_NOTE_TITLE,
      content: noteBody,
    });
    return;
  }

  if (person.type === "lead") {
    await updateLead(person.id, mapDemoLeadFields(lead));
    await createCrmNote({
      module: "Leads",
      recordId: person.id,
      title: DEMO_NOTE_TITLE,
      content: noteBody,
    });
    return;
  }

  const created = await createLead(mapDemoLeadFields(lead));
  await createCrmNote({
    module: "Leads",
    recordId: created.id,
    title: DEMO_NOTE_TITLE,
    content: noteBody,
  });
}

export function syncDemoLeadToZohoInBackground(lead: DemoLeadPayload): void {
  void syncDemoLeadToZoho(lead).catch(() => {
    // Zoho sync must not block demo access; errors are intentionally not logged with PII.
  });
}

export async function syncDemoLeadVerifiedToZoho(lead: DemoLeadPayload): Promise<void> {
  if (!isZohoConfigured()) {
    return;
  }

  const person = await resolveCrmPersonByEmail(lead.email);
  const verifiedNote = `${buildNoteBody(lead)}\n\nEmail verification: Verified at ${new Date().toISOString()}`;

  if (person.type === "contact") {
    await createCrmNote({
      module: "Contacts",
      recordId: person.id,
      title: "Client Portal Demo — Email Verified",
      content: verifiedNote,
    });
    return;
  }

  if (person.type === "lead") {
    await createCrmNote({
      module: "Leads",
      recordId: person.id,
      title: "Client Portal Demo — Email Verified",
      content: verifiedNote,
    });
  }
}

export function syncDemoLeadVerifiedToZohoInBackground(lead: DemoLeadPayload): void {
  void syncDemoLeadVerifiedToZoho(lead).catch(() => {
    // Non-blocking CRM note on verification.
  });
}
