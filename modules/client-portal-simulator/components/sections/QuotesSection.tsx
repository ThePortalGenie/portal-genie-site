"use client";

import { useMemo, useState } from "react";
import { useDemoPortal } from "@/modules/client-portal-simulator/state/context";
import { formatDate, formatCurrency } from "@/modules/client-portal-simulator/utils/format";
import {
  PortalIconActions,
  PortalPageHeading,
  PortalPagination,
  PortalSearchInput,
  PortalStatusPill,
  PortalTable,
  PortalTableBody,
  PortalTableCell,
  PortalTableHead,
  PortalTableHeadCell,
  PortalTableRow,
} from "@/modules/client-portal-simulator/components/PortalPrimitives";

export function QuotesSection() {
  const { state, dispatch } = useDemoPortal();
  const { branding, quotes } = state;
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) {
      return quotes;
    }
    return quotes.filter((quote) => quote.number.toLowerCase().includes(q));
  }, [quotes, search]);

  return (
    <div className="min-h-0 flex-1 overflow-y-auto bg-white px-3 pb-3 pt-5 sm:px-4 sm:pb-4 min-[1024px]:pt-[30px]">
      <PortalPageHeading>Quotes</PortalPageHeading>
      <div className="mb-3">
        <PortalSearchInput value={search} onChange={setSearch} />
      </div>
      <PortalTable>
        <PortalTableHead branding={branding}>
          <PortalTableHeadCell branding={branding}>Quote ↑</PortalTableHeadCell>
          <PortalTableHeadCell branding={branding}>Amount</PortalTableHeadCell>
          <PortalTableHeadCell branding={branding}>Expiry</PortalTableHeadCell>
          <PortalTableHeadCell branding={branding}>Status</PortalTableHeadCell>
          <PortalTableHeadCell branding={branding}>Actions</PortalTableHeadCell>
        </PortalTableHead>
        <PortalTableBody branding={branding}>
          {filtered.map((quote) => (
            <PortalTableRow key={quote.id}>
              <PortalTableCell>{quote.number}</PortalTableCell>
              <PortalTableCell>{formatCurrency(quote.amount)}</PortalTableCell>
              <PortalTableCell>{formatDate(quote.expiryDate)}</PortalTableCell>
              <PortalTableCell>
                <PortalStatusPill
                  label={quote.status === "open" ? "Open" : quote.status}
                  tone={quote.status === "open" || quote.status === "sent" ? "open" : "neutral"}
                />
              </PortalTableCell>
              <PortalTableCell>
                <PortalIconActions
                  onView={() => dispatch({ type: "VIEW_QUOTE", quoteId: quote.id })}
                  onDownload={() => undefined}
                  onEdit={() => undefined}
                  onShare={() => undefined}
                />
              </PortalTableCell>
            </PortalTableRow>
          ))}
        </PortalTableBody>
      </PortalTable>
      <PortalPagination />
    </div>
  );
}

export function CreditNotesSection() {
  const { state, dispatch } = useDemoPortal();
  const { branding, creditNotes } = state;
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) {
      return creditNotes;
    }
    return creditNotes.filter((note) => note.number.toLowerCase().includes(q));
  }, [creditNotes, search]);

  return (
    <div className="min-h-0 flex-1 overflow-y-auto bg-white px-3 pb-3 pt-5 sm:px-4 sm:pb-4 min-[1024px]:pt-[30px]">
      <PortalPageHeading>Credit Notes</PortalPageHeading>
      <div className="mb-3">
        <PortalSearchInput value={search} onChange={setSearch} />
      </div>
      <PortalTable>
        <PortalTableHead branding={branding}>
          <PortalTableHeadCell branding={branding}>Credit Note ↑</PortalTableHeadCell>
          <PortalTableHeadCell branding={branding}>Amount</PortalTableHeadCell>
          <PortalTableHeadCell branding={branding}>Actions</PortalTableHeadCell>
        </PortalTableHead>
        <PortalTableBody branding={branding}>
          {filtered.map((note) => (
            <PortalTableRow key={note.id}>
              <PortalTableCell>{note.number}</PortalTableCell>
              <PortalTableCell>{formatCurrency(note.amount)}</PortalTableCell>
              <PortalTableCell>
                <PortalIconActions
                  onView={() =>
                    dispatch({ type: "VIEW_CREDIT_NOTE", creditNoteId: note.id })
                  }
                  onDownload={() => undefined}
                  onEdit={() => undefined}
                  onShare={() => undefined}
                />
              </PortalTableCell>
            </PortalTableRow>
          ))}
        </PortalTableBody>
      </PortalTable>
      <PortalPagination />
    </div>
  );
}
