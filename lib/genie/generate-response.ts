import "server-only";

import OpenAI, { APIError } from "openai";
import { getOpenAiApiKey } from "@/config/genie";
import { GenieConfigurationError, GenieGenerationError } from "@/lib/genie/errors";
import {
  buildGenieOpenAiCreateParams,
} from "@/lib/genie/openai-request";

let openAiClient: OpenAI | undefined;

function getOpenAiClient(): OpenAI {
  const apiKey = getOpenAiApiKey();

  if (!apiKey) {
    throw new GenieConfigurationError();
  }

  openAiClient ??= new OpenAI({ apiKey });
  return openAiClient;
}

export type GenerateGenieAnswerResult = {
  answer: string;
};

export async function generateGenieAnswer(
  message: string,
  knowledgeContext: string,
): Promise<GenerateGenieAnswerResult> {
  try {
    const client = getOpenAiClient();
    const response = await client.responses.create(
      buildGenieOpenAiCreateParams(message, knowledgeContext),
    );

    const answer = response.output_text?.trim();

    if (!answer) {
      throw new GenieGenerationError("OpenAI returned an empty response.");
    }

    return { answer };
  } catch (error) {
    if (error instanceof GenieConfigurationError || error instanceof GenieGenerationError) {
      throw error;
    }

    if (error instanceof APIError) {
      if (error.status === 429) {
        throw new GenieGenerationError(
          "Genie is receiving too many requests. Please try again shortly.",
          { code: "rate_limited", httpStatus: 429 },
        );
      }

      console.error("[genie] OpenAI API error:", error.status, error.message);
      throw new GenieGenerationError();
    }

    console.error("[genie] Unexpected generation error:", error);
    throw new GenieGenerationError();
  }
}

export type GenieStreamHandlers = {
  onFirstToken?: () => void;
  onDelta: (text: string) => void;
};

export async function streamGenieAnswer(
  message: string,
  knowledgeContext: string,
  handlers: GenieStreamHandlers,
): Promise<{ answer: string }> {
  let firstTokenSeen = false;
  let answer = "";

  try {
    const client = getOpenAiClient();
    const stream = await client.responses.create({
      ...buildGenieOpenAiCreateParams(message, knowledgeContext),
      stream: true,
    });

    for await (const event of stream) {
      if (event.type === "response.output_text.delta") {
        const delta = "delta" in event ? event.delta : "";
        if (typeof delta === "string" && delta.length > 0) {
          if (!firstTokenSeen) {
            firstTokenSeen = true;
            handlers.onFirstToken?.();
          }
          answer += delta;
          handlers.onDelta(delta);
        }
      }

      if (event.type === "response.failed" || event.type === "error") {
        throw new GenieGenerationError();
      }
    }

    const trimmed = answer.trim();
    if (!trimmed) {
      throw new GenieGenerationError("OpenAI returned an empty response.");
    }

    return { answer: trimmed };
  } catch (error) {
    if (error instanceof GenieConfigurationError || error instanceof GenieGenerationError) {
      throw error;
    }

    if (error instanceof APIError) {
      if (error.status === 429) {
        throw new GenieGenerationError(
          "Genie is receiving too many requests. Please try again shortly.",
          { code: "rate_limited", httpStatus: 429 },
        );
      }

      console.error("[genie] OpenAI API error:", error.status, error.message);
      throw new GenieGenerationError();
    }

    console.error("[genie] Unexpected streaming generation error:", error);
    throw new GenieGenerationError();
  }
}
