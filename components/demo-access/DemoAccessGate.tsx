"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import {
  DEMO_HONEYPOT_FIELD,
  DEMO_RESEND_COOLDOWN_SECONDS,
} from "@/config/demo-access";
import { GENIE_ACCOUNTING_SOFTWARE_OPTIONS } from "@/config/genie-enquiry";
import { site } from "@/config/site";

type FormState = {
  firstName: string;
  surname: string;
  company: string;
  phone: string;
  email: string;
  accountingSoftware: string;
  otherAccountingSoftware: string;
  website: string;
};

const EMPTY_FORM: FormState = {
  firstName: "",
  surname: "",
  company: "",
  phone: "",
  email: "",
  accountingSoftware: "",
  otherAccountingSoftware: "",
  website: "",
};

type View = "form" | "pending";

function fieldClassName(hasError: boolean): string {
  return [
    "w-full rounded-button border bg-white px-3 py-2.5 text-sm text-portal-navy placeholder:text-portal-navy/45 focus:outline-none focus:ring-2",
    hasError
      ? "border-red-400 focus:border-red-400 focus:ring-red-200"
      : "border-muted/30 focus:border-portal-blue/50 focus:ring-portal-blue/20",
  ].join(" ");
}

export function DemoAccessGate() {
  const [view, setView] = useState<View>("form");
  const [values, setValues] = useState<FormState>(EMPTY_FORM);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pendingEmail, setPendingEmail] = useState("");
  const [resendCooldown, setResendCooldown] = useState(0);
  const [resendMessage, setResendMessage] = useState<string | null>(null);
  const [isResending, setIsResending] = useState(false);

  useEffect(() => {
    if (resendCooldown <= 0) {
      return;
    }
    const timer = window.setInterval(() => {
      setResendCooldown((current) => Math.max(0, current - 1));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [resendCooldown]);

  const setField = useCallback((field: keyof FormState, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    setFieldErrors((current) => {
      if (!current[field]) {
        return current;
      }
      const next = { ...current };
      delete next[field];
      return next;
    });
    setFormError(null);
  }, []);

  const validateClient = (): boolean => {
    const errors: Partial<Record<keyof FormState, string>> = {};
    if (!values.firstName.trim()) {
      errors.firstName = "Required";
    }
    if (!values.surname.trim()) {
      errors.surname = "Required";
    }
    if (!values.company.trim()) {
      errors.company = "Required";
    }
    if (!values.phone.trim()) {
      errors.phone = "Required";
    }
    if (!values.email.trim()) {
      errors.email = "Required";
    }
    if (!values.accountingSoftware) {
      errors.accountingSoftware = "Required";
    }
    if (values.accountingSoftware === "Other" && !values.otherAccountingSoftware.trim()) {
      errors.otherAccountingSoftware = "Required";
    }
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (isSubmitting) {
      return;
    }
    if (!validateClient()) {
      setFormError("Please complete all required fields.");
      return;
    }

    setIsSubmitting(true);
    setFormError(null);

    try {
      const response = await fetch("/api/demo/request-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: values.firstName,
          surname: values.surname,
          company: values.company,
          phone: values.phone,
          email: values.email,
          accountingSoftware: values.accountingSoftware,
          otherAccountingSoftware:
            values.accountingSoftware === "Other" ? values.otherAccountingSoftware : undefined,
          [DEMO_HONEYPOT_FIELD]: values.website,
        }),
      });

      const data = (await response.json()) as {
        ok: boolean;
        email?: string;
        error?: string;
      };

      if (!response.ok || !data.ok) {
        setFormError(
          data.error ??
            "We're having trouble sending the verification email. Please try again.",
        );
        return;
      }

      setPendingEmail(data.email ?? values.email.trim().toLowerCase());
      setView("pending");
      setResendCooldown(DEMO_RESEND_COOLDOWN_SECONDS);
    } catch {
      setFormError("We're having trouble sending the verification email. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResend = async () => {
    if (isResending || resendCooldown > 0 || !pendingEmail) {
      return;
    }

    setIsResending(true);
    setResendMessage(null);

    try {
      const response = await fetch("/api/demo/resend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: pendingEmail }),
      });

      const data = (await response.json()) as { ok: boolean; error?: string };

      if (!response.ok || !data.ok) {
        setResendMessage(
          data.error ??
            "We're having trouble sending the verification email. Please try again.",
        );
        if (response.status === 429 && data.error?.includes("wait")) {
          const match = data.error.match(/(\d+)/);
          if (match) {
            setResendCooldown(Number.parseInt(match[1]!, 10));
          }
        }
        return;
      }

      setResendMessage("Verification email sent.");
      setResendCooldown(DEMO_RESEND_COOLDOWN_SECONDS);
    } catch {
      setResendMessage("We're having trouble sending the verification email. Please try again.");
    } finally {
      setIsResending(false);
    }
  };

  const handleChangeDetails = () => {
    setView("form");
    setResendMessage(null);
    setFormError(null);
  };

  return (
    <div className="flex min-h-[100dvh] flex-col bg-background">
      <div className="flex flex-1 items-center justify-center px-4 py-10 sm:px-6">
        <div className="w-full max-w-lg">
          <div className="mb-8 flex justify-center">
            <Link href="/" aria-label={site.logo.ariaLabel}>
              <Image
                src={site.logo.src}
                alt={site.logo.alt}
                width={site.logo.width}
                height={site.logo.height}
                className="h-auto max-h-12 w-auto object-contain"
                priority
              />
            </Link>
          </div>

          <div className="rounded-card border border-muted/20 bg-surface p-6 shadow-[0_8px_30px_-12px_rgba(17,33,54,0.18)] sm:p-8">
            {view === "form" ? (
              <>
                <h1 className="text-xl font-bold text-portal-navy sm:text-2xl">
                  Explore the Portal Genie Client Portal
                </h1>
                <p className="mt-3 text-sm leading-relaxed text-portal-navy/70">
                  Complete the form and verify your email to access the demo.
                </p>
                <p className="mt-2 text-sm leading-relaxed text-portal-navy/70">
                  See exactly what your clients will experience and{" "}
                  <strong className="font-semibold text-portal-navy">
                    how easy it is to brand your own Portal.
                  </strong>
                </p>

                <form className="mt-6 space-y-4" onSubmit={handleSubmit} noValidate>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block">
                      <span className="mb-1 block text-xs font-medium text-portal-navy/70">
                        First name *
                      </span>
                      <input
                        type="text"
                        autoComplete="given-name"
                        value={values.firstName}
                        onChange={(event) => setField("firstName", event.target.value)}
                        className={fieldClassName(Boolean(fieldErrors.firstName))}
                      />
                    </label>
                    <label className="block">
                      <span className="mb-1 block text-xs font-medium text-portal-navy/70">
                        Surname *
                      </span>
                      <input
                        type="text"
                        autoComplete="family-name"
                        value={values.surname}
                        onChange={(event) => setField("surname", event.target.value)}
                        className={fieldClassName(Boolean(fieldErrors.surname))}
                      />
                    </label>
                  </div>

                  <label className="block">
                    <span className="mb-1 block text-xs font-medium text-portal-navy/70">
                      Company *
                    </span>
                    <input
                      type="text"
                      autoComplete="organization"
                      value={values.company}
                      onChange={(event) => setField("company", event.target.value)}
                      className={fieldClassName(Boolean(fieldErrors.company))}
                    />
                  </label>

                  <label className="block">
                    <span className="mb-1 block text-xs font-medium text-portal-navy/70">
                      Phone *
                    </span>
                    <input
                      type="tel"
                      autoComplete="tel"
                      value={values.phone}
                      onChange={(event) => setField("phone", event.target.value)}
                      className={fieldClassName(Boolean(fieldErrors.phone))}
                    />
                  </label>

                  <label className="block">
                    <span className="mb-1 block text-xs font-medium text-portal-navy/70">
                      Email *
                    </span>
                    <input
                      type="email"
                      autoComplete="email"
                      value={values.email}
                      onChange={(event) => setField("email", event.target.value)}
                      className={fieldClassName(Boolean(fieldErrors.email))}
                    />
                  </label>

                  <label className="block">
                    <span className="mb-1 block text-xs font-medium text-portal-navy/70">
                      Accounting software *
                    </span>
                    <select
                      value={values.accountingSoftware}
                      onChange={(event) => setField("accountingSoftware", event.target.value)}
                      className={fieldClassName(Boolean(fieldErrors.accountingSoftware))}
                    >
                      <option value="">Select accounting software</option>
                      {GENIE_ACCOUNTING_SOFTWARE_OPTIONS.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </label>

                  {values.accountingSoftware === "Other" ? (
                    <label className="block">
                      <span className="mb-1 block text-xs font-medium text-portal-navy/70">
                        Other accounting software *
                      </span>
                      <input
                        type="text"
                        value={values.otherAccountingSoftware}
                        onChange={(event) =>
                          setField("otherAccountingSoftware", event.target.value)
                        }
                        className={fieldClassName(Boolean(fieldErrors.otherAccountingSoftware))}
                      />
                    </label>
                  ) : null}

                  <input
                    type="text"
                    name={DEMO_HONEYPOT_FIELD}
                    value={values.website}
                    onChange={(event) => setField("website", event.target.value)}
                    className="sr-only"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                  />

                  {formError ? (
                    <p className="text-sm text-red-600/90" role="alert">
                      {formError}
                    </p>
                  ) : null}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-button bg-portal-blue px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-portal-blue/90 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isSubmitting ? "Sending verification email..." : "Verify & View Demo"}
                  </button>

                  <p className="text-center text-xs text-portal-navy/55">
                    We&apos;ll email you a secure verification link to access the demo.
                  </p>
                </form>
              </>
            ) : (
              <>
                <h1 className="text-xl font-bold text-portal-navy sm:text-2xl">Check your email</h1>
                <p className="mt-4 text-sm text-portal-navy/70">
                  We&apos;ve sent a verification link to:
                </p>
                <p className="mt-1 text-sm font-semibold text-portal-navy">{pendingEmail}</p>
                <p className="mt-4 text-sm leading-relaxed text-portal-navy/70">
                  Click the link in the email to open the Portal Genie interactive demo.
                </p>
                <p className="mt-2 text-sm text-portal-navy/60">
                  The link will expire in 30 minutes.
                </p>

                {resendMessage ? (
                  <p
                    className={`mt-4 text-sm ${resendMessage.includes("sent") ? "text-portal-navy/70" : "text-red-600/90"}`}
                    role="status"
                  >
                    {resendMessage}
                  </p>
                ) : null}

                <button
                  type="button"
                  onClick={handleResend}
                  disabled={isResending || resendCooldown > 0}
                  className="mt-6 w-full rounded-button border border-muted/30 bg-white px-4 py-3 text-sm font-semibold text-portal-navy transition-colors hover:border-portal-blue/30 hover:bg-portal-blue/5 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isResending
                    ? "Sending..."
                    : resendCooldown > 0
                      ? `Resend verification email (${resendCooldown}s)`
                      : "Resend verification email"}
                </button>

                <button
                  type="button"
                  onClick={handleChangeDetails}
                  className="mt-3 w-full text-sm font-medium text-portal-blue hover:underline"
                >
                  Entered the wrong email? Change details
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
