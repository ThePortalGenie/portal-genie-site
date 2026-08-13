import type { StatementEntry } from "@/lib/demo/client-portal/types";
import type { DemoPortalState } from "@/lib/demo/client-portal/types";
import { formatDate } from "@/lib/demo/client-portal/format";

export function buildStatementEntries(state: DemoPortalState): {
  entries: StatementEntry[];
  openingBalance: number;
  closingBalance: number;
} {
  const transactions: Omit<StatementEntry, "balance">[] = [];

  for (const invoice of state.invoices) {
    transactions.push({
      id: `stmt-${invoice.id}`,
      date: invoice.date,
      reference: invoice.number,
      description: `Invoice ${invoice.number}`,
      debit: invoice.amount,
      credit: 0,
    });
  }

  for (const payment of state.payments) {
    transactions.push({
      id: `stmt-${payment.id}`,
      date: payment.date,
      reference: payment.reference,
      description: `Payment — ${payment.invoiceIds.length} invoice(s)`,
      debit: 0,
      credit: payment.amount,
    });
  }

  for (const creditNote of state.creditNotes) {
    if (creditNote.status === "applied") {
      transactions.push({
        id: `stmt-${creditNote.id}`,
        date: creditNote.date,
        reference: creditNote.number,
        description: `Credit Note ${creditNote.number}`,
        debit: 0,
        credit: creditNote.amount,
      });
    }
  }

  transactions.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );

  let runningBalance = 0;
  const entries: StatementEntry[] = transactions.map((entry) => {
    runningBalance += entry.debit - entry.credit;
    return { ...entry, balance: runningBalance };
  });

  const openingBalance = 0;
  const closingBalance = state.invoices.reduce(
    (sum, invoice) => sum + invoice.balance,
    0,
  );

  return {
    entries,
    openingBalance,
    closingBalance,
  };
}

export function getStatementDate(): string {
  return formatDate("2026-08-13");
}
