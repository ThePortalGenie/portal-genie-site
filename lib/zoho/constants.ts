/**
 * OAuth redirect URI is configured via ZOHO_REDIRECT_URI (server-only env var).
 * Registered in the Zoho OAuth client — must match exactly at runtime:
 * - Production: https://www.theportalgenie.com/api/zoho/oauth/callback
 * - Vercel testing: https://<preview-host>/api/zoho/oauth/callback
 */

/**
 * Minimum Zoho CRM OAuth scopes for Genie enquiry workflow.
 * @see https://www.zoho.com/crm/developer/docs/api/v8/scopes.html
 */
export const ZOHO_CRM_LEAD_SCOPES = [
  "ZohoCRM.modules.leads.READ",
  "ZohoCRM.modules.leads.CREATE",
  "ZohoCRM.modules.leads.UPDATE",
] as const;

export const ZOHO_CRM_CONTACT_SCOPES = [
  "ZohoCRM.modules.contacts.READ",
  "ZohoCRM.modules.contacts.UPDATE",
] as const;

/** Minimum Notes scopes — CREATE for enquiry history, READ for verification. */
export const ZOHO_CRM_NOTE_SCOPES = [
  "ZohoCRM.modules.notes.CREATE",
  "ZohoCRM.modules.notes.READ",
] as const;

export const ZOHO_CRM_OAUTH_SCOPES = [
  ...ZOHO_CRM_LEAD_SCOPES,
  ...ZOHO_CRM_CONTACT_SCOPES,
  ...ZOHO_CRM_NOTE_SCOPES,
] as const;

/** Comma-separated scope string for OAuth authorization requests. */
export const ZOHO_CRM_OAUTH_SCOPE = ZOHO_CRM_OAUTH_SCOPES.join(",");

/**
 * After changing scopes, re-run OAuth bootstrap via /api/zoho/oauth/start to
 * obtain a new ZOHO_REFRESH_TOKEN with the expanded permissions.
 */

/** Confirmed Lead Source picklist value for Genie enquiries. */
export const ZOHO_LEAD_SOURCE_PORTAL_GENIE_CHATBOT = "Portal Genie Chatbot" as const;

/** Server-controlled Current_Campaign value for Genie website enquiries. */
export const ZOHO_CURRENT_CAMPAIGN_PORTAL_GENIE_WEBSITE =
  "Portal Genie Website" as const;

/** Confirmed Zoho CRM Leads module API names — do not rename. */
export const ZOHO_LEAD_API_FIELDS = {
  Company: "Company",
  Last_Name: "Last_Name",
  First_Name: "First_Name",
  Email: "Email",
  Phone: "Phone",
  Accounting_Software_Used: "Accounting_Software_Used",
  Lead_Source: "Lead_Source",
  Current_Campaign: "Current_Campaign",
  Description: "Description",
} as const;

export type ZohoLeadApiField =
  (typeof ZOHO_LEAD_API_FIELDS)[keyof typeof ZOHO_LEAD_API_FIELDS];

/** Zoho CRM Contacts module API names used for Genie enquiry updates. */
export const ZOHO_CONTACT_API_FIELDS = {
  First_Name: "First_Name",
  Last_Name: "Last_Name",
  Email: "Email",
  Phone: "Phone",
  Accounting_Software_Used: "Accounting_Software_Used",
  Current_Campaign: "Current_Campaign",
  Description: "Description",
} as const;

export type ZohoContactApiField =
  (typeof ZOHO_CONTACT_API_FIELDS)[keyof typeof ZOHO_CONTACT_API_FIELDS];

/** Cookie set during one-time OAuth bootstrap (short-lived). */
export const ZOHO_OAUTH_SETUP_COOKIE = "pg_zoho_oauth_setup";

/** CSRF state cookie for OAuth bootstrap (short-lived). */
export const ZOHO_OAUTH_STATE_COOKIE = "pg_zoho_oauth_state";

/** Bootstrap cookies expire after 10 minutes. */
export const ZOHO_OAUTH_COOKIE_MAX_AGE_SEC = 600;
