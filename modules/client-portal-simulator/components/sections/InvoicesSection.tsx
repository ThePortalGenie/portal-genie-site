"use client";

import { useMemo } from "react";
import { useDemoPortal } from "@/modules/client-portal-simulator/state/context";
import { formatDate, formatCurrency } from "@/modules/client-portal-simulator/utils/format";
import {
  formatInvoiceStatusLabel,
  sortInvoicesForDisplay,
} from "@/modules/client-portal-simulator/utils/invoices";
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
} from "@/modules/client-portal-simulator/components/PortalPrimitives";
import type { Invoice } from "@/modules/client-portal-simulator/types";

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

/** Compact column proportions — Actions widened for icon containment at laptop widths. */
const INVOICE_COLUMN_WIDTHS = ["17%", "14%", "13%", "13%", "14%", "11%", "18%"] as const;

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
    const content = [`Demo Invoice ${invoice.number}`, `Amount: ${formatCurrency(invoice.amount)}`].join("\n");
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

  const handleMakeNote = (invoice: Invoice) => {
    dispatch({
      type: "SET_DOWNLOAD_FEEDBACK",
      message: `Demo note saved for ${invoice.number}. View it in Notes.`,
    });
  };

  const handleForward = (invoice: Invoice) => {
    dispatch({
      type: "SET_DOWNLOAD_FEEDBACK",
      message: `Demo forward prepared for ${invoice.number}. No email was sent.`,
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
    <div className="min-h-0 flex-1 overflow-y-auto bg-white px-3.5 pb-3 pt-5 min-[1024px]:pt-[30px] min-[1700px]:px-5 min-[1700px]:pb-4">
      <PortalPageHeading>Invoices</PortalPageHeading>
      <div className="mb-3 flex flex-wrap items-center gap-[8px]">
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
          <PortalTableHeadCell branding={branding} compact dense className="!px-[4px]">
            <div className="flex flex-col items-center justify-center gap-0.5 leading-tight">
              <div className="flex items-center justify-center gap-1 whitespace-nowrap">
                <input
                  type="checkbox"
                  checked={allUnpaidSelected}
                  onChange={handleSelectAll}
                  aria-label="Select all unpaid invoices"
                  className="h-4 w-4 shrink-0"
                />
                <span>Add to cart</span>
              </div>
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
                className={`block whitespace-nowrap ${align === "right" ? "w-full text-right" : "text-left"}`}
              >
                {label}
                {sortIndicator(field)}
              </button>
            </PortalTableHeadCell>
          ))}
          <PortalTableHeadCell branding={branding} compact dense>
            Status
          </PortalTableHeadCell>
          <PortalTableHeadCell branding={branding} compact dense className="min-w-0 !pl-[4px] !pr-[10px]">
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
                  <PortalTableCell compact dense className="!px-[4px]">
                    <div className="flex justify-center">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        disabled={isPaid}
                        onChange={() =>
                          dispatch({ type: "TOGGLE_INVOICE_SELECTION", invoiceId: invoice.id })
                        }
                        aria-label={`Select ${invoice.number}`}
                        className="h-4 w-4 disabled:opacity-40"
                      />
                    </div>
                  </PortalTableCell>
                  <PortalTableCell compact dense className="whitespace-nowrap">
                    {invoice.number}
                  </PortalTableCell>
                  <PortalTableCell compact dense align="right">
                    {formatCurrency(invoice.amount)}
                  </PortalTableCell>
                  <PortalTableCell compact dense align="right">
                    {formatCurrency(invoice.balance)}
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
                  <PortalTableCell compact dense className="min-w-0 overflow-hidden !pl-[4px] !pr-[10px]">
                    <PortalIconActions
                      dense
                      variant="invoice"
                      onView={() =>
                        dispatch({ type: "VIEW_INVOICE", invoiceId: invoice.id })
                      }
                      onMakeNote={() => handleMakeNote(invoice)}
                      onForward={() => handleForward(invoice)}
                      onDownload={() => handleDownload(invoice)}
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
