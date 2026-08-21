import type { Invoice } from "@/modules/client-portal-simulator/types";
import type { DemoPortalState } from "@/modules/client-portal-simulator/types";

export function sortInvoicesForDisplay(
  invoices: Invoice[],
  invoiceSort: DemoPortalState["invoiceSort"],
  userSorted: boolean,
): Invoice[] {
  const result = [...invoices];

  if (!userSorted) {
    result.sort((a, b) => {
      if (a.status !== b.status) {
        return a.status === "unpaid" ? -1 : 1;
      }
      return new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime();
    });
    return result;
  }

  const direction = invoiceSort.direction === "asc" ? 1 : -1;
  const field = invoiceSort.field;

  result.sort((a, b) => {
    if (field === "amount" || field === "balance") {
      return (a[field] - b[field]) * direction;
    }
    if (field === "date" || field === "dueDate") {
      return (
        (new Date(a[field]).getTime() - new Date(b[field]).getTime()) * direction
      );
    }
    return String(a[field]).localeCompare(String(b[field])) * direction;
  });

  return result;
}

export function formatInvoiceStatusLabel(status: Invoice["status"]): string {
  return status === "paid" ? "Paid" : "Unpaid";
}
