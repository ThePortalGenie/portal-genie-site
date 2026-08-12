import "server-only";

import { ZohoCrmApiError } from "@/lib/zoho/errors";
import { getZohoAccessToken } from "@/lib/zoho/oauth";

export type ZohoCrmRequestOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  searchParams?: Record<string, string | number | undefined>;
};

function buildCrmUrl(
  apiBaseUrl: string,
  path: string,
  searchParams?: ZohoCrmRequestOptions["searchParams"],
): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const url = new URL(
    `${apiBaseUrl.replace(/\/+$/, "")}/crm/v2${normalizedPath}`,
  );

  if (searchParams) {
    for (const [key, value] of Object.entries(searchParams)) {
      if (value !== undefined && value !== "") {
        url.searchParams.set(key, String(value));
      }
    }
  }

  return url.toString();
}

async function parseCrmJson<T>(response: Response): Promise<T> {
  let payload: unknown;

  try {
    payload = await response.json();
  } catch {
    throw new ZohoCrmApiError("Zoho CRM returned invalid JSON.", {
      code: "zoho_crm_invalid_json",
      httpStatus: 502,
    });
  }

  return payload as T;
}

function extractZohoError(payload: Record<string, unknown>): string | undefined {
  if (typeof payload.message === "string") {
    return payload.message;
  }
  if (typeof payload.status === "string" && payload.status !== "success") {
    return payload.status;
  }
  return undefined;
}

/** Authenticated JSON request to Zoho CRM v2. */
export async function zohoCrmRequest<T = unknown>(
  path: string,
  options: ZohoCrmRequestOptions = {},
): Promise<T> {
  const { accessToken, apiBaseUrl } = await getZohoAccessToken();
  const method = options.method ?? "GET";
  const url = buildCrmUrl(apiBaseUrl, path, options.searchParams);

  let response: Response;

  try {
    response = await fetch(url, {
      method,
      headers: {
        Authorization: `Zoho-oauthtoken ${accessToken}`,
        ...(options.body !== undefined
          ? { "Content-Type": "application/json" }
          : {}),
      },
      body:
        options.body !== undefined ? JSON.stringify(options.body) : undefined,
      cache: "no-store",
    });
  } catch {
    throw new ZohoCrmApiError("Unable to reach Zoho CRM.", {
      code: "zoho_crm_network_error",
      httpStatus: 502,
    });
  }

  const payload = await parseCrmJson<T & Record<string, unknown>>(response);

  if (!response.ok) {
    throw new ZohoCrmApiError(
      extractZohoError(payload as Record<string, unknown>) ??
        "Zoho CRM request failed.",
      {
        code: "zoho_crm_request_failed",
        httpStatus: response.status,
        zohoStatus:
          typeof payload.status === "string" ? payload.status : undefined,
      },
    );
  }

  if (
    typeof payload.status === "string" &&
    payload.status === "error" &&
    typeof payload.code === "string"
  ) {
    throw new ZohoCrmApiError(
      extractZohoError(payload as Record<string, unknown>) ??
        "Zoho CRM returned an error.",
      {
        code: "zoho_crm_error_response",
        httpStatus: 502,
        zohoStatus: payload.status,
      },
    );
  }

  return payload as T;
}

/** Harmless Leads read used to verify OAuth + READ scope (no record data returned). */
export async function verifyLeadsModuleAccess(): Promise<{
  module: string;
  apiName: string;
}> {
  await zohoCrmRequest("/Leads", {
    searchParams: {
      per_page: 1,
      page: 1,
      fields: "id",
    },
  });

  return {
    module: "Leads",
    apiName: "Leads",
  };
}

/** Reserved for the Genie enquiry task — not implemented in this phase. */
export async function findLeadByEmail(_email: string): Promise<null> {
  throw new ZohoCrmApiError("findLeadByEmail is not implemented yet.", {
    code: "zoho_not_implemented",
    httpStatus: 501,
  });
}

export type ZohoLeadWritePayload = Partial<
  Record<
    | "Company"
    | "Last_Name"
    | "First_Name"
    | "Email"
    | "Phone"
    | "Accounting_Software_Used"
    | "Lead_Source"
    | "Current_Campaign"
    | "Description",
    string
  >
>;

/** Reserved for the Genie enquiry task — not implemented in this phase. */
export async function createLead(_payload: ZohoLeadWritePayload): Promise<never> {
  throw new ZohoCrmApiError("createLead is not implemented yet.", {
    code: "zoho_not_implemented",
    httpStatus: 501,
  });
}

/** Reserved for the Genie enquiry task — not implemented in this phase. */
export async function updateLead(
  _id: string,
  _payload: ZohoLeadWritePayload,
): Promise<never> {
  throw new ZohoCrmApiError("updateLead is not implemented yet.", {
    code: "zoho_not_implemented",
    httpStatus: 501,
  });
}
