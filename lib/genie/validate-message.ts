import { GENIE_MAX_MESSAGE_LENGTH } from "@/config/genie";

type ValidationSuccess = { ok: true; message: string; stream: boolean };
type ValidationFailure = { ok: false; error: string; code: string };

export type MessageValidationResult = ValidationSuccess | ValidationFailure;

export function validateGenieMessage(body: unknown): MessageValidationResult {
  if (body == null || typeof body !== "object" || Array.isArray(body)) {
    return {
      ok: false,
      error: "Request body must be a JSON object with a message field.",
      code: "invalid_request",
    };
  }

  const { message, stream } = body as { message?: unknown; stream?: unknown };

  if (stream !== undefined && typeof stream !== "boolean") {
    return {
      ok: false,
      error: "stream must be a boolean when provided.",
      code: "invalid_request",
    };
  }

  if (message === undefined || message === null) {
    return {
      ok: false,
      error: "Message is required.",
      code: "missing_message",
    };
  }

  if (typeof message !== "string") {
    return {
      ok: false,
      error: "Message must be a string.",
      code: "invalid_message_type",
    };
  }

  if (message.trim().length === 0) {
    return {
      ok: false,
      error: "Message must contain meaningful text.",
      code: "empty_message",
    };
  }

  if (message.length > GENIE_MAX_MESSAGE_LENGTH) {
    return {
      ok: false,
      error: `Message must be ${GENIE_MAX_MESSAGE_LENGTH} characters or fewer.`,
      code: "message_too_long",
    };
  }

  return { ok: true, message: message.trim(), stream: stream === true };
}
