import type { StatementEntry } from "@/modules/client-portal-simulator/types";
import type { DemoPortalState } from "@/modules/client-portal-simulator/types";
import { formatCurrency } from "@/modules/client-portal-simulator/utils/format";

export function buildStatementEntries(state: DemoPortalState): {
  entries: StatementEntry[];
  openingBalance: number;
  closingBalance: number;
  periodTotal: number;
  aging: {
    current: number;
    days1_30: number;
    days31_60: number;
    days61_90: number;
    days91plus: number;
    accountBalance: number;
  };
} {
  const allItems: Array<{
    id: string;
    date: string;
    dueDate: string;
    docNumber: string;
    description: string;
    amount: number;
    paid: number;
    credit: number;
    type: "invoice" | "payment" | "credit";
  }> = [];

  for (const invoice of state.invoices) {
    allItems.push({
      id: invoice.id,
      date: invoice.date,
      dueDate: invoice.dueDate,
      docNumber: invoice.number,
      description: invoice.number,
      amount: invoice.amount,
      paid: invoice.amountPaid,
      credit: 0,
      type: "invoice",
    });
  }

  for (const payment of state.payments) {
    allItems.push({
      id: payment.id,
      date: payment.date,
      dueDate: payment.date,
      docNumber: payment.reference,
      description: `Payment ${payment.reference}`,
      amount: 0,
      paid: payment.amount,
      credit: payment.amount,
      type: "payment",
    });
  }

  for (const creditNote of state.creditNotes) {
    allItems.push({
      id: creditNote.id,
      date: creditNote.date,
      dueDate: creditNote.date,
      docNumber: creditNote.number,
      description: creditNote.number,
      amount: -creditNote.amount,
      paid: 0,
      credit: creditNote.amount,
      type: "credit",
    });
  }

  allItems.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const from = state.statementDateFrom
    ? new Date(state.statementDateFrom).getTime()
    : null;
  const to = state.statementDateTo ? new Date(state.statementDateTo).getTime() : null;

  const entries: StatementEntry[] = [];
  let runningBalance = 0;
  let periodTotal = 0;

  for (const item of allItems) {
    const itemTime = new Date(item.date).getTime();
    if (from !== null && itemTime < from) {
      continue;
    }
    if (to !== null && itemTime > to) {
      continue;
    }

    if (item.type === "invoice") {
      runningBalance += item.amount - item.paid;
      periodTotal += item.amount;
    } else if (item.type === "credit") {
      runningBalance -= item.credit;
      periodTotal -= item.credit;
    } else if (item.type === "payment") {
      runningBalance -= item.paid;
    }

    entries.push({
      id: `stmt-${item.id}`,
      date: item.date,
      reference: item.docNumber,
      description: item.description,
      docNumber: item.docNumber,
      transactionDate: item.date,
      dueDate: item.type === "credit" ? "" : item.dueDate,
      amount: item.amount,
      paid: item.paid,
      credit: item.credit,
      balanceDue: runningBalance,
    });
  }

  const creditAvailable = state.creditNotes
    .filter((note) => note.status === "available")
    .reduce((sum, note) => sum + note.amount, 0);

  const closingBalance =
    state.invoices.reduce((sum, invoice) => sum + invoice.balance, 0) -
    creditAvailable;

  const today = new Date("2026-08-13");
  let current = 0;
  let days1_30 = 0;
  let days31_60 = 0;
  let days61_90 = 0;
  let days91plus = 0;

  for (const invoice of state.invoices) {
    if (invoice.balance <= 0) {
      continue;
    }
    const due = new Date(invoice.dueDate);
    const diffDays = Math.floor(
      (today.getTime() - due.getTime()) / (1000 * 60 * 60 * 24),
    );
    if (diffDays <= 0) {
      current += invoice.balance;
    } else if (diffDays <= 30) {
      days1_30 += invoice.balance;
    } else if (diffDays <= 60) {
      days31_60 += invoice.balance;
    } else if (diffDays <= 90) {
      days61_90 += invoice.balance;
    } else {
      days91plus += invoice.balance;
    }
  }

  return {
    entries,
    openingBalance: 0,
    closingBalance,
    periodTotal,
    aging: {
      current,
      days1_30,
      days31_60,
      days61_90,
      days91plus,
      accountBalance: closingBalance,
    },
  };
}

export function formatStatementDate(isoDate: string): string {
  return new Intl.DateTimeFormat("en-ZA", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(isoDate));
}

export function formatStatementPeriodDate(isoDate: string): string {
  return new Intl.DateTimeFormat("en-ZA", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(isoDate));
}

export function formatAmountPlain(amount: number): string {
  return formatCurrency(amount);
}

export function formatStatementAmount(amount: number): string {
  return formatCurrency(amount);
}
