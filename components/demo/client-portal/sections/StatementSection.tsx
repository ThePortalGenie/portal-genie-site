"use client";

import { useDemoPortal } from "@/lib/demo/client-portal/context";
import {
  buildStatementEntries,
  formatAmountPlain,
  formatStatementDate,
} from "@/lib/demo/client-portal/statement";
import { DEMO_CUSTOMER } from "@/lib/demo/client-portal/constants";
import {
  PortalActionButton,
  PortalPageHeading,
} from "@/components/demo/client-portal/PortalPrimitives";

export function StatementSection() {
  const { state, dispatch } = useDemoPortal();
  const { branding, companyName, customerName, statementDateFrom, statementDateTo } = state;
  const { entries, closingBalance, aging } = buildStatementEntries(state);

  const handleDownload = () => {
    dispatch({
      type: "SET_DOWNLOAD_FEEDBACK",
      message: "Demo statement download prepared.",
    });
  };

  return (
    <div className="min-h-0 flex-1 overflow-y-auto bg-white p-3 sm:p-4">
      <PortalPageHeading>Statement</PortalPageHeading>

      <div className="mb-3 flex flex-wrap items-end gap-3 text-[12px]">
        <div>
          <p className="mb-1 font-semibold">Date Range</p>
          <div className="flex flex-wrap items-center gap-2">
            <label className="flex items-center gap-1">
              <span>From</span>
              <input
                type="date"
                value={statementDateFrom}
                onChange={(e) =>
                  dispatch({ type: "SET_STATEMENT_DATE_FROM", date: e.target.value })
                }
                className="h-8 border border-[#d9d9d9] px-2"
              />
            </label>
            <label className="flex items-center gap-1">
              <span>To</span>
              <input
                type="date"
                value={statementDateTo}
                onChange={(e) =>
                  dispatch({ type: "SET_STATEMENT_DATE_TO", date: e.target.value })
                }
                className="h-8 border border-[#d9d9d9] px-2"
              />
            </label>
            <PortalActionButton branding={branding} variant="secondary">
              Go
            </PortalActionButton>
            <PortalActionButton branding={branding} variant="secondary" onClick={handleDownload}>
              Download
            </PortalActionButton>
          </div>
        </div>
      </div>

      <div className="overflow-y-auto border border-[#ececec] bg-white p-4 text-[11px] text-[#112136] shadow-sm">
        <div className="mb-4 flex items-start justify-between">
          <div>
            <p className="font-bold">Statement for {customerName}</p>
            <p>
              Statement period: {formatStatementDate(statementDateFrom)} to{" "}
              {formatStatementDate(statementDateTo)}
            </p>
            <p className="mt-2 font-bold">
              Total Account Balance: R{formatAmountPlain(closingBalance)}
            </p>
          </div>
          <div className="h-10 w-10 rounded-full bg-[#eef9ff]" aria-hidden="true" />
        </div>

        <div className="mb-4 grid gap-4 sm:grid-cols-2">
          <div>
            <p className="font-semibold">From:</p>
            <p>{companyName}</p>
            <p>{DEMO_CUSTOMER.address}</p>
          </div>
          <div>
            <p className="font-semibold">To:</p>
            <p>{customerName}</p>
            <p>{DEMO_CUSTOMER.address}</p>
          </div>
        </div>

        <table className="mb-4 w-full border-collapse">
          <thead>
            <tr style={{ backgroundColor: branding.tableHeadingBg, color: branding.tableHeadingText }}>
              {[
                "Doc number",
                "Transaction date",
                "Due date",
                "Amount",
                "Paid",
                "Credit",
                "Balance due",
              ].map((h) => (
                <th key={h} className="border border-[#ddd] px-1 py-1 text-left font-semibold">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => (
              <tr key={entry.id}>
                <td className="border border-[#ddd] px-1 py-1">{entry.docNumber}</td>
                <td className="border border-[#ddd] px-1 py-1">
                  {formatStatementDate(entry.transactionDate)}
                </td>
                <td className="border border-[#ddd] px-1 py-1">
                  {formatStatementDate(entry.dueDate)}
                </td>
                <td className="border border-[#ddd] px-1 py-1">
                  {entry.amount ? `R${formatAmountPlain(entry.amount)}` : "—"}
                </td>
                <td className="border border-[#ddd] px-1 py-1">
                  {entry.paid ? `R${formatAmountPlain(entry.paid)}` : "—"}
                </td>
                <td className="border border-[#ddd] px-1 py-1">
                  {entry.credit ? `R${formatAmountPlain(entry.credit)}` : "—"}
                </td>
                <td className="border border-[#ddd] px-1 py-1">
                  R{formatAmountPlain(entry.balanceDue)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <p className="mb-4 font-semibold">
          Total owed for all outstanding invoices (Account Balance): R
          {formatAmountPlain(closingBalance)}
        </p>

        <p className="mb-2 font-bold">Account Summary</p>
        <table className="w-full max-w-[520px] border-collapse">
          <thead>
            <tr>
              {["Current", "1-30 Days", "31-60 Days", "61-90 Days", "91+ Days", "Account Balance"].map(
                (h) => (
                  <th key={h} className="border border-[#ddd] bg-[#f5f5f5] px-2 py-1 text-left">
                    {h}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-[#ddd] px-2 py-1">R{formatAmountPlain(aging.current)}</td>
              <td className="border border-[#ddd] px-2 py-1">R{formatAmountPlain(aging.days1_30)}</td>
              <td className="border border-[#ddd] px-2 py-1">R{formatAmountPlain(aging.days31_60)}</td>
              <td className="border border-[#ddd] px-2 py-1">R{formatAmountPlain(aging.days61_90)}</td>
              <td className="border border-[#ddd] px-2 py-1">R{formatAmountPlain(aging.days91plus)}</td>
              <td className="border border-[#ddd] px-2 py-1 font-bold">
                R{formatAmountPlain(aging.accountBalance)}
              </td>
            </tr>
          </tbody>
        </table>

        <p className="mt-6 text-[10px] text-[#888]">© Portal Genie Demo 2026 · Page 1 of 1</p>
      </div>
    </div>
  );
}
