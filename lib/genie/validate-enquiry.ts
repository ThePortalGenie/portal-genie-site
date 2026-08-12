import {
  GENIE_ACCOUNTING_SOFTWARE_OPTIONS,
  GENIE_ENQUIRY_FIELD_LIMITS,
  GENIE_ENQUIRY_HONEYPOT_FIELD,
  GENIE_ENQUIRY_TYPES,
  type GenieEnquiryType,
} from "@/config/genie-enquiry";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ALLOWED_FIELDS = new Set([
  "enquiryType",
  "firstName",
  "lastName",
  "company",
  "email",
  "phone",
  "accountingSoftware",
  "message",
  GENIE_ENQUIRY_HONEYPOT_FIELD,
]);

const FORBIDDEN_FIELDS = new Set(["Lead_Source", "Current_Campaign", "leadSource", "currentCampaign"]);

export type ValidatedGenieEnquiry = {
  enquiryType: GenieEnquiryType;
  firstName: string;
  lastName: string;
  company?: string;
  email: string;
  phone?: string;
  accountingSoftware?: string;
  message?: string;
};

type ValidationSuccess = { ok: true; data: ValidatedGenieEnquiry };
type ValidationFailure = { ok: false; error: string; code: string };

export type GenieEnquiryValidationResult = ValidationSuccess | ValidationFailure;

function fail(error: string, code: string): ValidationFailure {
  return { ok: false, error, code };
}

function sanitizeRequiredString(
  value: unknown,
  label: string,
  maxLength: number,
): string | ValidationFailure {
  if (typeof value !== "string") {
    return fail(`${label} is required.`, "validation_error");
  }

  const trimmed = value.trim();
  if (!trimmed) {
    return fail(`${label} is required.`, "validation_error");
  }

  if (trimmed.length > maxLength) {
    return fail(`${label} is too long.`, "validation_error");
  }

  return trimmed;
}

function sanitizeOptionalString(
  value: unknown,
  label: string,
  maxLength: number,
): string | undefined | ValidationFailure {
  if (value === undefined || value === null || value === "") {
    return undefined;
  }

  if (typeof value !== "string") {
    return fail(`${label} must be a string.`, "validation_error");
  }

  const trimmed = value.trim();
  if (!trimmed) {
    return undefined;
  }

  if (trimmed.length > maxLength) {
    return fail(`${label} is too long.`, "validation_error");
  }

  return trimmed;
}

function normalizeEmail(value: string): string | ValidationFailure {
  const trimmed = value.trim().toLowerCase();
  if (!EMAIL_PATTERN.test(trimmed) || trimmed.length > GENIE_ENQUIRY_FIELD_LIMITS.email) {
    return fail("Email format is invalid.", "validation_error");
  }
  return trimmed;
}

export function validateGenieEnquiryBody(body: unknown): GenieEnquiryValidationResult {
  if (body == null || typeof body !== "object" || Array.isArray(body)) {
    return fail("Request body must be a JSON object.", "invalid_request");
  }

  const record = body as Record<string, unknown>;

  for (const key of Object.keys(record)) {
    if (FORBIDDEN_FIELDS.has(key)) {
      return fail("Request contains unsupported fields.", "invalid_request");
    }
    if (!ALLOWED_FIELDS.has(key)) {
      return fail("Request contains unsupported fields.", "invalid_request");
    }
  }

  const honeypot = record[GENIE_ENQUIRY_HONEYPOT_FIELD];
  if (honeypot !== undefined && honeypot !== null && String(honeypot).trim() !== "") {
    return fail("Request could not be processed.", "invalid_request");
  }

  const enquiryType = record.enquiryType;
  if (typeof enquiryType !== "string" || !GENIE_ENQUIRY_TYPES.includes(enquiryType as GenieEnquiryType)) {
    return fail("Enquiry type is invalid.", "validation_error");
  }

  const typedEnquiryType = enquiryType as GenieEnquiryType;

  const firstName = sanitizeRequiredString(
    record.firstName,
    "First name",
    GENIE_ENQUIRY_FIELD_LIMITS.firstName,
  );
  if (typeof firstName !== "string") {
    return firstName;
  }

  const lastName = sanitizeRequiredString(
    record.lastName,
    "Last name",
    GENIE_ENQUIRY_FIELD_LIMITS.lastName,
  );
  if (typeof lastName !== "string") {
    return lastName;
  }

  const emailRaw = sanitizeRequiredString(
    record.email,
    "Email",
    GENIE_ENQUIRY_FIELD_LIMITS.email,
  );
  if (typeof emailRaw !== "string") {
    return emailRaw;
  }

  const email = normalizeEmail(emailRaw);
  if (typeof email !== "string") {
    return email;
  }

  const company = sanitizeOptionalString(
    record.company,
    "Company",
    GENIE_ENQUIRY_FIELD_LIMITS.company,
  );
  if (company && typeof company !== "string") {
    return company;
  }

  const phone = sanitizeOptionalString(
    record.phone,
    "Phone",
    GENIE_ENQUIRY_FIELD_LIMITS.phone,
  );
  if (phone && typeof phone !== "string") {
    return phone;
  }

  const accountingSoftware = sanitizeOptionalString(
    record.accountingSoftware,
    "Accounting software",
    GENIE_ENQUIRY_FIELD_LIMITS.accountingSoftware,
  );
  if (accountingSoftware && typeof accountingSoftware !== "string") {
    return accountingSoftware;
  }

  if (
    accountingSoftware &&
    !GENIE_ACCOUNTING_SOFTWARE_OPTIONS.includes(
      accountingSoftware as (typeof GENIE_ACCOUNTING_SOFTWARE_OPTIONS)[number],
    )
  ) {
    return fail("Accounting software selection is invalid.", "validation_error");
  }

  const message = sanitizeOptionalString(
    record.message,
    "Message",
    GENIE_ENQUIRY_FIELD_LIMITS.message,
  );
  if (message && typeof message !== "string") {
    return message;
  }

  if ((typedEnquiryType === "sales" || typedEnquiryType === "callback") && !company) {
    return fail("Company is required.", "validation_error");
  }

  if (typedEnquiryType === "callback" && !phone) {
    return fail("Phone is required for callback requests.", "validation_error");
  }

  return {
    ok: true,
    data: {
      enquiryType: typedEnquiryType,
      firstName,
      lastName,
      company,
      email,
      phone,
      accountingSoftware,
      message,
    },
  };
}
