import "server-only";

import { Resend } from "resend";
import { buildVerificationUrl } from "@/lib/demo-auth/verification";
import type { DemoLeadPayload } from "@/lib/demo-auth/types";

function getResendClient(): Resend {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured.");
  }
  return new Resend(apiKey);
}

function getDemoFromAddress(): string {
  return (
    process.env.DEMO_FROM_EMAIL?.trim() ||
    "Portal Genie Demo <demo@demo.theportalgenie.com>"
  );
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildVerificationEmailHtml(firstName: string, verifyUrl: string): string {
  const safeName = escapeHtml(firstName);
  const safeUrl = escapeHtml(verifyUrl);

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f5f7fa;font-family:Arial,Helvetica,sans-serif;color:#112136;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f5f7fa;padding:32px 16px;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:520px;background:#ffffff;border-radius:12px;padding:32px 28px;">
        <tr><td style="font-size:20px;font-weight:700;padding-bottom:16px;">Portal Genie</td></tr>
        <tr><td style="font-size:15px;line-height:1.6;padding-bottom:12px;">Hi ${safeName},</td></tr>
        <tr><td style="font-size:15px;line-height:1.6;padding-bottom:20px;">Thanks for requesting access to the Portal Genie interactive demo.</td></tr>
        <tr><td style="font-size:15px;line-height:1.6;padding-bottom:24px;">Click below to verify your email address and launch the Client Portal demo.</td></tr>
        <tr><td align="center" style="padding-bottom:28px;">
          <a href="${safeUrl}" style="display:inline-block;background:#0077BE;color:#ffffff;text-decoration:none;font-weight:600;font-size:15px;padding:14px 28px;border-radius:8px;">Verify &amp; View Demo</a>
        </td></tr>
        <tr><td style="font-size:13px;line-height:1.6;color:#667085;padding-bottom:12px;">This verification link expires in 30 minutes.</td></tr>
        <tr><td style="font-size:13px;line-height:1.6;color:#667085;padding-bottom:24px;">If you didn't request access to the Portal Genie demo, you can ignore this email.</td></tr>
        <tr><td style="font-size:13px;color:#667085;border-top:1px solid #ececec;padding-top:16px;">Portal Genie</td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function buildVerificationEmailText(firstName: string, verifyUrl: string): string {
  return `Portal Genie

Hi ${firstName},

Thanks for requesting access to the Portal Genie interactive demo.

Verify your email address and launch the Client Portal demo:
${verifyUrl}

This verification link expires in 30 minutes.

If you didn't request access to the Portal Genie demo, you can ignore this email.

Portal Genie`;
}

export function isResendConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY?.trim());
}

export async function sendDemoVerificationEmail(
  lead: DemoLeadPayload,
  rawToken: string,
): Promise<void> {
  const resend = getResendClient();
  const verifyUrl = buildVerificationUrl(rawToken);

  const { error } = await resend.emails.send({
    from: getDemoFromAddress(),
    to: lead.email,
    subject: "Verify your Portal Genie demo access",
    html: buildVerificationEmailHtml(lead.firstName, verifyUrl),
    text: buildVerificationEmailText(lead.firstName, verifyUrl),
  });

  if (error) {
    throw new Error("Failed to send verification email.");
  }
}

export async function sendDemoVerificationEmailSafe(
  lead: DemoLeadPayload,
  rawToken: string,
): Promise<boolean> {
  try {
    await sendDemoVerificationEmail(lead, rawToken);
    return true;
  } catch {
    return false;
  }
}
