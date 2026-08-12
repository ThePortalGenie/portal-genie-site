/** Registered OAuth redirect URI — do not change without updating the Zoho OAuth client. */
export const ZOHO_OAUTH_REDIRECT_URI =
  "https://www.theportalgenie.com/api/zoho/oauth/callback" as const;

/**
 * Minimum Zoho CRM scopes for future Genie Lead create/update/search.
 * @see https://www.zoho.com/crm/developer/docs/api/v8/scopes.html
 */
export const ZOHO_CRM_LEAD_SCOPES = [
  "ZohoCRM.modules.leads.READ",
  "ZohoCRM.modules.leads.CREATE",
  "ZohoCRM.modules.leads.UPDATE",
] as const;

export const ZOHO_CRM_OAUTH_SCOPE = ZOHO_CRM_LEAD_SCOPES.join(",");

/** Confirmed Lead Source picklist value for Genie (future enquiry task). */
export const ZOHO_LEAD_SOURCE_PORTAL_GENIE_CHATBOT = "Portal Genie Chatbot" as const;

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

/** Cookie set during one-time OAuth bootstrap (short-lived). */
export const ZOHO_OAUTH_SETUP_COOKIE = "pg_zoho_oauth_setup";

/** CSRF state cookie for OAuth bootstrap (short-lived). */
export const ZOHO_OAUTH_STATE_COOKIE = "pg_zoho_oauth_state";

/** Bootstrap cookies expire after 10 minutes. */
export const ZOHO_OAUTH_COOKIE_MAX_AGE_SEC = 600;
