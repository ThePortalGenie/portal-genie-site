/**
 * Central Genie configuration.
 *
 * Vercel setup (Preview and/or Production):
 * - GENIE_ENABLED=true   — master switch (literal "true" only)
 * - OPENAI_API_KEY       — server-side only; never use NEXT_PUBLIC_ for this
 * - GENIE_MODEL          — optional model override
 *
 * After adding or changing variables in the Vercel dashboard, redeploy so
 * serverless functions pick up the new values.
 */

/** Default model for low-volume website knowledge Q&A. Override via GENIE_MODEL. */
export const GENIE_DEFAULT_MODEL = "gpt-4.1-mini";

/** Maximum visitor message length (characters). */
export const GENIE_MAX_MESSAGE_LENGTH = 1000;

/** Maximum Knowledge Base articles sent to OpenAI per request. */
export const GENIE_MAX_RETRIEVED_ARTICLES = 3;

/** Approximate upper bound for model output (~50–200 words). */
export const GENIE_MAX_OUTPUT_TOKENS = 300;

/** Minimum relevance score required before calling OpenAI. */
export const GENIE_MIN_RELEVANCE_SCORE = 4;

/** Total character budget for retrieved article context sent to OpenAI. */
export const GENIE_MAX_CONTEXT_CHARS = 12_000;

/**
 * Genie master switch. Only the literal string "true" (case-insensitive) enables Genie.
 * Defaults to OFF when unset or any other value.
 */
export function isGenieEnabled(): boolean {
  return process.env.GENIE_ENABLED?.trim().toLowerCase() === "true";
}

/** Resolved model ID — falls back to GENIE_DEFAULT_MODEL when GENIE_MODEL is unset. */
export function getGenieModel(): string {
  const model = process.env.GENIE_MODEL?.trim();
  return model || GENIE_DEFAULT_MODEL;
}

/** Server-side OpenAI API key. Never expose to client code. */
export function getOpenAiApiKey(): string | undefined {
  const key = process.env.OPENAI_API_KEY?.trim();
  return key || undefined;
}
