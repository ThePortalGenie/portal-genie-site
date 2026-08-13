import type {
  Agreement,
  CreditNote,
  DemoDocument,
  FinancialStatementFolder,
  Invoice,
  PortalNote,
  Quote,
} from "@/lib/demo/client-portal/types";

const standardLineItems = (description: string, amount: number) => [
  { description, quantity: 1, unitPrice: amount },
];

export function createInitialInvoices(): Invoice[] {
  return [
    {
      id: "inv-0001",
      number: "INV-0001",
      date: "2026-07-01",
      dueDate: "2026-07-15",
      amount: 2300,
      balance: 2300,
      status: "overdue",
      amountPaid: 0,
      lineItems: standardLineItems("Monthly bookkeeping — July 2026", 2000),
    },
    {
      id: "inv-0002",
      number: "INV-0002",
      date: "2026-07-10",
      dueDate: "2026-07-24",
      amount: 4500,
      balance: 4500,
      status: "unpaid",
      amountPaid: 0,
      lineItems: standardLineItems("Payroll processing — July 2026", 3913.04),
    },
    {
      id: "inv-0003",
      number: "INV-0003",
      date: "2026-06-15",
      dueDate: "2026-06-29",
      amount: 1850,
      balance: 1850,
      status: "overdue",
      amountPaid: 0,
      lineItems: standardLineItems("VAT return preparation — May 2026", 1608.7),
    },
    {
      id: "inv-0004",
      number: "INV-0004",
      date: "2026-08-01",
      dueDate: "2026-08-15",
      amount: 6900,
      balance: 6900,
      status: "unpaid",
      amountPaid: 0,
      lineItems: standardLineItems("Annual financial statement review", 6000),
    },
    {
      id: "inv-0005",
      number: "INV-0005",
      date: "2026-06-01",
      dueDate: "2026-06-15",
      amount: 2300,
      balance: 0,
      status: "paid",
      amountPaid: 2300,
      lineItems: standardLineItems("Monthly bookkeeping — June 2026", 2000),
    },
    {
      id: "inv-0006",
      number: "INV-0006",
      date: "2026-05-01",
      dueDate: "2026-05-15",
      amount: 2300,
      balance: 0,
      status: "paid",
      amountPaid: 2300,
      lineItems: standardLineItems("Monthly bookkeeping — May 2026", 2000),
    },
    {
      id: "inv-0007",
      number: "INV-0007",
      date: "2026-04-01",
      dueDate: "2026-04-15",
      amount: 3200,
      balance: 0,
      status: "paid",
      amountPaid: 3200,
      lineItems: standardLineItems("Management accounts — Q1 2026", 2782.61),
    },
    {
      id: "inv-0008",
      number: "INV-0008",
      date: "2026-08-05",
      dueDate: "2026-08-19",
      amount: 1200,
      balance: 1200,
      status: "unpaid",
      amountPaid: 0,
      lineItems: standardLineItems("Ad-hoc tax advisory session", 1043.48),
    },
  ];
}

export function createInitialQuotes(): Quote[] {
  return [
    {
      id: "qte-1001",
      number: "QTE-1001",
      date: "2026-07-20",
      expiryDate: "2026-08-20",
      amount: 12500,
      status: "sent",
      lineItems: [
        { description: "Annual compliance package", quantity: 1, unitPrice: 10869.57 },
      ],
    },
    {
      id: "qte-1002",
      number: "QTE-1002",
      date: "2026-06-10",
      expiryDate: "2026-07-10",
      amount: 4800,
      status: "accepted",
      lineItems: [
        { description: "Payroll setup and onboarding", quantity: 1, unitPrice: 4173.91 },
      ],
    },
    {
      id: "qte-1003",
      number: "QTE-1003",
      date: "2026-05-05",
      expiryDate: "2026-06-05",
      amount: 3600,
      status: "expired",
      lineItems: [
        { description: "CFO advisory retainer — 3 months", quantity: 3, unitPrice: 1043.48 },
      ],
    },
    {
      id: "qte-1004",
      number: "QTE-1004",
      date: "2026-08-01",
      expiryDate: "2026-09-01",
      amount: 8900,
      status: "draft",
      lineItems: [
        { description: "Financial statements preparation 2026", quantity: 1, unitPrice: 7739.13 },
      ],
    },
  ];
}

export function createInitialCreditNotes(): CreditNote[] {
  return [
    {
      id: "cn-2001",
      number: "CN-2001",
      date: "2026-06-20",
      reference: "INV-0005",
      amount: 350,
      status: "applied",
      lineItems: [
        { description: "Service credit — duplicate charge adjustment", quantity: 1, unitPrice: 304.35 },
      ],
    },
    {
      id: "cn-2002",
      number: "CN-2002",
      date: "2026-07-28",
      reference: "INV-0002",
      amount: 500,
      status: "available",
      lineItems: [
        { description: "Credit for overpayment", quantity: 1, unitPrice: 434.78 },
      ],
    },
  ];
}

export function createInitialAgreements(): Agreement[] {
  return [
    {
      id: "agr-001",
      title: "Annual Accounting Services Agreement",
      date: "2026-01-15",
      status: "active",
      summary: "Comprehensive accounting and bookkeeping services for Aurora Global.",
      body: `This agreement covers monthly bookkeeping, VAT submissions, management accounts, and ad-hoc advisory support for Aurora Global (Pty) Ltd for the period 1 January 2026 to 31 December 2026.

Services include:
• Monthly bookkeeping and reconciliations
• VAT return preparation and submission
• Quarterly management accounts
• Email and telephone support during business hours

Fees are billed monthly in arrears. Either party may terminate with 30 days written notice.`,
    },
    {
      id: "agr-002",
      title: "Payroll Services Agreement",
      date: "2026-03-01",
      status: "active",
      summary: "Monthly payroll processing and statutory submissions.",
      body: `Summit Accounting Partners will process monthly payroll for Aurora Global employees, including PAYE, UIF, and SDL submissions.

The client agrees to provide employee data and timesheets by the 20th of each month. Payroll runs are processed on the last business day of the month.`,
    },
    {
      id: "agr-003",
      title: "Tax Compliance Retainer",
      date: "2025-07-01",
      status: "expired",
      summary: "Previous year tax compliance retainer — expired.",
      body: `This retainer covered provisional tax, annual income tax return preparation, and SARS correspondence for the 2025 tax year. The agreement expired on 30 June 2026.`,
    },
  ];
}

export function createInitialFinancialStatements(): FinancialStatementFolder[] {
  return [
    {
      id: "fs-2026",
      year: "2026",
      documents: [
        { id: "fs-2026-1", name: "Management Accounts — June 2026.pdf", type: "pdf" },
        { id: "fs-2026-2", name: "Trial Balance — June 2026.pdf", type: "pdf" },
      ],
    },
    {
      id: "fs-2025",
      year: "2025",
      documents: [
        { id: "fs-2025-1", name: "Annual Financial Statements 2025.pdf", type: "pdf" },
        { id: "fs-2025-2", name: "Management Accounts — December 2025.pdf", type: "pdf" },
      ],
    },
    {
      id: "fs-2024",
      year: "2024",
      documents: [
        { id: "fs-2024-1", name: "Annual Financial Statements 2024.pdf", type: "pdf" },
      ],
    },
  ];
}

export function createInitialNotes(): PortalNote[] {
  return [
    {
      id: "note-1",
      date: "2026-08-10",
      author: "Sarah Mitchell",
      role: "Accountant",
      content: "VAT return submitted successfully.",
    },
    {
      id: "note-2",
      date: "2026-08-05",
      author: "James Nkosi",
      role: "Client Services",
      content: "Please upload the requested bank statement for July 2026.",
    },
    {
      id: "note-3",
      date: "2026-07-28",
      author: "Sarah Mitchell",
      role: "Accountant",
      content: "Annual financial statements ready for review.",
    },
    {
      id: "note-4",
      date: "2026-07-15",
      author: "James Nkosi",
      role: "Client Services",
      content: "Reminder: payroll information due by 20 August.",
    },
  ];
}

export function createInitialDocuments(): DemoDocument[] {
  return [
    {
      id: "doc-1",
      name: "Bank Statement — July 2026.pdf",
      folderId: "bank-statements",
      size: 245760,
      uploadedAt: "2026-08-01",
    },
    {
      id: "doc-2",
      name: "ITR14 Draft 2025.pdf",
      folderId: "tax-documents",
      size: 512000,
      uploadedAt: "2026-07-20",
    },
    {
      id: "doc-3",
      name: "Payslip Register — July 2026.pdf",
      folderId: "payroll",
      size: 189440,
      uploadedAt: "2026-08-05",
    },
    {
      id: "doc-4",
      name: "Annual Accounting Services Agreement.pdf",
      folderId: "agreements",
      size: 327680,
      uploadedAt: "2026-01-15",
    },
    {
      id: "doc-5",
      name: "Supplier Invoice — Office Supplies.pdf",
      folderId: "supplier-documents",
      size: 98304,
      uploadedAt: "2026-07-12",
    },
  ];
}

export function createInitialState() {
  return {
    invoices: createInitialInvoices(),
    quotes: createInitialQuotes(),
    creditNotes: createInitialCreditNotes(),
    agreements: createInitialAgreements(),
    financialStatements: createInitialFinancialStatements(),
    notes: createInitialNotes(),
    documents: createInitialDocuments(),
    payments: [] as { id: string; date: string; reference: string; amount: number; invoiceIds: string[] }[],
  };
}
