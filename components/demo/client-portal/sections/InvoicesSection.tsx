"use client";

import { ArrowUpDown, Download, Eye } from "lucide-react";
import { useMemo } from "react";
import { useDemoPortal } from "@/lib/demo/client-portal/context";
import { formatDate, formatZar } from "@/lib/demo/client-portal/format";
import {
  DemoSectionCard,
  StatusBadge,
} from "@/components/demo/client-portal/DemoSectionParts";
import type { Invoice } from "@/lib/demo/client-portal/types";

export function InvoicesSection() {
  const { state, dispatch, payableInvoices } = useDemoPortal();
  const { branding, invoices, selectedInvoiceIds, invoiceSearch, invoiceStatusFilter, invoiceSort, downloadFeedback } = state;

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
    const content = [
      `Demo Invoice ${invoice.number}`,
      `Date: ${invoice.date}`,
      `Due: ${invoice.dueDate}`,
      `Amount: ${formatZar(invoice.amount)}`,
      `Balance: ${formatZar(invoice.balance)}`,
      `Status: ${invoice.status}`,
      "",
      "This is a simulated demo document.",
    ].join("\n");

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

  return (
    <DemoSectionCard
      title="Invoices"
      description="View, search, and pay outstanding invoices."
    >
      <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex flex-1 flex-col gap-3 sm:flex-row">
          <label className="block flex-1">
            <span className="mb-1 block text-xs font-medium text-portal-navy/70">Search</span>
            <input
              type="search"
              value={invoiceSearch}
              onChange={(event) =>
                dispatch({ type: "SET_INVOICE_SEARCH", search: event.target.value })
              }
              placeholder="Search by invoice number or status"
              className="w-full rounded-lg border border-muted/30 px-3 py-2 text-sm"
            />
          </label>
          <label className="block sm:w-44">
            <span className="mb-1 block text-xs font-medium text-portal-navy/70">Status</span>
            <select
              value={invoiceStatusFilter}
              onChange={(event) =>
                dispatch({
                  type: "SET_INVOICE_STATUS_FILTER",
                  filter: event.target.value as typeof invoiceStatusFilter,
                })
              }
              className="w-full rounded-lg border border-muted/30 px-3 py-2 text-sm"
            >
              <option value="all">All</option>
              <option value="unpaid">Unpaid</option>
              <option value="paid">Paid</option>
              <option value="overdue">Overdue</option>
            </select>
          </label>
        </div>
        {downloadFeedback ? (
          <p className="text-sm text-portal-teal" role="status">
            {downloadFeedback}
          </p>
        ) : null}
      </div>

      <div className="overflow-x-auto rounded-lg border border-muted/20">
        <table className="min-w-[760px] w-full text-sm">
          <thead style={{ backgroundColor: branding.tableHeadingBg }}>
            <tr>
              <th className="px-3 py-3 text-left" style={{ color: branding.tableHeadingText }}>
                <input
                  type="checkbox"
                  checked={allUnpaidSelected}
                  onChange={handleSelectAll}
                  aria-label="Select all unpaid invoices"
                  className="h-4 w-4 rounded border-muted/40"
                />
              </th>
              {[
                ["number", "Invoice"],
                ["date", "Date"],
                ["dueDate", "Due Date"],
                ["amount", "Amount"],
                ["balance", "Balance"],
              ].map(([field, label]) => (
                <th
                  key={field}
                  className="px-3 py-3 text-left"
                  style={{ color: branding.tableHeadingText }}
                >
                  <button
                    type="button"
                    onClick={() =>
                      dispatch({
                        type: "SET_INVOICE_SORT",
                        field: field as typeof invoiceSort.field,
                      })
                    }
                    className="inline-flex items-center gap-1 font-semibold"
                  >
                    {label}
                    <ArrowUpDown className="h-3.5 w-3.5 opacity-60" aria-hidden="true" />
                  </button>
                </th>
              ))}
              <th
                className="px-3 py-3 text-left font-semibold"
                style={{ color: branding.tableHeadingText }}
              >
                Status
              </th>
              <th
                className="px-3 py-3 text-right font-semibold"
                style={{ color: branding.tableHeadingText }}
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody style={{ color: branding.tableBodyText }}>
            {filteredInvoices.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-4 py-8 text-center text-portal-navy/60">
                  No invoices match your search or filter.
                </td>
              </tr>
            ) : (
              filteredInvoices.map((invoice) => {
                const isPaid = invoice.status === "paid";
                const isSelected = selectedInvoiceIds.includes(invoice.id);
                return (
                  <tr key={invoice.id} className="border-t border-muted/15">
                    <td className="px-3 py-3">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        disabled={isPaid}
                        onChange={() =>
                          dispatch({ type: "TOGGLE_INVOICE_SELECTION", invoiceId: invoice.id })
                        }
                        aria-label={`Select ${invoice.number}`}
                        className="h-4 w-4 rounded border-muted/40 disabled:opacity-40"
                      />
                    </td>
                    <td className="px-3 py-3 font-medium">{invoice.number}</td>
                    <td className="px-3 py-3">{formatDate(invoice.date)}</td>
                    <td className="px-3 py-3">{formatDate(invoice.dueDate)}</td>
                    <td className="px-3 py-3">{formatZar(invoice.amount)}</td>
                    <td className="px-3 py-3">{formatZar(invoice.balance)}</td>
                    <td className="px-3 py-3">
                      <StatusBadge label={invoice.status} tone="invoice" status={invoice.status} />
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex justify-end gap-1">
                        <button
                          type="button"
                          onClick={() => dispatch({ type: "VIEW_INVOICE", invoiceId: invoice.id })}
                          className="inline-flex items-center gap-1 rounded-button px-2 py-1.5 text-xs font-medium text-portal-blue hover:bg-portal-blue/10"
                        >
                          <Eye className="h-3.5 w-3.5" aria-hidden="true" />
                          View
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDownload(invoice)}
                          className="inline-flex items-center gap-1 rounded-button px-2 py-1.5 text-xs font-medium text-portal-navy/70 hover:bg-background"
                        >
                          <Download className="h-3.5 w-3.5" aria-hidden="true" />
                          Download
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </DemoSectionCard>
  );
}
