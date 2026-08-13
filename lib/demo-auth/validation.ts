import {
  DEMO_ACCOUNTING_SOFTWARE_OPTIONS,
  DEMO_ACCESS_FIELD_LIMITS,
  DEMO_HONEYPOT_FIELD,
} from "@/config/demo-access";
import type { ValidatedDemoLeadRequest } from "@/lib/demo-auth/types";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ValidationSuccess = { ok: true; data: ValidatedDemoLeadRequest };
type ValidationFailure = { ok: false; error: string; code: string };

export type DemoLeadValidationResult = ValidationSuccess | ValidationFailure;

function fail(error: string, code: string): ValidationFailure {
  return { ok: false, error, code };
}

function sanitizeRequired(
  value: unknown,
  label: string,
  maxLength: number,
): string | ValidationFailure {
  if (typeof value !== "string") {
    return fail(`Please enter your ${label.toLowerCase()}.`, "invalid_field");
  }
  const trimmed = value.trim();
  if (!trimmed) {
    return fail(`Please enter your ${label.toLowerCase()}.`, "invalid_field");
  }
  if (trimmed.length > maxLength) {
    return fail(`${label} is too long.`, "invalid_field");
  }
  return trimmed;
}

function normalizeEmail(value: unknown): string | ValidationFailure {
  if (typeof value !== "string") {
    return fail("Please enter a valid email address.", "invalid_email");
  }
  const normalized = value.trim().toLowerCase();
  if (!normalized || !EMAIL_PATTERN.test(normalized)) {
    return fail("Please enter a valid email address.", "invalid_email");
  }
  if (normalized.length > DEMO_ACCESS_FIELD_LIMITS.email) {
    return fail("Email address is too long.", "invalid_email");
  }
  return normalized;
}

export function validateDemoLeadBody(body: unknown): DemoLeadValidationResult {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return fail("Please complete all required fields.", "invalid_request");
  }

  const record = body as Record<string, unknown>;

  const honeypot = record[DEMO_HONEYPOT_FIELD];
  if (typeof honeypot === "string" && honeypot.trim()) {
    return fail("Please complete all required fields.", "invalid_request");
  }

  const firstName = sanitizeRequired(
    record.firstName,
    "First name",
    DEMO_ACCESS_FIELD_LIMITS.firstName,
  );
  if (typeof firstName !== "string") {
    return firstName;
  }

  const surname = sanitizeRequired(
    record.surname,
    "Surname",
    DEMO_ACCESS_FIELD_LIMITS.surname,
  );
  if (typeof surname !== "string") {
    return surname;
  }

  const company = sanitizeRequired(
    record.company,
    "Company",
    DEMO_ACCESS_FIELD_LIMITS.company,
  );
  if (typeof company !== "string") {
    return company;
  }

  const phone = sanitizeRequired(
    record.phone,
    "Phone",
    DEMO_ACCESS_FIELD_LIMITS.phone,
  );
  if (typeof phone !== "string") {
    return phone;
  }

  const email = normalizeEmail(record.email);
  if (typeof email !== "string") {
    return email;
  }

  const accountingSoftwareRaw = sanitizeRequired(
    record.accountingSoftware,
    "Accounting software",
    DEMO_ACCESS_FIELD_LIMITS.accountingSoftware,
  );
  if (typeof accountingSoftwareRaw !== "string") {
    return accountingSoftwareRaw;
  }

  if (
    !DEMO_ACCOUNTING_SOFTWARE_OPTIONS.includes(
      accountingSoftwareRaw as (typeof DEMO_ACCOUNTING_SOFTWARE_OPTIONS)[number],
    )
  ) {
    return fail("Please select a valid accounting software option.", "invalid_field");
  }

  let otherAccountingSoftware: string | undefined;
  if (accountingSoftwareRaw === "Other") {
    const other = sanitizeRequired(
      record.otherAccountingSoftware,
      "Other accounting software",
      DEMO_ACCESS_FIELD_LIMITS.otherAccountingSoftware,
    );
    if (typeof other !== "string") {
      return other;
    }
    otherAccountingSoftware = other;
  }

  return {
    ok: true,
    data: {
      firstName,
      surname,
      company,
      phone,
      email,
      accountingSoftware: accountingSoftwareRaw,
      otherAccountingSoftware,
    },
  };
}

export function validateResendEmailBody(body: unknown): ValidationFailure | { ok: true; email: string } {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return fail("Please enter a valid email address.", "invalid_request");
  }

  const email = normalizeEmail((body as Record<string, unknown>).email);
  if (typeof email !== "string") {
    return email;
  }

  return { ok: true, email };
}
