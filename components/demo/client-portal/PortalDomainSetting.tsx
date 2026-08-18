"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy, Info } from "lucide-react";
import { CUSTOM_DOMAIN_SUBDOMAIN_OPTIONS } from "@/lib/demo/client-portal/constants";
import { useDemoPortal } from "@/lib/demo/client-portal/context";
import type { CustomDomainSubdomain } from "@/lib/demo/client-portal/types";

const COPY_FEEDBACK_MS = 2000;
const VERIFY_DELAY_MS = 1500;

function useCopyFeedback() {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const copyResetRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (copyResetRef.current) {
        clearTimeout(copyResetRef.current);
      }
    };
  }, []);

  const copy = async (field: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedField(field);
      if (copyResetRef.current) {
        clearTimeout(copyResetRef.current);
      }
      copyResetRef.current = setTimeout(() => {
        setCopiedField(null);
        copyResetRef.current = null;
      }, COPY_FEEDBACK_MS);
    } catch {
      // Clipboard unavailable.
    }
  };

  return { copiedField, copy };
}

export function PortalDomainSetting() {
  const { state, dispatch } = useDemoPortal();
  const { copiedField, copy } = useCopyFeedback();

  const domainName = state.customDomainName.trim();
  const canGenerateDns = domainName.length > 0;
  const fullDomain =
    domainName.length > 0 ? `${state.customDomainSubdomain}.${domainName}` : null;

  useEffect(() => {
    if (state.customDomainVerificationStatus !== "checking") {
      return;
    }
    const timer = window.setTimeout(() => {
      dispatch({ type: "SET_CUSTOM_DOMAIN_VERIFICATION_STATUS", status: "verified" });
    }, VERIFY_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [state.customDomainVerificationStatus, dispatch]);

  const handleVerify = () => {
    if (!state.customDomainDnsGenerated) {
      return;
    }
    dispatch({ type: "SET_CUSTOM_DOMAIN_VERIFICATION_STATUS", status: "checking" });
  };

  return (
    <article className="rounded-lg border border-muted/20 bg-background/40 p-4">
      <h4 className="text-sm font-semibold text-portal-navy">Client Portal Domain</h4>
      <p className="mt-1.5 text-xs leading-relaxed text-portal-navy/65">
        Use your own domain for the Client Portal, for example portal.yourcompany.com.
      </p>

      <div className="mt-4 space-y-3">
        <label className="block">
          <span className="mb-1 block text-xs font-medium text-portal-navy/70">Subdomain</span>
          <select
            value={state.customDomainSubdomain}
            onChange={(event) =>
              dispatch({
                type: "SET_CUSTOM_DOMAIN_SUBDOMAIN",
                subdomain: event.target.value as CustomDomainSubdomain,
              })
            }
            className="w-full rounded-lg border border-muted/30 bg-white px-3 py-2 text-sm text-portal-navy/85"
          >
            {CUSTOM_DOMAIN_SUBDOMAIN_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-1 block text-xs font-medium text-portal-navy/70">Domain</span>
          <input
            type="text"
            value={state.customDomainName}
            onChange={(event) =>
              dispatch({ type: "SET_CUSTOM_DOMAIN_NAME", name: event.target.value })
            }
            placeholder="yourcompany.com"
            className="w-full rounded-lg border border-muted/30 px-3 py-2 text-sm"
          />
        </label>

        {fullDomain ? (
          <p className="text-[11px] text-portal-navy/55">
            Example address:{" "}
            <span className="font-medium text-portal-navy/75">{fullDomain}</span>
          </p>
        ) : null}

        <button
          type="button"
          disabled={!canGenerateDns}
          onClick={() => dispatch({ type: "GENERATE_CUSTOM_DOMAIN_DNS" })}
          className="w-full rounded-lg border border-muted/30 px-3 py-2 text-sm font-medium text-portal-navy/80 transition-colors hover:border-portal-blue/30 hover:bg-portal-blue/5 disabled:cursor-not-allowed disabled:opacity-45"
        >
          Generate DNS Records
        </button>
      </div>

      {state.customDomainDnsGenerated && state.customDomainDnsRecord ? (
        <div className="mt-4 space-y-3 border-t border-muted/15 pt-4">
          <p className="text-xs font-semibold text-portal-navy">DNS Records</p>
          <div className="rounded-lg border border-muted/20 bg-muted/5 p-3 text-xs">
            <div className="grid grid-cols-[3.5rem_1fr] gap-x-3 gap-y-2">
              <span className="font-medium text-portal-navy/60">Type</span>
              <span className="text-portal-navy/85">{state.customDomainDnsRecord.type}</span>
              <span className="font-medium text-portal-navy/60">Host</span>
              <span className="text-portal-navy/85">{state.customDomainDnsRecord.host}</span>
              <span className="font-medium text-portal-navy/60">Value</span>
              <div className="flex min-w-0 items-center gap-2">
                <span className="min-w-0 truncate text-portal-navy/85">
                  {state.customDomainDnsRecord.value}
                </span>
                <button
                  type="button"
                  onClick={() => copy("dns-value", state.customDomainDnsRecord!.value)}
                  className="inline-flex shrink-0 items-center gap-1 rounded border border-muted/30 bg-white px-2 py-1 text-[10px] font-medium text-portal-navy/75 hover:border-portal-blue/30"
                >
                  {copiedField === "dns-value" ? (
                    <>
                      <Check className="h-3 w-3 text-portal-blue" aria-hidden="true" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" aria-hidden="true" />
                      Copy
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleVerify}
            disabled={state.customDomainVerificationStatus === "checking"}
            className="w-full rounded-lg border border-muted/30 px-3 py-2 text-sm font-medium text-portal-navy/80 transition-colors hover:border-portal-blue/30 hover:bg-portal-blue/5 disabled:cursor-not-allowed disabled:opacity-45"
          >
            {state.customDomainVerificationStatus === "checking"
              ? "Checking…"
              : state.customDomainVerificationStatus === "verified"
                ? "✓ Domain verified"
                : "Verify Custom Domain"}
          </button>

          {state.customDomainVerificationStatus === "verified" ? (
            <p className="text-[11px] text-portal-navy/50">
              Demo: domain verification simulated for this interactive preview.
            </p>
          ) : null}
        </div>
      ) : null}

      <div className="mt-4 flex items-start gap-2 rounded-lg border border-portal-blue/15 bg-portal-blue/5 px-3 py-2.5">
        <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-portal-blue/70" aria-hidden="true" />
        <p className="text-[11px] leading-relaxed text-portal-navy/70">
          Your Client Portal Link remains the same when using a custom domain. Visitors opening
          your portal will see your custom domain instead.
        </p>
      </div>
    </article>
  );
}
