import "server-only";

/** Internal CRM person lookup result — IDs only, no record data. */
export type CrmPersonResolution =
  | { type: "contact"; id: string }
  | { type: "lead"; id: string }
  | { type: "none" };

/** Minimal CRM record reference returned by email lookups. */
export type ZohoRecordRef = {
  id: string;
};
