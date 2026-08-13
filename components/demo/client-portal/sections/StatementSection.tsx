"use client";

import { Download } from "lucide-react";
import { useDemoPortal } from "@/lib/demo/client-portal/context";
import {
  buildStatementEntries,
  formatAmountPlain,
  formatStatementAmount,
  formatStatementDate,
  formatStatementPeriodDate,
} from "@/lib/demo/client-portal/statement";
import { DEMO_ACCOUNTANT, DEMO_CUSTOMER, DEFAULT_LOGO_PATH } from "@/lib/demo/client-portal/constants";
import {
  PORTAL_CONTROL_RADIUS,
  PortalPageHeading,
} from "@/components/demo/client-portal/PortalPrimitives";

function StatementDocCell({
  children,
  className = "",
  align = "left",
  colSpan,
}: {
  children: React.ReactNode;
  className?: string;
  align?: "left" | "right";
  colSpan?: number;
}) {
  return (
    <td
      colSpan={colSpan}
      className={`border-b border-[#e0e0e0] px-1.5 py-[4px] text-[9px] leading-snug ${align === "right" ? "text-right tabular-nums" : "text-left"} ${className}`}
    >
      {children}
    </td>
  );
}

export function StatementSection() {
  const { state, dispatch } = useDemoPortal();
  const {
    branding,
    companyName,
    customerName,
    logoUrl,
    statementDateFrom,
    statementDateTo,
  } = state;
  const { entries, closingBalance, periodTotal, aging } = buildStatementEntries(state);
  const logoSrc = logoUrl ?? DEFAULT_LOGO_PATH;

  const handleDownload = () => {
    dispatch({
      type: "SET_DOWNLOAD_FEEDBACK",
      message: "Demo statement download prepared.",
    });
  };

  const formatCellAmount = (value: number, showDash = true) => {
    if (value === 0 && showDash) {
      return "—";
    }
    return formatStatementAmount(value);
  };

  const controlClass = `h-8 border border-[#d9d9d9] px-2 text-[11px] ${PORTAL_CONTROL_RADIUS}`;
  const buttonClass = `inline-flex h-8 items-center gap-1 px-3 text-[11px] font-semibold text-white ${PORTAL_CONTROL_RADIUS}`;

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-white px-3.5 pb-3 pt-4 min-[1700px]:px-5 min-[1700px]:pb-4 min-[1700px]:pt-5">
      <PortalPageHeading>Statement</PortalPageHeading>

      <div className="mb-5 shrink-0 min-[1700px]:mb-6">
        <p className="mb-2 text-[11px] font-semibold text-[#112136]">Date Range</p>
        <div className="flex flex-wrap items-center gap-2.5">
          <label className="flex items-center gap-1.5 text-[11px] text-[#112136]">
            <span>From</span>
            <input
              type="date"
              value={statementDateFrom}
              onChange={(e) =>
                dispatch({ type: "SET_STATEMENT_DATE_FROM", date: e.target.value })
              }
              className={controlClass}
            />
          </label>
          <label className="flex items-center gap-1.5 text-[11px] text-[#112136]">
            <span>To</span>
            <input
              type="date"
              value={statementDateTo}
              onChange={(e) =>
                dispatch({ type: "SET_STATEMENT_DATE_TO", date: e.target.value })
              }
              className={controlClass}
            />
          </label>
          <button
            type="button"
            className={buttonClass}
            style={{ backgroundColor: branding.brandColor }}
          >
            Go
          </button>
          <button
            type="button"
            onClick={handleDownload}
            className={buttonClass}
            style={{ backgroundColor: branding.brandColor }}
          >
            <Download className="h-3 w-3" aria-hidden="true" />
            Download
          </button>
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto bg-white pr-1 pt-2">
        <div className="mx-auto max-w-[720px] pb-8 text-[#112136]">
          <div className="mb-6 flex items-start justify-between gap-4">
            <div className="space-y-1 text-[10px] leading-snug">
              <p className="font-bold">Statement for {customerName}</p>
              <p>
                Statement period: {formatStatementPeriodDate(statementDateFrom)} -{" "}
                {formatStatementPeriodDate(statementDateTo)}
              </p>
              <p className="pt-2 font-bold">
                Total Account Balance: R{formatAmountPlain(closingBalance)}
              </p>
            </div>
            <div className="flex h-12 w-12 shrink-0 items-center justify-center">
              <img
                src={logoSrc}
                alt={`${companyName} logo`}
                className="h-11 w-11 object-contain"
              />
            </div>
          </div>

          <div className="mb-6 grid gap-8 text-[9px] leading-snug sm:grid-cols-2">
            <div className="space-y-0.5">
              <p className="font-bold">From:</p>
              <p>{companyName}</p>
              <p>{DEMO_ACCOUNTANT.email}</p>
              <p>{DEMO_ACCOUNTANT.address}</p>
              <p>{DEMO_ACCOUNTANT.phone}</p>
            </div>
            <div className="space-y-0.5">
              <p className="font-bold">To:</p>
              <p>{customerName}</p>
              <p>{DEMO_CUSTOMER.email}</p>
              <p>{DEMO_CUSTOMER.address}</p>
            </div>
          </div>

          <table className="mb-2 w-full border-collapse">
            <thead>
              <tr className="border-b border-[#112136] text-[9px] font-bold">
                {[
                  { label: "Doc number", align: "left" as const },
                  { label: "Transaction date", align: "left" as const },
                  { label: "Due date", align: "left" as const },
                  { label: "Amount", align: "right" as const },
                  { label: "Paid", align: "right" as const },
                  { label: "Credit", align: "right" as const },
                  { label: "Balance due", align: "right" as const },
                ].map(({ label, align }) => (
                  <th
                    key={label}
                    className={`px-1.5 py-1.5 font-bold ${align === "right" ? "text-right" : "text-left"}`}
                  >
                    {label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-[9px]">
              <tr>
                <StatementDocCell>Opening balance</StatementDocCell>
                <StatementDocCell>—</StatementDocCell>
                <StatementDocCell>—</StatementDocCell>
                <StatementDocCell align="right">—</StatementDocCell>
                <StatementDocCell align="right">—</StatementDocCell>
                <StatementDocCell align="right">—</StatementDocCell>
                <StatementDocCell align="right">R0.00</StatementDocCell>
              </tr>
              {entries.map((entry) => (
                <tr key={entry.id}>
                  <StatementDocCell>{entry.docNumber}</StatementDocCell>
                  <StatementDocCell>
                    {formatStatementDate(entry.transactionDate)}
                  </StatementDocCell>
                  <StatementDocCell>{formatStatementDate(entry.dueDate)}</StatementDocCell>
                  <StatementDocCell align="right">
                    {entry.amount !== 0
                      ? formatStatementAmount(entry.amount)
                      : "—"}
                  </StatementDocCell>
                  <StatementDocCell align="right">
                    {formatCellAmount(entry.paid)}
                  </StatementDocCell>
                  <StatementDocCell align="right">
                    {formatCellAmount(entry.credit)}
                  </StatementDocCell>
                  <StatementDocCell align="right">
                    {formatStatementAmount(entry.balanceDue)}
                  </StatementDocCell>
                </tr>
              ))}
              <tr>
                <StatementDocCell className="pt-2 font-bold" colSpan={6}>
                  Total for date range:
                </StatementDocCell>
                <StatementDocCell align="right" className="pt-2 font-bold">
                  R{formatAmountPlain(periodTotal)}
                </StatementDocCell>
              </tr>
              <tr className="bg-[#f0f0f0]">
                <StatementDocCell className="font-bold" colSpan={6}>
                  Total owed for all outstanding invoices (Account Balance)
                </StatementDocCell>
                <StatementDocCell align="right" className="font-bold">
                  R{formatAmountPlain(closingBalance)}
                </StatementDocCell>
              </tr>
            </tbody>
          </table>

          <p className="mb-2 mt-6 text-[10px] font-bold">Account Summary</p>
          <table className="w-full max-w-[520px] border-collapse text-[9px]">
            <thead>
              <tr className="border-b border-[#112136]">
                {[
                  "Current",
                  "1-30 Days",
                  "31-60 Days",
                  "61-90 Days",
                  "91+ Days",
                  "Account Balance",
                ].map((heading) => (
                  <th key={heading} className="px-1.5 py-1.5 text-left font-bold">
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <StatementDocCell>{formatStatementAmount(aging.current)}</StatementDocCell>
                <StatementDocCell>{formatStatementAmount(aging.days1_30)}</StatementDocCell>
                <StatementDocCell>{formatStatementAmount(aging.days31_60)}</StatementDocCell>
                <StatementDocCell>{formatStatementAmount(aging.days61_90)}</StatementDocCell>
                <StatementDocCell>{formatStatementAmount(aging.days91plus)}</StatementDocCell>
                <StatementDocCell className="font-bold">
                  {formatStatementAmount(aging.accountBalance)}
                </StatementDocCell>
              </tr>
            </tbody>
          </table>

          <p className="mt-10 text-[8px] text-[#888]">
            © Nagging Panda 2026. All rights reserved. Ts &amp; Cs.
          </p>
          <p className="text-[8px] text-[#888]">Page 1 of 1</p>
        </div>
      </div>
    </div>
  );
}
