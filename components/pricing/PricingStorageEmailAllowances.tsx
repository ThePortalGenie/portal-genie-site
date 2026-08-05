"use client";

import type { LucideIcon } from "lucide-react";
import { Cloud, Info, Mail, UserPlus } from "lucide-react";
import {
  getAdditionalStorageCopy,
  getAdditionalUserCopy,
  getEmailBundleAddOnCopy,
  pricingExtras,
  type CurrencyCode,
} from "@/content/pricing";

type PricingStorageEmailAllowancesProps = {
  currency: CurrencyCode;
};

type ExtraRow = {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  price: string | null;
};

export function PricingStorageEmailAllowances({
  currency,
}: PricingStorageEmailAllowancesProps) {
  const rows: ExtraRow[] = [
    {
      id: "storage",
      name: pricingExtras.storage.name,
      description: pricingExtras.storage.description,
      icon: Cloud,
      price: getAdditionalStorageCopy(currency),
    },
    {
      id: "email",
      name: pricingExtras.email.name,
      description: pricingExtras.email.description,
      icon: Mail,
      price: getEmailBundleAddOnCopy(currency),
    },
    {
      id: "users",
      name: pricingExtras.users.name,
      description: pricingExtras.users.description,
      icon: UserPlus,
      price: getAdditionalUserCopy(currency),
    },
  ];

  return (
    <section
      className="mx-auto mt-6 max-w-5xl lg:max-w-6xl"
      aria-labelledby="pricing-extras-heading"
    >
      <div className="overflow-hidden rounded-[1.5rem] border border-portal-blue/20 bg-surface shadow-[0_16px_40px_-16px_rgba(0,119,190,0.12)] ring-1 ring-portal-blue/10">
        <div className="border-b border-muted/10 px-5 py-5 sm:px-6 sm:py-6">
          <h2
            id="pricing-extras-heading"
            className="text-lg font-semibold tracking-tight text-portal-navy md:text-xl"
          >
            {pricingExtras.title}
          </h2>
          <p className="mt-1 text-sm leading-snug text-portal-navy/65">
            {pricingExtras.description}
          </p>
        </div>

        {/* Desktop / tablet two-column extras table */}
        <table className="hidden w-full table-fixed border-collapse text-left md:table">
          <caption className="sr-only">
            Storage, email and user add-on pricing
          </caption>
          <colgroup>
            <col className="w-[65%]" />
            <col className="w-[35%]" />
          </colgroup>
          <thead>
            <tr className="border-b border-muted/10 bg-portal-blue/[0.06]">
              <th
                scope="col"
                className="px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-portal-blue sm:px-6"
              >
                {pricingExtras.extraColumnLabel}
              </th>
              <th
                scope="col"
                className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.08em] text-portal-blue sm:px-6"
              >
                {pricingExtras.priceColumnLabel}
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const Icon = row.icon;

              return (
                <tr
                  key={row.id}
                  className="border-b border-muted/10 last:border-b-0"
                >
                  <th
                    scope="row"
                    className="px-5 py-4 font-normal align-middle sm:px-6 sm:py-5"
                  >
                    <div className="flex items-start gap-3">
                      <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg bg-portal-blue/[0.08] text-portal-blue">
                        <Icon
                          className="size-4"
                          strokeWidth={2}
                          aria-hidden="true"
                        />
                      </span>
                      <div className="min-w-0">
                        <p className="text-base font-semibold text-portal-navy">
                          {row.name}
                        </p>
                        <p className="mt-0.5 text-sm text-portal-navy/55">
                          {row.description}
                        </p>
                      </div>
                    </div>
                  </th>
                  <td className="px-5 py-4 text-left align-middle sm:px-6 sm:py-5">
                    <p className="text-base font-semibold text-portal-navy">
                      {row.price ?? "—"}
                    </p>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Mobile stacked extras */}
        <ul className="md:hidden">
          {rows.map((row) => {
            const Icon = row.icon;

            return (
              <li
                key={row.id}
                className="border-b border-muted/10 px-4 py-4 last:border-b-0 sm:px-5"
              >
                <div className="flex items-start gap-3">
                  <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg bg-portal-blue/[0.08] text-portal-blue">
                    <Icon
                      className="size-4"
                      strokeWidth={2}
                      aria-hidden="true"
                    />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-base font-semibold text-portal-navy">
                      {row.name}
                    </p>
                    <p className="mt-0.5 text-sm leading-snug text-portal-navy/55">
                      {row.description}
                    </p>
                    <p className="mt-2.5 text-base font-semibold text-portal-navy">
                      {row.price ?? "—"}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        <p className="flex items-start gap-1.5 border-t border-muted/10 px-4 py-3 text-[11px] leading-snug text-portal-navy/40 sm:px-6">
          <Info className="mt-0.5 size-3 shrink-0" aria-hidden="true" />
          <span className="min-w-0 break-words">{pricingExtras.infoLine}</span>
        </p>
      </div>
    </section>
  );
}
