import type { InvoiceStatus, QuoteStatus, CreditNoteStatus, AgreementStatus } from "@/lib/demo/client-portal/types";

const invoiceStyles: Record<InvoiceStatus, string> = {
  paid: "bg-emerald-50 text-emerald-700",
  unpaid: "bg-blue-50 text-blue-700",
  overdue: "bg-red-50 text-red-700",
};

const quoteStyles: Record<QuoteStatus, string> = {
  draft: "bg-slate-100 text-slate-700",
  sent: "bg-blue-50 text-blue-700",
  accepted: "bg-emerald-50 text-emerald-700",
  expired: "bg-amber-50 text-amber-800",
  open: "bg-amber-50 text-amber-800",
};

const creditStyles: Record<CreditNoteStatus, string> = {
  applied: "bg-emerald-50 text-emerald-700",
  available: "bg-blue-50 text-blue-700",
};

const agreementStyles: Record<AgreementStatus, string> = {
  active: "bg-emerald-50 text-emerald-700",
  expired: "bg-slate-100 text-slate-600",
  pending: "bg-amber-50 text-amber-800",
};

type StatusBadgeProps = {
  label: string;
  tone?: "invoice" | "quote" | "credit" | "agreement";
  status?: string;
};

export function StatusBadge({ label, tone = "invoice", status }: StatusBadgeProps) {
  let className = "bg-slate-100 text-slate-700";

  if (tone === "invoice" && status) {
    className = invoiceStyles[status as InvoiceStatus] ?? className;
  } else if (tone === "quote" && status) {
    className = quoteStyles[status as QuoteStatus] ?? className;
  } else if (tone === "credit" && status) {
    className = creditStyles[status as CreditNoteStatus] ?? className;
  } else if (tone === "agreement" && status) {
    className = agreementStyles[status as AgreementStatus] ?? className;
  }

  return (
    <span className={`inline-flex rounded-badge px-2.5 py-1 text-xs font-semibold capitalize ${className}`}>
      {label}
    </span>
  );
}

export function DemoSectionCard({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-card border border-muted/20 bg-surface p-4 sm:p-6">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-portal-navy">{title}</h2>
        {description ? (
          <p className="mt-1 text-sm text-portal-navy/65">{description}</p>
        ) : null}
      </div>
      {children}
    </section>
  );
}
