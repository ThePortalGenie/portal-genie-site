import { NextResponse } from "next/server";
import { isGenieEnabled, getOpenAiApiKey } from "@/config/genie";
import { buildKnowledgeContext } from "@/lib/genie/build-context";
import { GenieConfigurationError, GenieGenerationError } from "@/lib/genie/errors";
import {
  generateGenieAnswer,
  streamGenieAnswer,
} from "@/lib/genie/generate-response";
import { estimateGenieInputChars } from "@/lib/genie/openai-request";
import { getLowRelevanceAnswer } from "@/lib/genie/low-relevance-response";
import { retrieveKnowledge } from "@/lib/genie/retrieve-knowledge";
import {
  GENIE_SSE_HEADERS,
  encodeGenieSseEvent,
} from "@/lib/genie/stream-protocol";
import {
  attachDevTimingHeader,
  createGenieTimer,
  type GenieTimingReport,
} from "@/lib/genie/timing";
import type { GenieChatSuccessResponse, GenieErrorResponse } from "@/lib/genie/types";
import { validateGenieMessage } from "@/lib/genie/validate-message";

export const runtime = "nodejs";

function disabledResponse(): NextResponse<GenieErrorResponse> {
  return NextResponse.json(
    {
      error: "Genie is currently unavailable.",
      code: "genie_disabled",
    },
    { status: 503 },
  );
}

function notConfiguredResponse(): NextResponse<GenieErrorResponse> {
  return NextResponse.json(
    {
      error: "Genie is currently unavailable.",
      code: "genie_not_configured",
    },
    { status: 503 },
  );
}

function jsonWithDevTiming<T>(
  body: T,
  init: ResponseInit | undefined,
  timingReport: GenieTimingReport | null,
): NextResponse<T> {
  const timingHeaders = attachDevTimingHeader(timingReport);
  const headers = new Headers(init?.headers);

  if (timingHeaders) {
    for (const [key, value] of Object.entries(timingHeaders)) {
      headers.set(key, value);
    }
  }

  return NextResponse.json(body, {
    ...init,
    headers,
  });
}

function createStreamingResponse(options: {
  message: string;
  knowledgeContext: string;
  sources: GenieChatSuccessResponse["sources"];
  timer: ReturnType<typeof createGenieTimer>;
  metrics: {
    articleCount: number;
    contextChars: number;
    inputChars: number;
  };
}): Response {
  const { message, knowledgeContext, sources, timer, metrics } = options;
  const encoder = new TextEncoder();
  let interrupted = false;

  const stream = new ReadableStream({
    async start(controller) {
      const send = (event: string, data: unknown) => {
        controller.enqueue(encoder.encode(encodeGenieSseEvent(event, data)));
      };

      try {
        send("meta", { sources });
        timer.mark("openAiStarted");

        await streamGenieAnswer(message, knowledgeContext, {
          onFirstToken: () => {
            timer.mark("firstTokenReceived");
          },
          onDelta: (text) => {
            interrupted = true;
            send("delta", { text });
          },
        });

        timer.mark("openAiCompleted");
        send("done", {});
      } catch (error) {
        if (error instanceof GenieConfigurationError) {
          send("error", {
            code: "genie_not_configured",
            message: "Genie is temporarily unavailable. You can still contact our team.",
            interrupted,
          });
        } else if (error instanceof GenieGenerationError) {
          send("error", {
            code: error.code,
            message:
              error.httpStatus === 429
                ? error.message
                : interrupted
                  ? "Genie's response was interrupted. Please try again."
                  : "Sorry, I couldn't answer that right now. Please try again.",
            interrupted,
          });
        } else {
          send("error", {
            code: "internal_error",
            message: interrupted
              ? "Genie's response was interrupted. Please try again."
              : "Sorry, I couldn't answer that right now. Please try again.",
            interrupted,
          });
        }
      } finally {
        timer.mark("totalCompleted");
        timer.log(metrics);
        controller.close();
      }
    },
  });

  return new Response(stream, { headers: GENIE_SSE_HEADERS });
}

export async function POST(
  request: Request,
): Promise<NextResponse<GenieChatSuccessResponse | GenieErrorResponse> | Response> {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      {
        error: "Invalid JSON body.",
        code: "invalid_request",
      },
      { status: 400 },
    );
  }

  const validation = validateGenieMessage(body);

  if (!validation.ok) {
    return NextResponse.json(
      {
        error: validation.error,
        code: validation.code,
      },
      { status: 400 },
    );
  }

  if (!isGenieEnabled()) {
    return disabledResponse();
  }

  const message = validation.message;
  const wantsStream = validation.stream;
  const timer = createGenieTimer();

  try {
    const retrieval = retrieveKnowledge(message);
    timer.mark("retrievalCompleted");

    if (!retrieval.relevant) {
      timer.mark("totalCompleted");
      const timingReport = timer.log();

      const response: GenieChatSuccessResponse = {
        answer: getLowRelevanceAnswer(),
        sources: [],
      };

      return jsonWithDevTiming(response, undefined, timingReport);
    }

    if (!getOpenAiApiKey()) {
      timer.mark("totalCompleted");
      timer.log();
      return notConfiguredResponse();
    }

    const sources = retrieval.articles.map((article) => ({
      title: article.title,
      url: article.url,
    }));

    const knowledgeContext = buildKnowledgeContext(retrieval.articles);
    timer.mark("contextBuilt");

    const metrics = {
      articleCount: retrieval.articles.length,
      contextChars: knowledgeContext.length,
      inputChars: estimateGenieInputChars(message, knowledgeContext),
    };

    if (wantsStream) {
      return createStreamingResponse({
        message,
        knowledgeContext,
        sources,
        timer,
        metrics,
      });
    }

    timer.mark("openAiStarted");
    const { answer } = await generateGenieAnswer(message, knowledgeContext);
    timer.mark("openAiCompleted");

    const response: GenieChatSuccessResponse = {
      answer,
      sources,
    };

    timer.mark("totalCompleted");
    const timingReport = timer.log(metrics);

    return jsonWithDevTiming(response, undefined, timingReport);
  } catch (error) {
    timer.mark("totalCompleted");
    const timingReport = timer.log();

    if (error instanceof GenieConfigurationError) {
      return notConfiguredResponse();
    }

    if (error instanceof GenieGenerationError) {
      if (error.httpStatus === 429) {
        return jsonWithDevTiming(
          {
            error: error.message,
            code: error.code,
          },
          { status: 429 },
          timingReport,
        );
      }

      return jsonWithDevTiming(
        {
          error: "Genie is temporarily unavailable. Please try again later.",
          code: error.code,
        },
        { status: error.httpStatus },
        timingReport,
      );
    }

    console.error("[genie] Unexpected chat route error:", error);

    return jsonWithDevTiming(
      {
        error: "An unexpected error occurred.",
        code: "internal_error",
      },
      { status: 500 },
      timingReport,
    );
  }
}
