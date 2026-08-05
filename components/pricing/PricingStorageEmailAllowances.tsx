"use client";

import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { Check, Cloud, Info, Mail, Plus } from "lucide-react";
import {
  formatEmailAllowanceLabel,
  formatStorageIncludedLabel,
  getAdditionalStorageCopy,
  getEmailBundleAddOnCopy,
  planAllowances,
  pricingPlans,
  storageEmailAllowances,
  type CurrencyCode,
} from "@/content/pricing";

type PricingStorageEmailAllowancesProps = {
  currency: CurrencyCode;
};

type FeatureRow = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  premium: ReactNode;
  advanced: ReactNode;
  highlighted?: boolean;
};

const headerPad = "px-5 py-3 lg:px-6 lg:py-3.5";
const cellPad = "px-5 py-5 lg:px-6 lg:py-6";
const addOnPad = "px-5 py-4 lg:px-6";

function FeatureLabel({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-2.5">
      <span className="mt-0.5 inline-flex size-7 shrink-0 items-center justify-center rounded-lg bg-portal-blue/[0.08] text-portal-blue">
        <Icon className="size-3.5" strokeWidth={2} aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <p className="text-base font-semibold leading-snug text-portal-navy">
          {title}
        </p>
        <p className="mt-0.5 text-[13px] leading-snug text-portal-navy/45">
          {description}
        </p>
      </div>
    </div>
  );
}

function IncludedValue({ children }: { children: string }) {
  return (
    <div className="flex items-center gap-2">
      <Check
        className="size-4 shrink-0 text-portal-teal"
        strokeWidth={2.5}
        aria-hidden="true"
      />
      <p className="text-base font-semibold leading-snug text-portal-navy">
        {children}
      </p>
    </div>
  );
}

function UnavailableValue({ note }: { note?: string }) {
  return (
    <div>
      <p className="text-base font-medium leading-none text-muted" aria-hidden="true">
        —
      </p>
      {note ? (
        <p className="mt-1.5 text-[13px] leading-snug text-portal-navy/45">
          {note}
        </p>
      ) : null}
      <span className="sr-only">
        {storageEmailAllowances.premiumNotIncluded}
        {note ? `. ${note}` : ""}
      </span>
    </div>
  );
}

function AddOnCell({
  label,
  priceLine,
}: {
  label: string;
  priceLine: string;
}) {
  return (
    <div>
      <p className="text-[10px] font-medium uppercase tracking-[0.08em] text-portal-blue/80">
        {label}
      </p>
      <p className="mt-1 text-base font-semibold leading-snug text-portal-navy">
        {priceLine}
      </p>
    </div>
  );
}

function MobileFeatureCard({
  icon,
  title,
  description,
  premium,
  advanced,
  highlighted = false,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  premium: ReactNode;
  advanced: ReactNode;
  highlighted?: boolean;
}) {
  return (
    <article
      className={[
        "border-t border-muted/10 px-4 py-4 first:border-t-0 sm:px-5",
        highlighted ? "bg-portal-blue/[0.04]" : "bg-surface",
      ].join(" ")}
    >
      <FeatureLabel icon={icon} title={title} description={description} />
      <div className="mt-4 space-y-3.5">
        {pricingPlans.map((plan) => (
          <div key={plan.id}>
            <p className="text-[10px] font-medium uppercase tracking-[0.08em] text-portal-navy/40">
              {plan.name}
            </p>
            <div className="mt-1">
              {plan.id === "premium" ? premium : advanced}
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}

export function PricingStorageEmailAllowances({
  currency,
}: PricingStorageEmailAllowancesProps) {
  const premiumAllowances = planAllowances.premium;
  const advancedAllowances = planAllowances.advanced;
  const additionalStorage = getAdditionalStorageCopy(currency);
  const emailBundleAddOn = getEmailBundleAddOnCopy(currency);

  const premiumStorage = formatStorageIncludedLabel(
    premiumAllowances.storageIncludedGb,
  );
  const advancedStorage = formatStorageIncludedLabel(
    advancedAllowances.storageIncludedGb,
  );
  const advancedEmail =
    advancedAllowances.emailAllowancePerMonth != null
      ? formatEmailAllowanceLabel(advancedAllowances.emailAllowancePerMonth)
      : null;

  const rows: FeatureRow[] = [
    {
      id: "storage",
      title: storageEmailAllowances.storageHeading,
      description: storageEmailAllowances.storageDescription,
      icon: Cloud,
      premium: <IncludedValue>{premiumStorage}</IncludedValue>,
      advanced: <IncludedValue>{advancedStorage}</IncludedValue>,
    },
    {
      id: "email-campaigns",
      title: storageEmailAllowances.emailHeading,
      description: storageEmailAllowances.emailDescription,
      icon: Mail,
      premium: (
        <UnavailableValue note={storageEmailAllowances.premiumEmailNote} />
      ),
      advanced: advancedEmail ? (
        <IncludedValue>{advancedEmail}</IncludedValue>
      ) : null,
    },
    {
      id: "add-ons",
      title: storageEmailAllowances.addOnsRowLabel,
      description: storageEmailAllowances.addOnsDescription,
      icon: Plus,
      highlighted: true,
      premium: additionalStorage ? (
        <AddOnCell
          label={storageEmailAllowances.additionalStorageLabel}
          priceLine={additionalStorage}
        />
      ) : null,
      advanced: emailBundleAddOn ? (
        <AddOnCell
          label={storageEmailAllowances.additionalEmailsLabel}
          priceLine={emailBundleAddOn}
        />
      ) : null,
    },
  ];

  return (
    <section
      className="mx-auto mt-6 max-w-5xl lg:max-w-6xl"
      aria-labelledby="storage-email-allowances-heading"
    >
      <div className="text-left">
        <h2
          id="storage-email-allowances-heading"
          className="text-lg font-semibold tracking-tight text-portal-navy md:text-xl"
        >
          {storageEmailAllowances.title}
        </h2>
        <p className="mt-1 text-sm leading-snug text-portal-navy/65">
          {storageEmailAllowances.description}
        </p>
      </div>

      <div className="mt-5 overflow-hidden rounded-[1.5rem] border border-muted/20 bg-surface shadow-[0_16px_40px_-16px_rgba(0,119,190,0.12)] ring-1 ring-portal-blue/8">
        <table className="hidden w-full table-fixed border-collapse text-left md:table">
          <caption className="sr-only">
            Storage and email allowances compared across Premium and Advanced
            plans
          </caption>
          <colgroup>
            <col className="w-[40%]" />
            <col className="w-[30%]" />
            <col className="w-[30%]" />
          </colgroup>
          <thead>
            <tr className="border-b border-muted/10 bg-background/70">
              <th scope="col" className={`${headerPad} align-middle`}>
                <p className="text-[10px] font-medium uppercase tracking-[0.08em] text-portal-navy/40">
                  {storageEmailAllowances.featureColumnLabel}
                </p>
              </th>
              {pricingPlans.map((plan) => (
                <th
                  key={plan.id}
                  scope="col"
                  className={`${headerPad} align-middle`}
                >
                  <p className="text-[10px] font-medium uppercase tracking-[0.08em] text-portal-blue/70">
                    {plan.name}
                  </p>
                  <p className="mt-0.5 text-lg font-semibold tracking-tight text-portal-navy">
                    {plan.name}
                  </p>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const pad = row.highlighted ? addOnPad : cellPad;

              return (
                <tr
                  key={row.id}
                  className={[
                    "border-b border-muted/[0.08] last:border-b-0",
                    row.highlighted ? "bg-portal-blue/[0.035]" : "bg-surface",
                  ].join(" ")}
                >
                  <th scope="row" className={`${pad} align-middle font-normal`}>
                    <FeatureLabel
                      icon={row.icon}
                      title={row.title}
                      description={row.description}
                    />
                  </th>
                  <td className={`${pad} align-middle`}>{row.premium}</td>
                  <td className={`${pad} align-middle`}>{row.advanced}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="md:hidden">
          {rows.map((row) => (
            <MobileFeatureCard
              key={row.id}
              icon={row.icon}
              title={row.title}
              description={row.description}
              premium={row.premium}
              advanced={row.advanced}
              highlighted={row.highlighted}
            />
          ))}
        </div>
      </div>

      <p className="mt-2 flex items-start gap-1.5 text-[11px] leading-snug text-portal-navy/40">
        <Info className="mt-0.5 size-3 shrink-0" aria-hidden="true" />
        <span>{storageEmailAllowances.infoLine}</span>
      </p>
    </section>
  );
}
