"use client";

import { Eye } from "lucide-react";
import { useDemoPortal } from "@/lib/demo/client-portal/context";
import { formatDate, formatZar } from "@/lib/demo/client-portal/format";
import {
  DemoSectionCard,
  StatusBadge,
} from "@/components/demo/client-portal/DemoSectionParts";

export function QuotesSection() {
  const { state, dispatch } = useDemoPortal();
  const { branding, quotes } = state;

  return (
    <DemoSectionCard title="Quotes" description="Review quotes sent by your accountant.">
      <div className="overflow-x-auto rounded-lg border border-muted/20">
        <table className="min-w-[680px] w-full text-sm">
          <thead style={{ backgroundColor: branding.tableHeadingBg }}>
            <tr>
              {["Quote Number", "Date", "Expiry Date", "Amount", "Status", "Actions"].map(
                (heading) => (
                  <th
                    key={heading}
                    className="px-3 py-3 text-left font-semibold"
                    style={{ color: branding.tableHeadingText }}
                  >
                    {heading}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody style={{ color: branding.tableBodyText }}>
            {quotes.map((quote) => (
              <tr key={quote.id} className="border-t border-muted/15">
                <td className="px-3 py-3 font-medium">{quote.number}</td>
                <td className="px-3 py-3">{formatDate(quote.date)}</td>
                <td className="px-3 py-3">{formatDate(quote.expiryDate)}</td>
                <td className="px-3 py-3">{formatZar(quote.amount)}</td>
                <td className="px-3 py-3">
                  <StatusBadge label={quote.status} tone="quote" status={quote.status} />
                </td>
                <td className="px-3 py-3">
                  <button
                    type="button"
                    onClick={() => dispatch({ type: "VIEW_QUOTE", quoteId: quote.id })}
                    className="inline-flex items-center gap-1 rounded-button px-2 py-1.5 text-xs font-medium text-portal-blue hover:bg-portal-blue/10"
                  >
                    <Eye className="h-3.5 w-3.5" aria-hidden="true" />
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DemoSectionCard>
  );
}

export function CreditNotesSection() {
  const { state, dispatch } = useDemoPortal();
  const { branding, creditNotes } = state;

  return (
    <DemoSectionCard title="Credit Notes" description="Credits applied or available on your account.">
      <div className="overflow-x-auto rounded-lg border border-muted/20">
        <table className="min-w-[680px] w-full text-sm">
          <thead style={{ backgroundColor: branding.tableHeadingBg }}>
            <tr>
              {["Credit Note", "Date", "Reference", "Amount", "Status", "Actions"].map(
                (heading) => (
                  <th
                    key={heading}
                    className="px-3 py-3 text-left font-semibold"
                    style={{ color: branding.tableHeadingText }}
                  >
                    {heading}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody style={{ color: branding.tableBodyText }}>
            {creditNotes.map((note) => (
              <tr key={note.id} className="border-t border-muted/15">
                <td className="px-3 py-3 font-medium">{note.number}</td>
                <td className="px-3 py-3">{formatDate(note.date)}</td>
                <td className="px-3 py-3">{note.reference}</td>
                <td className="px-3 py-3">{formatZar(note.amount)}</td>
                <td className="px-3 py-3">
                  <StatusBadge label={note.status} tone="credit" status={note.status} />
                </td>
                <td className="px-3 py-3">
                  <button
                    type="button"
                    onClick={() =>
                      dispatch({ type: "VIEW_CREDIT_NOTE", creditNoteId: note.id })
                    }
                    className="inline-flex items-center gap-1 rounded-button px-2 py-1.5 text-xs font-medium text-portal-blue hover:bg-portal-blue/10"
                  >
                    <Eye className="h-3.5 w-3.5" aria-hidden="true" />
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DemoSectionCard>
  );
}
