export class GenieConfigurationError extends Error {
  readonly code = "genie_not_configured";

  constructor(message = "Genie is not configured.") {
    super(message);
    this.name = "GenieConfigurationError";
  }
}

export class GenieGenerationError extends Error {
  readonly code: string;
  readonly httpStatus: number;

  constructor(
    message = "Failed to generate a response.",
    options: { code?: string; httpStatus?: number } = {},
  ) {
    super(message);
    this.name = "GenieGenerationError";
    this.code = options.code ?? "generation_failed";
    this.httpStatus = options.httpStatus ?? 503;
  }
}
