/**
 * Development-only Genie request timing — no visitor content or secrets logged.
 */

export type GenieTimingMark =
  | "requestReceived"
  | "retrievalCompleted"
  | "contextBuilt"
  | "openAiStarted"
  | "firstTokenReceived"
  | "openAiCompleted"
  | "totalCompleted";

export type GenieTimingMetrics = {
  articleCount?: number;
  contextChars?: number;
  inputChars?: number;
};

export type GenieTimingReport = {
  retrievalMs: number | null;
  contextMs: number | null;
  openAiMs: number | null;
  firstTokenMs: number | null;
  totalMs: number | null;
  openAiCalled: boolean;
  articleCount?: number;
  contextChars?: number;
  inputChars?: number;
};

export type GenieTimingSnapshot = Partial<Record<GenieTimingMark, number>>;

export function createGenieTimer(): {
  mark: (name: GenieTimingMark) => void;
  log: (metrics?: GenieTimingMetrics) => GenieTimingReport | null;
} {
  const marks: GenieTimingSnapshot = {
    requestReceived: performance.now(),
  };

  return {
    mark(name: GenieTimingMark) {
      marks[name] = performance.now();
    },
    log(metrics?: GenieTimingMetrics): GenieTimingReport | null {
      const start = marks.requestReceived ?? 0;
      const report: GenieTimingReport = {
        retrievalMs:
          marks.retrievalCompleted != null
            ? Math.round(marks.retrievalCompleted - start)
            : null,
        contextMs:
          marks.contextBuilt != null && marks.retrievalCompleted != null
            ? Math.round(marks.contextBuilt - marks.retrievalCompleted)
            : null,
        openAiMs:
          marks.openAiCompleted != null && marks.openAiStarted != null
            ? Math.round(marks.openAiCompleted - marks.openAiStarted)
            : null,
        firstTokenMs:
          marks.firstTokenReceived != null && marks.openAiStarted != null
            ? Math.round(marks.firstTokenReceived - marks.openAiStarted)
            : null,
        totalMs:
          marks.totalCompleted != null
            ? Math.round(marks.totalCompleted - start)
            : null,
        openAiCalled: marks.openAiStarted != null,
        articleCount: metrics?.articleCount,
        contextChars: metrics?.contextChars,
        inputChars: metrics?.inputChars,
      };

      if (process.env.NODE_ENV === "development") {
        console.info("[genie:timing]", report);
      }

      return report;
    },
  };
}

export function attachDevTimingHeader(
  report: GenieTimingReport | null,
): HeadersInit | undefined {
  if (process.env.NODE_ENV !== "development" || report == null) {
    return undefined;
  }

  return {
    "X-Genie-Timing": JSON.stringify(report),
  };
}

function median(values: number[]): number {
  if (values.length === 0) {
    return 0;
  }

  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0
    ? Math.round((sorted[mid - 1] + sorted[mid]) / 2)
    : sorted[mid];
}

export function summariseTimingReports(
  reports: GenieTimingReport[],
): {
  min: GenieTimingReport;
  median: GenieTimingReport;
  max: GenieTimingReport;
} {
  const pick = (key: keyof GenieTimingReport) =>
    reports
      .map((report) => report[key])
      .filter((value): value is number => typeof value === "number");

  return {
    min: {
      retrievalMs: Math.min(...pick("retrievalMs")),
      contextMs: Math.min(...pick("contextMs")),
      openAiMs: Math.min(...pick("openAiMs")),
      firstTokenMs: Math.min(...pick("firstTokenMs")),
      totalMs: Math.min(...pick("totalMs")),
      openAiCalled: true,
    },
    median: {
      retrievalMs: median(pick("retrievalMs")),
      contextMs: median(pick("contextMs")),
      openAiMs: median(pick("openAiMs")),
      firstTokenMs: median(pick("firstTokenMs")),
      totalMs: median(pick("totalMs")),
      openAiCalled: true,
    },
    max: {
      retrievalMs: Math.max(...pick("retrievalMs")),
      contextMs: Math.max(...pick("contextMs")),
      openAiMs: Math.max(...pick("openAiMs")),
      firstTokenMs: Math.max(...pick("firstTokenMs")),
      totalMs: Math.max(...pick("totalMs")),
      openAiCalled: true,
    },
  };
}
