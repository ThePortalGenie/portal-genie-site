"use client";

import { useDemoPortal } from "@/lib/demo/client-portal/context";
import { buildStatementEntries, getStatementDate } from "@/lib/demo/client-portal/statement";
import { formatDate, formatZar } from "@/lib/demo/client-portal/format";
import { DEMO_CUSTOMER } from "@/lib/demo/client-portal/constants";
import { DemoSectionCard } from "@/components/demo/client-portal/DemoSectionParts";

export function StatementSection() {
  const { state } = useDemoPortal();
  const { branding, companyName } = state;
  const { entries, openingBalance, closingBalance } = buildStatementEntries(state);

  return (
    <DemoSectionCard
      title="Account Statement"
      description="Summary of invoices, payments, and credits on your account."
    >
      <div className="mb-5 grid gap-4 sm:grid-cols-3">
        <div className="rounded-lg border border-muted/20 bg-background p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-portal-navy/55">
            Customer
          </p>
          <p className="mt-1 text-sm font-semibold text-portal-navy">{companyName}</p>
          <p className="text-xs text-portal-navy/65">{DEMO_CUSTOMER.accountNumber}</p>
        </div>
        <div className="rounded-lg border border-muted/20 bg-background p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-portal-navy/55">
            Statement date
          </p>
          <p className="mt-1 text-sm font-semibold text-portal-navy">{getStatementDate()}</p>
        </div>
        <div className="rounded-lg border border-muted/20 bg-background p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-portal-navy/55">
            Opening balance
          </p>
          <p className="mt-1 text-sm font-semibold text-portal-navy">
            {formatZar(openingBalance)}
          </p>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-muted/20">
        <table className="min-w-[760px] w-full text-sm">
          <thead style={{ backgroundColor: branding.tableHeadingBg }}>
            <tr>
              {["Date", "Reference", "Description", "Debit", "Credit", "Balance"].map((heading) => (
                <th
                  key={heading}
                  className="px-3 py-3 text-left font-semibold"
                  style={{ color: branding.tableHeadingText }}
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody style={{ color: branding.tableBodyText }}>
            {entries.map((entry) => (
              <tr key={entry.id} className="border-t border-muted/15">
                <td className="px-3 py-3">{formatDate(entry.date)}</td>
                <td className="px-3 py-3">{entry.reference}</td>
                <td className="px-3 py-3">{entry.description}</td>
                <td className="px-3 py-3">{entry.debit ? formatZar(entry.debit) : "—"}</td>
                <td className="px-3 py-3">{entry.credit ? formatZar(entry.credit) : "—"}</td>
                <td className="px-3 py-3 font-medium">{formatZar(entry.balance)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-end">
        <div className="rounded-lg border border-muted/20 bg-background px-4 py-3 text-right">
          <p className="text-xs font-semibold uppercase tracking-wide text-portal-navy/55">
            Outstanding balance
          </p>
          <p
            className="mt-1 text-xl font-semibold"
            style={{ color: branding.amountColor }}
          >
            {formatZar(closingBalance)}
          </p>
        </div>
      </div>
    </DemoSectionCard>
  );
}
