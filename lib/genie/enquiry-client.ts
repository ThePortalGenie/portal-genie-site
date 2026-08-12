import {
  GENIE_ENQUIRY_HONEYPOT_FIELD,
  GENIE_ENQUIRY_SUCCESS_MESSAGES,
  type GenieEnquiryType,
} from "@/config/genie-enquiry";

export type GenieEnquiryFormValues = {
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  phone: string;
  accountingSoftware: string;
  message: string;
  website: string;
};

export class GenieEnquiryRequestError extends Error {
  readonly code: string;
  readonly httpStatus: number;

  constructor(message: string, options: { code: string; httpStatus: number }) {
    super(message);
    this.name = "GenieEnquiryRequestError";
    this.code = options.code;
    this.httpStatus = options.httpStatus;
  }
}

export function getEnquirySuccessMessage(enquiryType: GenieEnquiryType): string {
  return GENIE_ENQUIRY_SUCCESS_MESSAGES[enquiryType];
}

export async function submitGenieEnquiry(
  enquiryType: GenieEnquiryType,
  values: GenieEnquiryFormValues,
  options: { signal?: AbortSignal } = {},
): Promise<{ message: string }> {
  const payload: Record<string, string> = {
    enquiryType,
    firstName: values.firstName.trim(),
    lastName: values.lastName.trim(),
    email: values.email.trim(),
    [GENIE_ENQUIRY_HONEYPOT_FIELD]: values.website,
  };

  const company = values.company.trim();
  const phone = values.phone.trim();
  const accountingSoftware = values.accountingSoftware.trim();
  const message = values.message.trim();

  if (company) {
    payload.company = company;
  }
  if (phone) {
    payload.phone = phone;
  }
  if (accountingSoftware) {
    payload.accountingSoftware = accountingSoftware;
  }
  if (message) {
    payload.message = message;
  }

  const response = await fetch("/api/genie/enquiry", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    signal: options.signal,
  });

  let body: { ok?: boolean; message?: string; error?: string; code?: string };

  try {
    body = (await response.json()) as typeof body;
  } catch {
    throw new GenieEnquiryRequestError(
      "We couldn't submit your request right now. Please try again.",
      { code: "invalid_response", httpStatus: response.status },
    );
  }

  if (!response.ok || !body.ok) {
    throw new GenieEnquiryRequestError(
      body.error ?? "We couldn't submit your request right now. Please try again.",
      {
        code: body.code ?? "enquiry_failed",
        httpStatus: response.status,
      },
    );
  }

  return {
    message: getEnquirySuccessMessage(enquiryType),
  };
}
