"use client";

import { useMemo } from "react";
import { useDemoPortal } from "@/lib/demo/client-portal/context";
import { formatDate, formatZar } from "@/lib/demo/client-portal/format";
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

export function InvoicesSection() {
  const { state, dispatch, payableInvoices } = useDemoPortal();
  const {
    branding,
    invoices,
    selectedInvoiceIds,
    invoiceSearch,
    invoiceStatusFilter,
    invoiceSort,
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
    result.sort((a, b) => {
      const direction = invoiceSort.direction === "asc" ? 1 : -1;
      const field = invoiceSort.field;
      if (field === "amount" || field === "balance") {
        return (a[field] - b[field]) * direction;
      }
      return String(a[field]).localeCompare(String(b[field])) * direction;
    });
    return result;
  }, [invoices, invoiceSearch, invoiceStatusFilter, invoiceSort]);

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

  return (
    <div className="min-h-0 flex-1 overflow-y-auto bg-white p-3 sm:p-4">
      <PortalPageHeading>Invoices</PortalPageHeading>
      <div className="mb-3 flex flex-wrap items-center gap-3">
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
          className="w-[120px]"
        >
          <option value="all">All</option>
          <option value="unpaid">Unpaid</option>
          <option value="paid">Paid</option>
          <option value="overdue">Overdue</option>
        </PortalSelect>
      </div>

      <PortalTable minWidth="720px">
        <PortalTableHead branding={branding}>
          <PortalTableHeadCell branding={branding}>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={allUnpaidSelected}
                onChange={handleSelectAll}
                aria-label="Select all unpaid invoices"
                className="h-3.5 w-3.5"
              />
              <span>Add to cart</span>
              {selectedCount > 0 ? (
                <span className="font-normal opacity-90">{selectedCount} Selected</span>
              ) : null}
            </div>
          </PortalTableHeadCell>
          {[
            ["number", "Invoice"],
            ["amount", "Amount"],
            ["balance", "Balance"],
            ["dueDate", "Due"],
          ].map(([field, label]) => (
            <PortalTableHeadCell key={field} branding={branding}>
              <button
                type="button"
                onClick={() =>
                  dispatch({
                    type: "SET_INVOICE_SORT",
                    field: field as typeof invoiceSort.field,
                  })
                }
                className="inline-flex items-center gap-1"
              >
                {label}
              </button>
            </PortalTableHeadCell>
          ))}
          <PortalTableHeadCell branding={branding}>Status</PortalTableHeadCell>
          <PortalTableHeadCell branding={branding}>Actions</PortalTableHeadCell>
        </PortalTableHead>
        <PortalTableBody branding={branding}>
          {filteredInvoices.length === 0 ? (
            <tr>
              <td colSpan={7} className="px-2 py-6 text-center text-[#666]">
                No invoices match your search or filter.
              </td>
            </tr>
          ) : (
            filteredInvoices.map((invoice) => {
              const isPaid = invoice.status === "paid";
              const isSelected = selectedInvoiceIds.includes(invoice.id);
              return (
                <PortalTableRow key={invoice.id} selected={isSelected}>
                  <PortalTableCell>
                    <input
                      type="checkbox"
                      checked={isSelected}
                      disabled={isPaid}
                      onChange={() =>
                        dispatch({ type: "TOGGLE_INVOICE_SELECTION", invoiceId: invoice.id })
                      }
                      aria-label={`Select ${invoice.number}`}
                      className="h-3.5 w-3.5 disabled:opacity-40"
                    />
                  </PortalTableCell>
                  <PortalTableCell>{invoice.number}</PortalTableCell>
                  <PortalTableCell>{formatZar(invoice.amount)}</PortalTableCell>
                  <PortalTableCell>{formatZar(invoice.balance)}</PortalTableCell>
                  <PortalTableCell>{formatDate(invoice.dueDate)}</PortalTableCell>
                  <PortalTableCell>
                    <PortalStatusPill
                      label={invoice.status}
                      tone={invoice.status === "paid" ? "paid" : "unpaid"}
                    />
                  </PortalTableCell>
                  <PortalTableCell>
                    <PortalIconActions
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
