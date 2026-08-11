import type { GenieSource } from "@/lib/genie/client-types";

export type GenieChatErrorCode =
  | "invalid_request"
  | "missing_message"
  | "empty_message"
  | "message_too_long"
  | "genie_disabled"
  | "genie_not_configured"
  | "rate_limited"
  | "generation_failed"
  | "internal_error"
  | "network_error"
  | "stream_error";

export class GenieChatRequestError extends Error {
  readonly status: number;
  readonly code: GenieChatErrorCode;

  constructor(status: number, code: GenieChatErrorCode, message: string) {
    super(message);
    this.name = "GenieChatRequestError";
    this.status = status;
    this.code = code;
  }
}

export type GenieStreamHandlers = {
  onMeta: (sources: GenieSource[]) => void;
  onDelta: (text: string) => void;
  onDone: () => void;
  onError: (message: string, options?: { interrupted?: boolean; code?: string }) => void;
};

function parseSseBlock(block: string): { event: string; data: string } | null {
  const lines = block.split("\n");
  let event = "message";
  const dataLines: string[] = [];

  for (const line of lines) {
    if (line.startsWith("event:")) {
      event = line.slice(6).trim();
    } else if (line.startsWith("data:")) {
      dataLines.push(line.slice(5).trim());
    }
  }

  if (dataLines.length === 0) {
    return null;
  }

  return { event, data: dataLines.join("\n") };
}

export async function sendGenieMessageStream(
  message: string,
  handlers: GenieStreamHandlers,
  signal?: AbortSignal,
): Promise<void> {
  let response: Response;

  try {
    response = await fetch("/api/genie/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, stream: true }),
      signal,
    });
  } catch {
    if (signal?.aborted) {
      return;
    }

    throw new GenieChatRequestError(
      0,
      "network_error",
      "Network request failed.",
    );
  }

  const contentType = response.headers.get("content-type") ?? "";

  if (!response.ok) {
    let payload: { error?: string; code?: string } = {};
    try {
      payload = await response.json();
    } catch {
      // ignore
    }

    throw new GenieChatRequestError(
      response.status,
      (payload.code ?? "internal_error") as GenieChatErrorCode,
      payload.error ?? "Genie request failed.",
    );
  }

  if (!contentType.includes("text/event-stream") || !response.body) {
    let payload: { answer?: string; sources?: GenieSource[] } = {};
    try {
      payload = await response.json();
    } catch {
      throw new GenieChatRequestError(
        500,
        "internal_error",
        "Invalid response from Genie.",
      );
    }

    if (typeof payload.answer === "string") {
      handlers.onMeta(Array.isArray(payload.sources) ? payload.sources : []);
      handlers.onDelta(payload.answer);
      handlers.onDone();
      return;
    }

    throw new GenieChatRequestError(
      500,
      "internal_error",
      "Invalid response from Genie.",
    );
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }

      buffer += decoder.decode(value, { stream: true });
      const parts = buffer.split("\n\n");
      buffer = parts.pop() ?? "";

      for (const part of parts) {
        const parsed = parseSseBlock(part.trim());
        if (!parsed) {
          continue;
        }

        let payload: Record<string, unknown> = {};
        try {
          payload = JSON.parse(parsed.data) as Record<string, unknown>;
        } catch {
          continue;
        }

        if (parsed.event === "meta") {
          const sources = Array.isArray(payload.sources)
            ? (payload.sources as GenieSource[])
            : [];
          handlers.onMeta(sources);
        } else if (parsed.event === "delta" && typeof payload.text === "string") {
          handlers.onDelta(payload.text);
        } else if (parsed.event === "done") {
          handlers.onDone();
        } else if (parsed.event === "error") {
          handlers.onError(
            typeof payload.message === "string"
              ? payload.message
              : "Sorry, I couldn't answer that right now. Please try again.",
            {
              interrupted: payload.interrupted === true,
              code: typeof payload.code === "string" ? payload.code : undefined,
            },
          );
        }
      }
    }
  } catch {
    if (signal?.aborted) {
      return;
    }

    throw new GenieChatRequestError(
      0,
      "stream_error",
      "The response stream was interrupted.",
    );
  }
}

export async function sendGenieMessage(
  message: string,
  options?: { stream?: boolean; signal?: AbortSignal },
): Promise<{ answer: string; sources: GenieSource[] }> {
  if (options?.stream) {
    let answer = "";
    let sources: GenieSource[] = [];
    let finished = false;
    let errorMessage: string | null = null;

    await sendGenieMessageStream(
      message,
      {
        onMeta: (nextSources) => {
          sources = nextSources;
        },
        onDelta: (text) => {
          answer += text;
        },
        onDone: () => {
          finished = true;
        },
        onError: (messageText) => {
          errorMessage = messageText;
        },
      },
      options.signal,
    );

    if (errorMessage) {
      throw new GenieChatRequestError(503, "generation_failed", errorMessage);
    }

    if (!finished && !options.signal?.aborted) {
      throw new GenieChatRequestError(
        503,
        "stream_error",
        "Genie's response was interrupted. Please try again.",
      );
    }

    return { answer, sources };
  }

  let response: Response;

  try {
    response = await fetch("/api/genie/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
      signal: options?.signal,
    });
  } catch {
    if (options?.signal?.aborted) {
      throw new GenieChatRequestError(0, "network_error", "Request cancelled.");
    }

    throw new GenieChatRequestError(
      0,
      "network_error",
      "Network request failed.",
    );
  }

  let payload: { error?: string; code?: string; answer?: string; sources?: unknown };

  try {
    payload = await response.json();
  } catch {
    throw new GenieChatRequestError(
      response.status,
      "internal_error",
      "Invalid response from Genie.",
    );
  }

  if (!response.ok) {
    const code = (payload.code ?? "internal_error") as GenieChatErrorCode;
    throw new GenieChatRequestError(
      response.status,
      code,
      payload.error ?? "Genie request failed.",
    );
  }

  if (typeof payload.answer !== "string") {
    throw new GenieChatRequestError(
      500,
      "internal_error",
      "Invalid response from Genie.",
    );
  }

  const sources = Array.isArray(payload.sources)
    ? payload.sources.filter(
        (source): source is GenieSource =>
          source != null &&
          typeof source === "object" &&
          typeof (source as { title?: unknown }).title === "string" &&
          typeof (source as { url?: unknown }).url === "string",
      )
    : [];

  return {
    answer: payload.answer,
    sources,
  };
}

export function getFriendlyGenieErrorMessage(error: GenieChatRequestError): string {
  if (error.code === "genie_disabled" || error.code === "genie_not_configured") {
    return "Genie is temporarily unavailable. You can still contact our team.";
  }

  if (error.code === "rate_limited") {
    return "Genie is receiving too many requests. Please try again shortly.";
  }

  if (error.code === "empty_message" || error.code === "message_too_long") {
    return "Please enter a valid question (up to 1000 characters).";
  }

  if (error.code === "network_error" || error.code === "stream_error") {
    return "Sorry, I couldn't reach Genie right now. Please check your connection and try again.";
  }

  return "Sorry, I couldn't answer that right now. Please try again.";
}
