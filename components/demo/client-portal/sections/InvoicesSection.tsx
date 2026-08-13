"use client";

import { useMemo } from "react";
import { useDemoPortal } from "@/lib/demo/client-portal/context";
import { formatDate, formatZar } from "@/lib/demo/client-portal/format";
import {
  formatInvoiceStatusLabel,
  sortInvoicesForDisplay,
} from "@/lib/demo/client-portal/invoices";
import {
  PortalIconActions,
  PortalPageHeading,
  PortalPagination,
  PortalSearchInput,
  PortalSelect,
  PortalStatusPill,
  PortalTable,
  PortalTableBody,
  PortalTableCell,
  PortalTableHead,
  PortalTableHeadCell,
  PortalTableRow,
} from "@/components/demo/client-portal/PortalPrimitives";
import type { Invoice } from "@/lib/demo/client-portal/types";

const SORT_COLUMNS: Array<{
  field: "number" | "amount" | "balance" | "dueDate";
  label: string;
  align?: "left" | "right";
}> = [
  { field: "number", label: "Invoice" },
  { field: "amount", label: "Amount", align: "right" },
  { field: "balance", label: "Balance", align: "right" },
  { field: "dueDate", label: "Due" },
];

/** Compact column proportions for dense accounting-style invoice table. */
const INVOICE_COLUMN_WIDTHS = ["21%", "14%", "13%", "13%", "15%", "11%", "13%"] as const;

export function InvoicesSection() {
  const { state, dispatch, payableInvoices } = useDemoPortal();
  const {
    branding,
    invoices,
    selectedInvoiceIds,
    invoiceSearch,
    invoiceStatusFilter,
    invoiceSort,
    invoiceUserSorted,
  } = state;

  const filteredInvoices = useMemo(() => {
    let result = [...invoices];
    if (invoiceStatusFilter !== "all") {
      result = result.filter((invoice) => invoice.status === invoiceStatusFilter);
    }
    const query = invoiceSearch.trim().toLowerCase();
    if (query) {
      result = result.filter(
        (invoice) =>
          invoice.number.toLowerCase().includes(query) ||
          invoice.status.toLowerCase().includes(query),
      );
    }
    return sortInvoicesForDisplay(result, invoiceSort, invoiceUserSorted);
  }, [
    invoices,
    invoiceSearch,
    invoiceStatusFilter,
    invoiceSort,
    invoiceUserSorted,
  ]);

  const allUnpaidSelected =
    payableInvoices.length > 0 &&
    payableInvoices.every((invoice) => selectedInvoiceIds.includes(invoice.id));

  const handleSelectAll = () => {
    if (allUnpaidSelected) {
      dispatch({ type: "CLEAR_INVOICE_SELECTION" });
      return;
    }
    dispatch({
      type: "SELECT_ALL_UNPAID_INVOICES",
      invoiceIds: payableInvoices.map((invoice) => invoice.id),
    });
  };

  const handleDownload = (invoice: Invoice) => {
    const content = [`Demo Invoice ${invoice.number}`, `Amount: ${formatZar(invoice.amount)}`].join("\n");
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${invoice.number}-demo.txt`;
    link.click();
    URL.revokeObjectURL(url);
    dispatch({
      type: "SET_DOWNLOAD_FEEDBACK",
      message: `Demo invoice download prepared for ${invoice.number}.`,
    });
  };

  const selectedCount = selectedInvoiceIds.length;

  const sortIndicator = (field: typeof invoiceSort.field) => {
    if (!invoiceUserSorted || invoiceSort.field !== field) {
      return " ↑";
    }
    return invoiceSort.direction === "asc" ? " ↑" : " ↓";
  };

  return (
    <div className="min-h-0 flex-1 overflow-y-auto bg-white px-3.5 pb-3 pt-4 min-[1700px]:px-5 min-[1700px]:pb-4 min-[1700px]:pt-5">
      <PortalPageHeading>Invoices</PortalPageHeading>
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <PortalSearchInput
          value={invoiceSearch}
          onChange={(search) => dispatch({ type: "SET_INVOICE_SEARCH", search })}
        />
        <PortalSelect
          value={invoiceStatusFilter}
          onChange={(filter) =>
            dispatch({
              type: "SET_INVOICE_STATUS_FILTER",
              filter: filter as typeof invoiceStatusFilter,
            })
          }
          className="w-[125px]"
          aria-label="Status filter"
        >
          <option value="all">All</option>
          <option value="unpaid">Unpaid</option>
          <option value="paid">Paid</option>
        </PortalSelect>
      </div>

      <PortalTable compact dense roundedRows fixedLayout>
        <colgroup>
          {INVOICE_COLUMN_WIDTHS.map((width, index) => (
            <col key={index} style={{ width }} />
          ))}
        </colgroup>
        <PortalTableHead branding={branding} compact roundedRows>
          <PortalTableHeadCell branding={branding} compact dense>
            <div className="flex items-center gap-1 whitespace-nowrap">
              <input
                type="checkbox"
                checked={allUnpaidSelected}
                onChange={handleSelectAll}
                aria-label="Select all unpaid invoices"
                className="h-3 w-3 shrink-0"
              />
              <span>Add to cart</span>
              {selectedCount > 0 ? (
                <span className="font-normal">{selectedCount} Selected</span>
              ) : null}
            </div>
          </PortalTableHeadCell>
          {SORT_COLUMNS.map(({ field, label, align }) => (
            <PortalTableHeadCell key={field} branding={branding} compact dense align={align}>
              <button
                type="button"
                onClick={() =>
                  dispatch({
                    type: "SET_INVOICE_SORT",
                    field,
                  })
                }
                className={`inline-flex items-center whitespace-nowrap ${align === "right" ? "ml-auto" : ""}`}
              >
                {label}
                {sortIndicator(field)}
              </button>
            </PortalTableHeadCell>
          ))}
          <PortalTableHeadCell branding={branding} compact dense>
            Status
          </PortalTableHeadCell>
          <PortalTableHeadCell branding={branding} compact dense className="min-w-0">
            Actions
          </PortalTableHeadCell>
        </PortalTableHead>
        <PortalTableBody branding={branding} roundedRows>
          {filteredInvoices.length === 0 ? (
            <tr>
              <td colSpan={7} className="px-2 py-5 text-center text-[11px] text-[#666]">
                No invoices match your search or filter.
              </td>
            </tr>
          ) : (
            filteredInvoices.map((invoice) => {
              const isPaid = invoice.status === "paid";
              const isSelected = selectedInvoiceIds.includes(invoice.id);
              return (
                <PortalTableRow key={invoice.id} selected={isSelected} compact roundedRows>
                  <PortalTableCell compact dense>
                    <input
                      type="checkbox"
                      checked={isSelected}
                      disabled={isPaid}
                      onChange={() =>
                        dispatch({ type: "TOGGLE_INVOICE_SELECTION", invoiceId: invoice.id })
                      }
                      aria-label={`Select ${invoice.number}`}
                      className="h-3 w-3 disabled:opacity-40"
                    />
                  </PortalTableCell>
                  <PortalTableCell compact dense className="whitespace-nowrap">
                    {invoice.number}
                  </PortalTableCell>
                  <PortalTableCell compact dense align="right">
                    {formatZar(invoice.amount)}
                  </PortalTableCell>
                  <PortalTableCell compact dense align="right">
                    {formatZar(invoice.balance)}
                  </PortalTableCell>
                  <PortalTableCell compact dense className="whitespace-nowrap">
                    {formatDate(invoice.dueDate)}
                  </PortalTableCell>
                  <PortalTableCell compact dense>
                    <PortalStatusPill
                      label={formatInvoiceStatusLabel(invoice.status)}
                      tone={invoice.status === "paid" ? "paid" : "unpaid"}
                    />
                  </PortalTableCell>
                  <PortalTableCell compact dense className="min-w-0">
                    <PortalIconActions
                      dense
                      onView={() =>
                        dispatch({ type: "VIEW_INVOICE", invoiceId: invoice.id })
                      }
                      onDownload={() => handleDownload(invoice)}
                      onEdit={() => undefined}
                      onShare={() => undefined}
                    />
                  </PortalTableCell>
                </PortalTableRow>
              );
            })
          )}
        </PortalTableBody>
      </PortalTable>
      <PortalPagination />
    </div>
  );
}
