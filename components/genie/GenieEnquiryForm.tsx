"use client";

import {
  GENIE_ACCOUNTING_SOFTWARE_OPTIONS,
  GENIE_ENQUIRY_FIELD_LIMITS,
  GENIE_ENQUIRY_INTRO,
  type GenieEnquiryType,
} from "@/config/genie-enquiry";

export type GenieEnquiryFormState = {
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  phone: string;
  accountingSoftware: string;
  message: string;
  website: string;
};

export const EMPTY_ENQUIRY_FORM: GenieEnquiryFormState = {
  firstName: "",
  lastName: "",
  company: "",
  email: "",
  phone: "",
  accountingSoftware: "",
  message: "",
  website: "",
};

const ENQUIRY_FORM_ID = "genie-enquiry-form";

type GenieEnquiryFormProps = {
  enquiryType: GenieEnquiryType;
  values: GenieEnquiryFormState;
  fieldErrors: Partial<Record<keyof GenieEnquiryFormState, string>>;
  formError: string | null;
  isSubmitting: boolean;
  onChange: (field: keyof GenieEnquiryFormState, value: string) => void;
  onSubmit: () => void;
  onBack: () => void;
};

function isCompanyRequired(enquiryType: GenieEnquiryType): boolean {
  return enquiryType === "sales" || enquiryType === "callback";
}

function isPhoneRequired(enquiryType: GenieEnquiryType): boolean {
  return enquiryType === "callback";
}

function fieldClassName(hasError: boolean): string {
  return [
    "w-full rounded-button border bg-background px-3 py-2 text-sm text-portal-navy placeholder:text-portal-navy/45 focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-60",
    hasError
      ? "border-red-400 focus:border-red-400 focus:ring-red-200"
      : "border-muted/30 focus:border-portal-blue/50 focus:ring-portal-blue/20",
  ].join(" ");
}

export function GenieEnquiryForm({
  enquiryType,
  values,
  fieldErrors,
  formError,
  isSubmitting,
  onChange,
  onSubmit,
  onBack,
}: GenieEnquiryFormProps) {
  const companyRequired = isCompanyRequired(enquiryType);
  const phoneRequired = isPhoneRequired(enquiryType);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isSubmitting) {
      onSubmit();
    }
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col border-t border-muted/15 bg-surface">
      <div className="flex shrink-0 items-start justify-between gap-3 px-4 pb-3 pt-3">
        <div>
          <p className="text-sm font-semibold text-portal-navy">
            {enquiryType === "sales"
              ? "Contact sales"
              : enquiryType === "callback"
                ? "Request a callback"
                : "Support"}
          </p>
          <p className="mt-1 text-xs leading-relaxed text-portal-navy/65">
            {GENIE_ENQUIRY_INTRO[enquiryType]}
          </p>
        </div>
        <button
          type="button"
          onClick={onBack}
          disabled={isSubmitting}
          className="shrink-0 text-xs font-medium text-portal-blue underline underline-offset-2 disabled:opacity-60"
        >
          Back
        </button>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 pb-4">
        <form
          id={ENQUIRY_FORM_ID}
          onSubmit={handleSubmit}
          className="space-y-3"
          noValidate
        >
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label htmlFor="genie-enquiry-first-name" className="mb-1 block text-xs font-medium text-portal-navy">
                First name <span className="text-portal-navy/55">*</span>
              </label>
              <input
                id="genie-enquiry-first-name"
                type="text"
                autoComplete="given-name"
                required
                maxLength={GENIE_ENQUIRY_FIELD_LIMITS.firstName}
                value={values.firstName}
                disabled={isSubmitting}
                onChange={(event) => onChange("firstName", event.target.value)}
                className={fieldClassName(Boolean(fieldErrors.firstName))}
              />
              {fieldErrors.firstName ? (
                <p className="mt-1 text-xs text-red-600">{fieldErrors.firstName}</p>
              ) : null}
            </div>

            <div>
              <label htmlFor="genie-enquiry-last-name" className="mb-1 block text-xs font-medium text-portal-navy">
                Last name <span className="text-portal-navy/55">*</span>
              </label>
              <input
                id="genie-enquiry-last-name"
                type="text"
                autoComplete="family-name"
                required
                maxLength={GENIE_ENQUIRY_FIELD_LIMITS.lastName}
                value={values.lastName}
                disabled={isSubmitting}
                onChange={(event) => onChange("lastName", event.target.value)}
                className={fieldClassName(Boolean(fieldErrors.lastName))}
              />
              {fieldErrors.lastName ? (
                <p className="mt-1 text-xs text-red-600">{fieldErrors.lastName}</p>
              ) : null}
            </div>
          </div>

          <div>
            <label htmlFor="genie-enquiry-company" className="mb-1 block text-xs font-medium text-portal-navy">
              Company {companyRequired ? <span className="text-portal-navy/55">*</span> : null}
            </label>
            <input
              id="genie-enquiry-company"
              type="text"
              autoComplete="organization"
              required={companyRequired}
              maxLength={GENIE_ENQUIRY_FIELD_LIMITS.company}
              value={values.company}
              disabled={isSubmitting}
              onChange={(event) => onChange("company", event.target.value)}
              className={fieldClassName(Boolean(fieldErrors.company))}
            />
            {fieldErrors.company ? (
              <p className="mt-1 text-xs text-red-600">{fieldErrors.company}</p>
            ) : null}
          </div>

          <div>
            <label htmlFor="genie-enquiry-email" className="mb-1 block text-xs font-medium text-portal-navy">
              Email <span className="text-portal-navy/55">*</span>
            </label>
            <input
              id="genie-enquiry-email"
              type="email"
              autoComplete="email"
              required
              maxLength={GENIE_ENQUIRY_FIELD_LIMITS.email}
              value={values.email}
              disabled={isSubmitting}
              onChange={(event) => onChange("email", event.target.value)}
              className={fieldClassName(Boolean(fieldErrors.email))}
            />
            {fieldErrors.email ? (
              <p className="mt-1 text-xs text-red-600">{fieldErrors.email}</p>
            ) : null}
          </div>

          <div>
            <label htmlFor="genie-enquiry-phone" className="mb-1 block text-xs font-medium text-portal-navy">
              Phone {phoneRequired ? <span className="text-portal-navy/55">*</span> : null}
            </label>
            <input
              id="genie-enquiry-phone"
              type="tel"
              autoComplete="tel"
              required={phoneRequired}
              maxLength={GENIE_ENQUIRY_FIELD_LIMITS.phone}
              value={values.phone}
              disabled={isSubmitting}
              onChange={(event) => onChange("phone", event.target.value)}
              className={fieldClassName(Boolean(fieldErrors.phone))}
            />
            {fieldErrors.phone ? (
              <p className="mt-1 text-xs text-red-600">{fieldErrors.phone}</p>
            ) : null}
          </div>

          <div>
            <label htmlFor="genie-enquiry-accounting" className="mb-1 block text-xs font-medium text-portal-navy">
              Accounting software
            </label>
            <select
              id="genie-enquiry-accounting"
              value={values.accountingSoftware}
              disabled={isSubmitting}
              onChange={(event) => onChange("accountingSoftware", event.target.value)}
              className={fieldClassName(false)}
            >
              <option value="">Select (optional)</option>
              {GENIE_ACCOUNTING_SOFTWARE_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="genie-enquiry-message" className="mb-1 block text-xs font-medium text-portal-navy">
              How can we help?
            </label>
            <textarea
              id="genie-enquiry-message"
              rows={3}
              maxLength={GENIE_ENQUIRY_FIELD_LIMITS.message}
              value={values.message}
              disabled={isSubmitting}
              onChange={(event) => onChange("message", event.target.value)}
              className={fieldClassName(Boolean(fieldErrors.message))}
            />
            {fieldErrors.message ? (
              <p className="mt-1 text-xs text-red-600">{fieldErrors.message}</p>
            ) : null}
          </div>

          <div className="hidden" aria-hidden="true">
            <label htmlFor="genie-enquiry-website">Website</label>
            <input
              id="genie-enquiry-website"
              tabIndex={-1}
              autoComplete="off"
              value={values.website}
              onChange={(event) => onChange("website", event.target.value)}
            />
          </div>
        </form>
      </div>

      <div className="shrink-0 border-t border-muted/15 bg-surface px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        {formError ? (
          <p className="mb-3 text-sm text-red-600" role="alert">
            {formError}
          </p>
        ) : null}
        <button
          type="submit"
          form={ENQUIRY_FORM_ID}
          disabled={isSubmitting}
          className="inline-flex w-full items-center justify-center rounded-button bg-portal-blue px-4 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-portal-blue/90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Sending..." : "Submit"}
        </button>
      </div>
    </div>
  );
}
