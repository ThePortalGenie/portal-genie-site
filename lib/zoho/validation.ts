import "server-only";

import { ZohoCrmApiError } from "@/lib/zoho/errors";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const FIELD_MAX_LENGTH: Record<string, number> = {
  Company: 200,
  Last_Name: 80,
  First_Name: 80,
  Email: 254,
  Phone: 30,
  Accounting_Software_Used: 255,
  Lead_Source: 255,
  Current_Campaign: 255,
  Description: 32000,
};

function sanitizeOptionalString(
  value: unknown,
  field: string,
  maxLength: number,
): string | undefined {
  if (value === undefined || value === null) {
    return undefined;
  }

  if (typeof value !== "string") {
    throw new ZohoCrmApiError(`Invalid value for ${field}.`, {
      code: "zoho_invalid_payload",
      httpStatus: 400,
    });
  }

  const trimmed = value.trim();
  if (!trimmed) {
    return undefined;
  }

  if (trimmed.length > maxLength) {
    throw new ZohoCrmApiError(`${field} exceeds the maximum allowed length.`, {
      code: "zoho_invalid_payload",
      httpStatus: 400,
    });
  }

  return trimmed;
}

/** Normalises and validates an email address for CRM lookups and writes. */
export function normalizeEmail(email: string): string {
  if (typeof email !== "string") {
    throw new ZohoCrmApiError("Email is required.", {
      code: "zoho_invalid_email",
      httpStatus: 400,
    });
  }

  const trimmed = email.trim().toLowerCase();

  if (!trimmed || trimmed.length > FIELD_MAX_LENGTH.Email) {
    throw new ZohoCrmApiError("Email is invalid.", {
      code: "zoho_invalid_email",
      httpStatus: 400,
    });
  }

  if (!EMAIL_PATTERN.test(trimmed)) {
    throw new ZohoCrmApiError("Email format is invalid.", {
      code: "zoho_invalid_email",
      httpStatus: 400,
    });
  }

  return trimmed;
}

/** Validates a Zoho CRM record ID (numeric string). */
export function normalizeRecordId(id: string, label = "Record ID"): string {
  if (typeof id !== "string") {
    throw new ZohoCrmApiError(`${label} is required.`, {
      code: "zoho_invalid_record_id",
      httpStatus: 400,
    });
  }

  const trimmed = id.trim();
  if (!/^\d+$/.test(trimmed)) {
    throw new ZohoCrmApiError(`${label} is invalid.`, {
      code: "zoho_invalid_record_id",
      httpStatus: 400,
    });
  }

  return trimmed;
}

function sanitizePayloadFields<T extends Record<string, string | undefined>>(
  payload: Partial<Record<string, string>>,
  allowedFields: readonly string[],
): T {
  const sanitized = {} as T;

  for (const field of allowedFields) {
    const value = sanitizeOptionalString(
      payload[field as keyof typeof payload],
      field,
      FIELD_MAX_LENGTH[field] ?? 255,
    );
    if (value !== undefined) {
      (sanitized as Record<string, string>)[field] = value;
    }
  }

  return sanitized;
}

export function sanitizeLeadPayload(
  payload: Partial<Record<string, string>>,
): Partial<Record<string, string>> {
  return sanitizePayloadFields(payload, [
    "Company",
    "Last_Name",
    "First_Name",
    "Email",
    "Phone",
    "Accounting_Software_Used",
    "Lead_Source",
    "Current_Campaign",
    "Description",
  ]);
}

export function sanitizeContactPayload(
  payload: Partial<Record<string, string>>,
): Partial<Record<string, string>> {
  return sanitizePayloadFields(payload, [
    "First_Name",
    "Last_Name",
    "Email",
    "Phone",
    "Accounting_Software_Used",
    "Current_Campaign",
    "Description",
  ]);
}
