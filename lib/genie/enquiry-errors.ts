export class GenieEnquiryNotificationError extends Error {
  readonly code: string;
  readonly httpStatus: number;

  constructor(
    message: string,
    options: { code?: string; httpStatus?: number } = {},
  ) {
    super(message);
    this.name = "GenieEnquiryNotificationError";
    this.code = options.code ?? "notification_failed";
    this.httpStatus = options.httpStatus ?? 503;
  }
}
