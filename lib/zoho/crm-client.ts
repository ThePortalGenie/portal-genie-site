import "server-only";

import { ZOHO_LEAD_SOURCE_PORTAL_GENIE_CHATBOT } from "@/lib/zoho/constants";
import { ZohoCrmApiError } from "@/lib/zoho/errors";
import type { CrmPersonResolution, ZohoRecordRef } from "@/lib/zoho/types";
import { getZohoAccessToken } from "@/lib/zoho/oauth";
import {
  normalizeEmail,
  normalizeRecordId,
  sanitizeContactPayload,
  sanitizeLeadPayload,
} from "@/lib/zoho/validation";

export type ZohoCrmRequestOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  searchParams?: Record<string, string | number | undefined>;
};

function buildCrmUrl(
  apiBaseUrl: string,
  path: string,
  searchParams?: ZohoCrmRequestOptions["searchParams"],
): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const url = new URL(
    `${apiBaseUrl.replace(/\/+$/, "")}/crm/v2${normalizedPath}`,
  );

  if (searchParams) {
    for (const [key, value] of Object.entries(searchParams)) {
      if (value !== undefined && value !== "") {
        url.searchParams.set(key, String(value));
      }
    }
  }

  return url.toString();
}

async function parseCrmJson<T>(response: Response): Promise<T> {
  let payload: unknown;

  try {
    payload = await response.json();
  } catch {
    throw new ZohoCrmApiError("Zoho CRM returned invalid JSON.", {
      code: "zoho_crm_invalid_json",
      httpStatus: 502,
    });
  }

  return payload as T;
}

function extractZohoError(payload: Record<string, unknown>): string | undefined {
  if (typeof payload.message === "string") {
    return payload.message;
  }
  if (typeof payload.status === "string" && payload.status !== "success") {
    return payload.status;
  }
  return undefined;
}

/** Authenticated JSON request to Zoho CRM v2. */
export async function zohoCrmRequest<T = unknown>(
  path: string,
  options: ZohoCrmRequestOptions = {},
): Promise<T> {
  const { accessToken, apiBaseUrl } = await getZohoAccessToken();
  const method = options.method ?? "GET";
  const url = buildCrmUrl(apiBaseUrl, path, options.searchParams);

  let response: Response;

  try {
    response = await fetch(url, {
      method,
      headers: {
        Authorization: `Zoho-oauthtoken ${accessToken}`,
        ...(options.body !== undefined
          ? { "Content-Type": "application/json" }
          : {}),
      },
      body:
        options.body !== undefined ? JSON.stringify(options.body) : undefined,
      cache: "no-store",
    });
  } catch {
    throw new ZohoCrmApiError("Unable to reach Zoho CRM.", {
      code: "zoho_crm_network_error",
      httpStatus: 502,
    });
  }

  const payload = await parseCrmJson<T & Record<string, unknown>>(response);

  if (!response.ok) {
    throw new ZohoCrmApiError(
      extractZohoError(payload as Record<string, unknown>) ??
        "Zoho CRM request failed.",
      {
        code: "zoho_crm_request_failed",
        httpStatus: response.status,
        zohoStatus:
          typeof payload.status === "string" ? payload.status : undefined,
      },
    );
  }

  if (
    typeof payload.status === "string" &&
    payload.status === "error" &&
    typeof payload.code === "string"
  ) {
    throw new ZohoCrmApiError(
      extractZohoError(payload as Record<string, unknown>) ??
        "Zoho CRM returned an error.",
      {
        code: "zoho_crm_error_response",
        httpStatus: 502,
        zohoStatus: payload.status,
      },
    );
  }

  return payload as T;
}

type ZohoSearchResponse = {
  data?: Array<{ id?: string }>;
  code?: string;
  message?: string;
  status?: string;
};

type ZohoWriteResponse = {
  data?: Array<{
    code?: string;
    details?: { id?: string };
    message?: string;
    status?: string;
  }>;
};

function isNoDataSearchResult(payload: ZohoSearchResponse): boolean {
  return payload.code === "NO_DATA" || payload.status === "error";
}

function extractRecordId(payload: ZohoWriteResponse): string {
  const id = payload.data?.[0]?.details?.id;
  if (!id) {
    throw new ZohoCrmApiError("Zoho CRM did not return a record ID.", {
      code: "zoho_crm_missing_record_id",
      httpStatus: 502,
    });
  }
  return id;
}

function assertWritePayloadNotEmpty(
  payload: Partial<Record<string, string>>,
  label: string,
): void {
  if (Object.keys(payload).length === 0) {
    throw new ZohoCrmApiError(`${label} payload must include at least one field.`, {
      code: "zoho_invalid_payload",
      httpStatus: 400,
    });
  }
}

/** Search Leads or Contacts by email — returns ID only, never full record data. */
async function searchRecordByEmail(
  module: "Leads" | "Contacts",
  email: string,
): Promise<ZohoRecordRef | null> {
  const normalizedEmail = normalizeEmail(email);
  const { accessToken, apiBaseUrl } = await getZohoAccessToken();
  const url = buildCrmUrl(apiBaseUrl, `/${module}/search`, {
    email: normalizedEmail,
  });

  let response: Response;

  try {
    response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Zoho-oauthtoken ${accessToken}`,
      },
      cache: "no-store",
    });
  } catch {
    throw new ZohoCrmApiError("Unable to reach Zoho CRM.", {
      code: "zoho_crm_network_error",
      httpStatus: 502,
    });
  }

  if (response.status === 204) {
    return null;
  }

  const payload = await parseCrmJson<ZohoSearchResponse>(response);

  if (!response.ok) {
    if (response.status === 404 || isNoDataSearchResult(payload)) {
      return null;
    }

    throw new ZohoCrmApiError(
      extractZohoError(payload as Record<string, unknown>) ??
        "Zoho CRM search failed.",
      {
        code: "zoho_crm_search_failed",
        httpStatus: response.status,
        zohoStatus: payload.status,
      },
    );
  }

  if (isNoDataSearchResult(payload)) {
    return null;
  }

  const id = payload.data?.[0]?.id;
  return id ? { id } : null;
}

/** Harmless Leads read used to verify OAuth + READ scope (no record data returned). */
export async function verifyLeadsModuleAccess(): Promise<void> {
  await zohoCrmRequest("/Leads", {
    searchParams: {
      per_page: 1,
      page: 1,
      fields: "id",
    },
  });
}

/** Harmless Contacts read used to verify OAuth + READ scope (no record data returned). */
export async function verifyContactsModuleAccess(): Promise<void> {
  await zohoCrmRequest("/Contacts", {
    searchParams: {
      per_page: 1,
      page: 1,
      fields: "id",
    },
  });
}

/** Search Contacts by email. Returns record ID only. */
export async function findContactByEmail(
  email: string,
): Promise<ZohoRecordRef | null> {
  return searchRecordByEmail("Contacts", email);
}

/** Search Leads by email. Returns record ID only. */
export async function findLeadByEmail(email: string): Promise<ZohoRecordRef | null> {
  return searchRecordByEmail("Leads", email);
}

/**
 * Determines whether an email belongs to an existing Contact or Lead.
 * Contacts take precedence — an existing Contact never resolves as a Lead.
 */
export async function resolveCrmPersonByEmail(
  email: string,
): Promise<CrmPersonResolution> {
  const contact = await findContactByEmail(email);
  if (contact) {
    return { type: "contact", id: contact.id };
  }

  const lead = await findLeadByEmail(email);
  if (lead) {
    return { type: "lead", id: lead.id };
  }

  return { type: "none" };
}

export type ZohoLeadWritePayload = Partial<
  Record<
    | "Company"
    | "Last_Name"
    | "First_Name"
    | "Email"
    | "Phone"
    | "Accounting_Software_Used"
    | "Lead_Source"
    | "Current_Campaign"
    | "Description",
    string
  >
>;

export type ZohoContactWritePayload = Partial<
  Record<
    | "First_Name"
    | "Last_Name"
    | "Email"
    | "Phone"
    | "Accounting_Software_Used"
    | "Current_Campaign"
    | "Description",
    string
  >
>;

/** Create a new Lead. Sets Lead_Source to Portal Genie Chatbot. */
export async function createLead(
  payload: ZohoLeadWritePayload,
): Promise<ZohoRecordRef> {
  const sanitized = sanitizeLeadPayload(payload);

  if (!sanitized.Last_Name) {
    throw new ZohoCrmApiError("Last_Name is required to create a Lead.", {
      code: "zoho_invalid_payload",
      httpStatus: 400,
    });
  }

  if (sanitized.Email) {
    sanitized.Email = normalizeEmail(sanitized.Email);
  }

  const record = {
    ...sanitized,
    Lead_Source: ZOHO_LEAD_SOURCE_PORTAL_GENIE_CHATBOT,
  };

  const response = await zohoCrmRequest<ZohoWriteResponse>("/Leads", {
    method: "POST",
    body: { data: [record] },
  });

  return { id: extractRecordId(response) };
}

/** Update an existing Lead by record ID. */
export async function updateLead(
  id: string,
  payload: ZohoLeadWritePayload,
): Promise<ZohoRecordRef> {
  const recordId = normalizeRecordId(id, "Lead ID");
  const sanitized = sanitizeLeadPayload(payload);
  assertWritePayloadNotEmpty(sanitized, "Lead update");

  if (sanitized.Email) {
    sanitized.Email = normalizeEmail(sanitized.Email);
  }

  const response = await zohoCrmRequest<ZohoWriteResponse>("/Leads", {
    method: "PUT",
    body: { data: [{ id: recordId, ...sanitized }] },
  });

  return { id: extractRecordId(response) };
}

/** Update an existing Contact by record ID. */
export async function updateContact(
  id: string,
  payload: ZohoContactWritePayload,
): Promise<ZohoRecordRef> {
  const recordId = normalizeRecordId(id, "Contact ID");
  const sanitized = sanitizeContactPayload(payload);
  assertWritePayloadNotEmpty(sanitized, "Contact update");

  if (sanitized.Email) {
    sanitized.Email = normalizeEmail(sanitized.Email);
  }

  const response = await zohoCrmRequest<ZohoWriteResponse>("/Contacts", {
    method: "PUT",
    body: { data: [{ id: recordId, ...sanitized }] },
  });

  return { id: extractRecordId(response) };
}

/** Attach a Note to a Contact or Lead record (triggers Zoho CRM workflow notifications). */
export async function createCrmNote(options: {
  module: "Leads" | "Contacts";
  recordId: string;
  title: string;
  content: string;
}): Promise<void> {
  const recordId = normalizeRecordId(
    options.recordId,
    `${options.module.slice(0, -1)} ID`,
  );

  await zohoCrmRequest(`/${options.module}/${recordId}/Notes`, {
    method: "POST",
    body: {
      data: [
        {
          Note_Title: options.title,
          Note_Content: options.content,
        },
      ],
    },
  });
}

/** Harmless Notes read used to verify OAuth + Notes scope (no record data returned). */
export async function verifyNotesModuleAccess(): Promise<void> {
  await zohoCrmRequest("/Notes", {
    searchParams: {
      per_page: 1,
      page: 1,
      fields: "id",
    },
  });
}
