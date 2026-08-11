import Link from "next/link";
import type { GenieChatMessage } from "@/lib/genie/client-types";
import { links } from "@/config/links";
import { GenieAnswerTextWithMarkdown } from "@/components/genie/GenieAnswerText";
import { GenieSources } from "@/components/genie/GenieSources";

type GenieMessageProps = {
  message: GenieChatMessage;
};

export function GenieMessage({ message }: GenieMessageProps) {
  const isUser = message.role === "user";

  if (isUser) {
    return (
      <div className="flex justify-end">
        <div className="max-w-[88%] rounded-card rounded-br-sm bg-portal-blue px-4 py-3 text-sm leading-relaxed text-white">
          {message.content}
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-start">
      <div
        className={[
          "max-w-[95%] rounded-card rounded-bl-sm border px-4 py-3",
          message.isError
            ? "border-muted/30 bg-background text-portal-navy/85"
            : "border-muted/20 bg-surface text-portal-navy/90",
        ].join(" ")}
      >
        {message.isError ? (
          <div className="space-y-3 text-sm leading-relaxed">
            <p>{message.content}</p>
            <p className="text-portal-navy/70">
              You can still{" "}
              <Link href={links.contact} className="font-medium text-portal-blue underline underline-offset-2">
                contact our team
              </Link>{" "}
              or{" "}
              <Link href={links.bookDemo} className="font-medium text-portal-blue underline underline-offset-2">
                book a demo
              </Link>
              .
            </p>
          </div>
        ) : (
          <>
            <GenieAnswerTextWithMarkdown text={message.content} />
            {message.isInterrupted ? (
              <p className="mt-3 text-xs text-portal-navy/60">
                This answer may be incomplete.
              </p>
            ) : null}
            {message.sources && !message.isStreaming ? (
              <GenieSources sources={message.sources} />
            ) : null}
          </>
        )}
      </div>
    </div>
  );
}
