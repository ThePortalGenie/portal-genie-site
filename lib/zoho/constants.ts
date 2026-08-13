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

/** Minimum Notes scopes — CREATE for enquiry history, READ for Notes module access. */
export const ZOHO_CRM_NOTE_SCOPES = [
  "ZohoCRM.modules.notes.CREATE",
  "ZohoCRM.modules.notes.READ",
] as const;

export const ZOHO_CRM_OAUTH_SCOPES = [
  ...ZOHO_CRM_LEAD_SCOPES,
  ...ZOHO_CRM_CONTACT_SCOPES,
  ...ZOHO_CRM_NOTE_SCOPES,
] as const;

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
