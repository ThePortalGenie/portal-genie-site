"use client";

import { useEffect, useRef, useState } from "react";
import { BookOpen, Check, ChevronDown, Copy, ShieldCheck } from "lucide-react";
import { DEMO_CLIENT_PORTAL_LINK } from "@/lib/demo/client-portal/constants";

const COPY_FEEDBACK_MS = 2000;

const HELP_SECTIONS = [
  {
    title: "Add it to your website",
    body: "Ask your website administrator to use this URL as the destination for your Client Login button.",
  },
  {
    title: "Share it directly",
    body: "Copy the link and send it to a client by email, message or another communication channel.",
  },
  {
    title: "How clients sign in",
    body: "Clients follow the link and securely verify their identity using a one-time password (OTP).",
  },
] as const;

export function ClientPortalLinkCard() {
  const [copied, setCopied] = useState(false);
  const [helpExpanded, setHelpExpanded] = useState(false);
  const copyResetRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (copyResetRef.current) {
        clearTimeout(copyResetRef.current);
      }
    };
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(DEMO_CLIENT_PORTAL_LINK);
      setCopied(true);
      if (copyResetRef.current) {
        clearTimeout(copyResetRef.current);
      }
      copyResetRef.current = setTimeout(() => {
        setCopied(false);
        copyResetRef.current = null;
      }, COPY_FEEDBACK_MS);
    } catch {
      // Clipboard unavailable — no modal or alert per requirements.
    }
  };

  return (
    <div>
      <p className="text-xs leading-relaxed text-portal-navy/70">
        Share this link with clients or add it to a Client Login button on your website.
        Clients use the link to securely access their portal using a one-time password (OTP).
      </p>

      <div className="mt-3 flex min-w-0 gap-2">
        <input
          type="text"
          readOnly
          value={DEMO_CLIENT_PORTAL_LINK}
          aria-label="Client Portal Link URL"
          className="min-w-0 flex-1 truncate rounded-lg border border-muted/30 bg-white px-3 py-2 text-xs text-portal-navy/85"
          onFocus={(event) => event.target.select()}
        />
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-muted/30 bg-white px-3 py-2 text-xs font-medium text-portal-navy/80 transition-colors hover:border-portal-blue/30 hover:text-portal-blue"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-portal-blue" aria-hidden="true" />
              Copied
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" aria-hidden="true" />
              Copy
            </>
          )}
        </button>
      </div>

      <p className="mt-2.5 flex items-center gap-1.5 text-[11px] text-portal-navy/55">
        <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-portal-blue/70" aria-hidden="true" />
        Secure OTP login · No password required
      </p>

      <div className="mt-3 rounded-lg border border-muted/25 bg-white">
        <button
          type="button"
          aria-expanded={helpExpanded}
          onClick={() => setHelpExpanded((open) => !open)}
          className={`flex w-full cursor-pointer items-center justify-between gap-2 bg-white px-3.5 py-3 text-left text-xs font-medium text-portal-navy/75 transition-colors hover:bg-[#fafafa] ${
            helpExpanded ? "rounded-t-lg border-b border-muted/20" : "rounded-lg"
          }`}
        >
          <span className="flex min-w-0 items-center gap-1.5">
            <BookOpen className="h-3.5 w-3.5 shrink-0 text-portal-blue/70" aria-hidden="true" />
            How to use your portal link
          </span>
          <ChevronDown
            className={`h-3.5 w-3.5 shrink-0 text-portal-navy/45 transition-transform duration-200 motion-reduce:transition-none ${
              helpExpanded ? "rotate-180" : ""
            }`}
            aria-hidden="true"
          />
        </button>

        {helpExpanded ? (
          <ul className="space-y-2.5 rounded-b-lg bg-white px-3.5 pb-3.5 pt-3">
            {HELP_SECTIONS.map((section) => (
              <li key={section.title}>
                <p className="text-[11px] font-semibold uppercase tracking-wide text-portal-navy/65">
                  {section.title}
                </p>
                <p className="mt-0.5 text-xs leading-relaxed text-portal-navy/70">{section.body}</p>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
}
