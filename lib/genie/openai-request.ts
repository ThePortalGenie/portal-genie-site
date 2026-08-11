import "server-only";

import type { ResponseCreateParamsNonStreaming } from "openai/resources/responses/responses";
import {
  GENIE_MAX_OUTPUT_TOKENS,
  getGenieModel,
} from "@/config/genie";
import { buildGenieSystemPrompt } from "@/lib/genie/system-prompt";

export function buildGenieUserInput(
  message: string,
  knowledgeContext: string,
): string {
  return [
    "Visitor question:",
    message,
    "",
    "Approved Knowledge Base context (use ONLY this for Portal Genie product facts):",
    "---",
    knowledgeContext,
    "---",
  ].join("\n");
}

/**
 * Central OpenAI Responses API parameters for Genie generation.
 * No tools, no web search, no temperature override — KB context only.
 */
export function buildGenieOpenAiCreateParams(
  message: string,
  knowledgeContext: string,
): ResponseCreateParamsNonStreaming {
  return {
    model: getGenieModel(),
    instructions: buildGenieSystemPrompt(),
    input: buildGenieUserInput(message, knowledgeContext),
    max_output_tokens: GENIE_MAX_OUTPUT_TOKENS,
    store: false,
    reasoning: {
      effort: "none",
    },
  };
}

/** Approximate total input character count sent to OpenAI (no content logged). */
export function estimateGenieInputChars(
  message: string,
  knowledgeContext: string,
): number {
  const params = buildGenieOpenAiCreateParams(message, knowledgeContext);
  const instructions =
    typeof params.instructions === "string" ? params.instructions : "";
  const input = typeof params.input === "string" ? params.input : "";
  return instructions.length + input.length;
}
