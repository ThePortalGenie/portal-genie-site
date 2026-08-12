import "server-only";

import { GenieEnquiryNotificationError } from "@/lib/genie/enquiry-errors";
import {
  buildGenieEnquiryNotificationBody,
  buildGenieEnquiryNotificationSubject,
} from "@/lib/genie/enquiry-content";
import type { GenieEnquiryResolution } from "@/lib/genie/process-enquiry";
import type { ValidatedGenieEnquiry } from "@/lib/genie/validate-enquiry";

function requireEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new GenieEnquiryNotificationError(
      `Missing required environment variable: ${name}`,
      { code: "notification_not_configured", httpStatus: 503 },
    );
  }
  return value;
}

export function isEnquiryNotificationConfigured(): boolean {
  return Boolean(
    process.env.GENIE_ENQUIRY_NOTIFICATION_EMAIL?.trim() &&
      process.env.RESEND_API_KEY?.trim() &&
      process.env.GENIE_ENQUIRY_NOTIFICATION_FROM?.trim(),
  );
}

function buildCrmRecordUrl(options: {
  module: "Leads" | "Contacts";
  recordId: string;
}): string | undefined {
  const baseUrl = process.env.ZOHO_CRM_WEB_BASE_URL?.trim().replace(/\/+$/, "");
  if (!baseUrl) {
    return undefined;
  }

  return `${baseUrl}/tab/${options.module}/${options.recordId}`;
}

export async function sendGenieEnquiryNotification(options: {
  enquiry: ValidatedGenieEnquiry;
  resolution: GenieEnquiryResolution;
  recordModule: "Leads" | "Contacts";
  recordId: string;
  submittedAt: Date;
}): Promise<void> {
  const to = requireEnv("GENIE_ENQUIRY_NOTIFICATION_EMAIL");
  const from = requireEnv("GENIE_ENQUIRY_NOTIFICATION_FROM");
  const apiKey = requireEnv("RESEND_API_KEY");

  const crmRecordUrl = buildCrmRecordUrl({
    module: options.recordModule,
    recordId: options.recordId,
  });

  const subject = buildGenieEnquiryNotificationSubject(options.enquiry);
  const text = buildGenieEnquiryNotificationBody({
    enquiry: options.enquiry,
    resolution: options.resolution,
    submittedAt: options.submittedAt,
    crmRecordUrl,
  });

  let response: Response;

  try {
    response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        subject,
        text,
      }),
      cache: "no-store",
    });
  } catch {
    throw new GenieEnquiryNotificationError(
      "Unable to reach the email notification service.",
      { code: "notification_failed", httpStatus: 503 },
    );
  }

  if (!response.ok) {
    throw new GenieEnquiryNotificationError(
      "Email notification could not be sent.",
      { code: "notification_failed", httpStatus: 503 },
    );
  }
}
