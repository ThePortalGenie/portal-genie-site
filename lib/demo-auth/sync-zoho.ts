import "server-only";

import { after } from "next/server";
import { isZohoConfigured } from "@/lib/zoho/config";
import {
  ZOHO_CURRENT_CAMPAIGN_PORTAL_GENIE_WEBSITE,
  ZOHO_LEAD_SOURCE_CLIENT_PORTAL_DEMO,
} from "@/lib/zoho/constants";
import {
  ZohoConfigurationError,
  ZohoCrmApiError,
  ZohoOAuthError,
} from "@/lib/zoho/errors";
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
const DEMO_VERIFIED_NOTE_TITLE = "Client Portal Demo — Email Verified";

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

function logDemoZohoFailure(error: unknown): void {
  console.log("[demo-zoho] sync failed");

  if (error instanceof ZohoCrmApiError) {
    console.log(`status: ${error.httpStatus}`);
    console.log(`code: ${error.code}`);
    console.log(`message: ${error.message}`);
    if (error.zohoStatus) {
      console.log(`zohoStatus: ${error.zohoStatus}`);
    }
    return;
  }

  if (error instanceof ZohoOAuthError) {
    console.log(`status: ${error.httpStatus}`);
    console.log(`code: ${error.code}`);
    console.log(`message: ${error.message}`);
    if (error.zohoError) {
      console.log(`zohoError: ${error.zohoError}`);
    }
    return;
  }

  if (error instanceof ZohoConfigurationError) {
    console.log("status: n/a");
    console.log(`code: ${error.code}`);
    console.log(`message: ${error.message}`);
    return;
  }

  console.log("status: n/a");
  console.log("code: unknown");
  console.log("message: Unexpected error during Zoho sync");
}

/**
 * Sync demo gate lead to Zoho CRM using the existing CRM client.
 * Non-blocking for visitors — schedule with scheduleDemoLeadZohoSync().
 */
export async function syncDemoLeadToZoho(lead: DemoLeadPayload): Promise<void> {
  console.log("[demo-zoho] sync started");

  if (!isZohoConfigured()) {
    console.log("[demo-zoho] sync failed");
    console.log("status: n/a");
    console.log("code: zoho_not_configured");
    console.log("message: Zoho CRM environment variables are not configured");
    return;
  }

  try {
    console.log("[demo-zoho] existing lead lookup started");
    const person = await resolveCrmPersonByEmail(lead.email);
    const noteBody = buildNoteBody(lead);

    if (person.type === "contact") {
      console.log("[demo-zoho] existing contact found");
      const contactUpdate: ZohoContactWritePayload = { Phone: lead.phone };
      await updateContact(person.id, contactUpdate);
      await createCrmNote({
        module: "Contacts",
        recordId: person.id,
        title: DEMO_NOTE_TITLE,
        content: noteBody,
      });
      console.log("[demo-zoho] sync successful");
      return;
    }

    if (person.type === "lead") {
      console.log("[demo-zoho] existing lead found");
      console.log("[demo-zoho] updating lead");
      await updateLead(person.id, mapDemoLeadFields(lead));
      await createCrmNote({
        module: "Leads",
        recordId: person.id,
        title: DEMO_NOTE_TITLE,
        content: noteBody,
      });
      console.log("[demo-zoho] sync successful");
      return;
    }

    console.log("[demo-zoho] creating lead");
    const created = await createLead(mapDemoLeadFields(lead));
    await createCrmNote({
      module: "Leads",
      recordId: created.id,
      title: DEMO_NOTE_TITLE,
      content: noteBody,
    });
    console.log("[demo-zoho] sync successful");
  } catch (error) {
    logDemoZohoFailure(error);
  }
}

/**
 * Schedules demo lead Zoho sync to run after the response is sent.
 * Uses Next.js after() so the serverless invocation stays alive on Vercel.
 */
export function scheduleDemoLeadZohoSync(lead: DemoLeadPayload): void {
  after(syncDemoLeadToZoho(lead));
}

export async function syncDemoLeadVerifiedToZoho(lead: DemoLeadPayload): Promise<void> {
  console.log("[demo-zoho] verification sync started");

  if (!isZohoConfigured()) {
    console.log("[demo-zoho] sync failed");
    console.log("status: n/a");
    console.log("code: zoho_not_configured");
    console.log("message: Zoho CRM environment variables are not configured");
    return;
  }

  try {
    console.log("[demo-zoho] existing lead lookup started");
    const person = await resolveCrmPersonByEmail(lead.email);
    const verifiedNote = `${buildNoteBody(lead)}\n\nEmail verification: Verified at ${new Date().toISOString()}`;

    if (person.type === "contact") {
      console.log("[demo-zoho] existing contact found");
      await createCrmNote({
        module: "Contacts",
        recordId: person.id,
        title: DEMO_VERIFIED_NOTE_TITLE,
        content: verifiedNote,
      });
      console.log("[demo-zoho] sync successful");
      return;
    }

    if (person.type === "lead") {
      console.log("[demo-zoho] existing lead found");
      await createCrmNote({
        module: "Leads",
        recordId: person.id,
        title: DEMO_VERIFIED_NOTE_TITLE,
        content: verifiedNote,
      });
      console.log("[demo-zoho] sync successful");
      return;
    }

    console.log("[demo-zoho] sync failed");
    console.log("status: n/a");
    console.log("code: crm_record_not_found");
    console.log(
      "message: No Zoho Lead or Contact found to attach verification note",
    );
  } catch (error) {
    logDemoZohoFailure(error);
  }
}

/** Schedules verified demo lead Zoho note sync after the response is sent. */
export function scheduleDemoLeadVerifiedZohoSync(lead: DemoLeadPayload): void {
  after(syncDemoLeadVerifiedToZoho(lead));
}

/** @deprecated Use scheduleDemoLeadZohoSync() from Route Handlers. */
export function syncDemoLeadToZohoInBackground(lead: DemoLeadPayload): void {
  scheduleDemoLeadZohoSync(lead);
}

/** @deprecated Use scheduleDemoLeadVerifiedZohoSync() from Route Handlers. */
export function syncDemoLeadVerifiedToZohoInBackground(lead: DemoLeadPayload): void {
  scheduleDemoLeadVerifiedZohoSync(lead);
}
