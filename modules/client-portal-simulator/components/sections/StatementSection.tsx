"use client";

import { Calendar, Download } from "lucide-react";
import { useDemoPortal } from "@/modules/client-portal-simulator/state/context";
import {
  buildStatementEntries,
  formatStatementAmount,
  formatStatementDate,
  formatStatementPeriodDate,
} from "@/modules/client-portal-simulator/utils/statement";
import { formatCurrency } from "@/modules/client-portal-simulator/utils/format";
import { DEMO_ACCOUNTANT, DEMO_CUSTOMER } from "@/modules/client-portal-simulator/data/constants";
import { getPortalLogo } from "@/modules/client-portal-simulator/utils/portal-logo";
import { PORTAL_CONTROL_RADIUS } from "@/modules/client-portal-simulator/components/PortalPrimitives";

const TX_COLUMN_WIDTHS = ["14%", "17%", "17%", "13%", "11%", "11%", "17%"] as const;

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
      className={`px-1 py-[3px] text-[9px] leading-snug ${align === "right" ? "text-right tabular-nums" : "text-left"} ${className}`}
      style={align === "right" ? { fontVariantNumeric: "tabular-nums" } : undefined}
    >
      {children}
    </td>
  );
}

function DateRangeInput({
  label,
  value,
  onChange,
}: {
  label: "From" | "To";
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div
      className={`relative flex h-[35px] w-[170px] items-center border border-[#d9d9d9] bg-white pl-2 pr-7 text-[11px] text-[#112136] ${PORTAL_CONTROL_RADIUS}`}
    >
      <span className="shrink-0">{label}:</span>
      <input
        type="date"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="min-w-0 flex-1 border-0 bg-transparent pl-1 text-[11px] text-[#112136] outline-none [color-scheme:light]"
      />
      <Calendar className="pointer-events-none absolute right-2 h-3.5 w-3.5 text-[#666]" aria-hidden="true" />
    </div>
  );
}

export function StatementSection() {
  const { state, dispatch } = useDemoPortal();
  const {
    branding,
    companyName,
    customerName,
    statementDateFrom,
    statementDateTo,
  } = state;
  const { entries, closingBalance, periodTotal, aging } = buildStatementEntries(state);
  const logoSrc = getPortalLogo(state);

  const handleDownload = () => {
    dispatch({
      type: "SET_DOWNLOAD_FEEDBACK",
      message: "Demo statement download prepared.",
    });
  };

  const buttonClass = `inline-flex h-[35px] items-center justify-center text-[11px] font-semibold text-white ${PORTAL_CONTROL_RADIUS}`;

  return (
    <div className="portal-statement-scroll min-h-0 w-full flex-1 overflow-y-auto overflow-x-hidden bg-white px-3.5 pb-3 pt-4 min-[1700px]:px-5 min-[1700px]:pb-4 min-[1700px]:pt-5">
      <h2 className="mb-[18px] text-[15px] font-bold text-[#112136]">Statement</h2>

      <div className="mb-[50px] shrink-0">
        <p className="mb-[8px] text-[11px] font-semibold text-[#112136]">Date Range</p>
        <div className="flex flex-wrap items-center gap-[10px]">
          <DateRangeInput
            label="From"
            value={statementDateFrom}
            onChange={(date) => dispatch({ type: "SET_STATEMENT_DATE_FROM", date })}
          />
          <DateRangeInput
            label="To"
            value={statementDateTo}
            onChange={(date) => dispatch({ type: "SET_STATEMENT_DATE_TO", date })}
          />
          <button
            type="button"
            className={`${buttonClass} w-[46px]`}
            style={{ backgroundColor: branding.brandColor }}
          >
            Go
          </button>
          <button
            type="button"
            onClick={handleDownload}
            className={`${buttonClass} w-[105px] gap-1.5 px-2`}
            style={{ backgroundColor: branding.brandColor }}
          >
            <Download className="h-3.5 w-3.5 shrink-0" strokeWidth={2} aria-hidden="true" />
            Download
          </button>
        </div>
      </div>

      <div className="w-full max-w-[590px] pb-8 text-[#112136]">
        {/* Statement header + logo */}
        <div className="mb-[32px] flex items-start justify-between gap-4">
          <div className="space-y-0.5 text-[10px] leading-snug">
            <p className="text-[10px] font-bold">Statement for {customerName}</p>
            <p className="text-[9px] font-normal">
              Statement period: {formatStatementPeriodDate(statementDateFrom)} -{" "}
              {formatStatementPeriodDate(statementDateTo)}
            </p>
            <p className="pt-1.5 text-[10px] font-bold underline underline-offset-2">
              Total Account Balance: {formatCurrency(closingBalance)}
            </p>
          </div>
          <div className="flex h-[60px] w-[60px] shrink-0 items-center justify-center">
            <img
              src={logoSrc}
              alt={`${companyName} logo`}
              className="max-h-[60px] max-w-[60px] object-contain"
            />
          </div>
        </div>

        {/* From / To */}
        <div className="mb-[38px] grid gap-10 text-[9px] leading-snug sm:grid-cols-2">
          <div className="space-y-0.5">
            <p className="font-bold">From:</p>
            <p>{companyName}</p>
            <p>{DEMO_ACCOUNTANT.email}</p>
            <p>{DEMO_CUSTOMER.companyName}</p>
            <p>0721038084</p>
          </div>
          <div className="space-y-0.5">
            <p className="font-bold">To:</p>
            <p>{customerName}</p>
            <p>{DEMO_CUSTOMER.email}</p>
            <p>{customerName}</p>
            <p>27721038084</p>
          </div>
        </div>

        {/* Transaction table */}
        <table className="mb-[28px] w-full table-fixed border-collapse">
          <colgroup>
            {TX_COLUMN_WIDTHS.map((width, index) => (
              <col key={index} style={{ width }} />
            ))}
          </colgroup>
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
                  className={`px-1 py-1.5 font-bold ${align === "right" ? "text-right" : "text-left"}`}
                  style={align === "right" ? { fontVariantNumeric: "tabular-nums" } : undefined}
                >
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-[9px]">
            <tr>
              <StatementDocCell className="py-[8px]">Opening balance</StatementDocCell>
              <StatementDocCell className="py-[8px]">—</StatementDocCell>
              <StatementDocCell className="py-[8px]">—</StatementDocCell>
              <StatementDocCell align="right" className="py-[8px]">
                —
              </StatementDocCell>
              <StatementDocCell align="right" className="py-[8px]">
                —
              </StatementDocCell>
              <StatementDocCell align="right" className="py-[8px]">
                —
              </StatementDocCell>
              <StatementDocCell align="right" className="py-[8px]">
                {formatCurrency(0)}
              </StatementDocCell>
            </tr>
            {entries.map((entry) => (
              <tr key={entry.id}>
                <StatementDocCell>{entry.docNumber}</StatementDocCell>
                <StatementDocCell>{formatStatementDate(entry.transactionDate)}</StatementDocCell>
                <StatementDocCell>
                  {entry.dueDate ? formatStatementDate(entry.dueDate) : "-"}
                </StatementDocCell>
                <StatementDocCell align="right">
                  {entry.amount !== 0 ? formatStatementAmount(entry.amount) : "—"}
                </StatementDocCell>
                <StatementDocCell align="right">
                  {formatStatementAmount(entry.paid)}
                </StatementDocCell>
                <StatementDocCell align="right">
                  {formatStatementAmount(entry.credit)}
                </StatementDocCell>
                <StatementDocCell align="right">
                  {formatStatementAmount(entry.balanceDue)}
                </StatementDocCell>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Total for date range */}
        <div className="mb-[15px] flex items-baseline justify-between gap-2 text-[9px]">
          <span>
            Total for date range: {formatStatementPeriodDate(statementDateFrom)} -{" "}
            {formatStatementPeriodDate(statementDateTo)}
          </span>
          <span className="shrink-0 font-bold tabular-nums">
            {formatCurrency(periodTotal)}
          </span>
        </div>

        {/* Account balance bar */}
        <div className="mb-[34px] flex h-6 items-center justify-between bg-[#f0f0f0] px-1.5 text-[9px] font-bold">
          <span>Total owed for all outstanding invoices (Account Balance)</span>
          <span className="tabular-nums">{formatCurrency(closingBalance)}</span>
        </div>

        {/* Account Summary */}
        <table className="mb-[40px] w-full border-collapse border border-[#d9d9d9] text-[9px]">
          <thead>
            <tr>
              <th
                colSpan={6}
                className="border-b border-[#d9d9d9] px-1.5 py-1.5 text-center font-bold"
              >
                Account Summary
              </th>
            </tr>
            <tr>
              {[
                "Current",
                "1-30 Days",
                "31-60 Days",
                "61-90 Days",
                "91+ Days",
                "Account Balance",
              ].map((heading) => (
                <th
                  key={heading}
                  className="border-b border-r border-[#d9d9d9] px-1.5 py-1.5 text-left font-bold last:border-r-0"
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border-r border-[#d9d9d9] px-1.5 py-1.5 tabular-nums">
                {formatStatementAmount(aging.current)}
              </td>
              <td className="border-r border-[#d9d9d9] px-1.5 py-1.5 tabular-nums">
                {formatStatementAmount(aging.days1_30)}
              </td>
              <td className="border-r border-[#d9d9d9] px-1.5 py-1.5 tabular-nums">
                {formatStatementAmount(aging.days31_60)}
              </td>
              <td className="border-r border-[#d9d9d9] px-1.5 py-1.5 tabular-nums">
                {formatStatementAmount(aging.days61_90)}
              </td>
              <td className="border-r border-[#d9d9d9] px-1.5 py-1.5 tabular-nums">
                {formatStatementAmount(aging.days91plus)}
              </td>
              <td className="px-1.5 py-1.5 font-bold tabular-nums">
                {formatStatementAmount(aging.accountBalance)}
              </td>
            </tr>
          </tbody>
        </table>

        {/* Footer divider + text */}
        <div className="border-t border-[#d4eef5] pt-[18px]">
          <p className="text-[8px] leading-snug text-[#112136]">
            © Nagging Panda 2026.
          </p>
          <p className="text-[8px] leading-snug text-[#112136]">
            All rights reserved. Ts &amp; Cs.
          </p>
          <p className="mt-0.5 text-[8px] font-bold leading-snug text-[#112136]">
            Page 1 of 1
          </p>
        </div>
      </div>
    </div>
  );
}
