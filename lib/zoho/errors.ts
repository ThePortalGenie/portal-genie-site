export class ZohoConfigurationError extends Error {
  readonly code = "zoho_not_configured";

  constructor(message = "Zoho CRM is not configured.") {
    super(message);
    this.name = "ZohoConfigurationError";
  }
}

export class ZohoOAuthError extends Error {
  readonly code: string;
  readonly httpStatus: number;
  readonly zohoError?: string;

  constructor(
    message: string,
    options: { code?: string; httpStatus?: number; zohoError?: string } = {},
  ) {
    super(message);
    this.name = "ZohoOAuthError";
    this.code = options.code ?? "zoho_oauth_error";
    this.httpStatus = options.httpStatus ?? 502;
    this.zohoError = options.zohoError;
  }
}

export class ZohoCrmApiError extends Error {
  readonly code: string;
  readonly httpStatus: number;
  readonly zohoStatus?: string;

  constructor(
    message: string,
    options: { code?: string; httpStatus?: number; zohoStatus?: string } = {},
  ) {
    super(message);
    this.name = "ZohoCrmApiError";
    this.code = options.code ?? "zoho_crm_error";
    this.httpStatus = options.httpStatus ?? 502;
    this.zohoStatus = options.zohoStatus;
  }
}
