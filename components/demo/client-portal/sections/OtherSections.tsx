"use client";

import { useMemo, useState } from "react";
import { useDemoPortal } from "@/lib/demo/client-portal/context";
import { formatDate } from "@/lib/demo/client-portal/format";
import {
  PortalIconActions,
  PortalPageHeading,
  PortalPagination,
  PortalSearchInput,
  PortalTable,
  PortalTableBody,
  PortalTableCell,
  PortalTableHead,
  PortalTableHeadCell,
  PortalTableRow,
} from "@/components/demo/client-portal/PortalPrimitives";

export function AgreementsSection() {
  const { state, dispatch } = useDemoPortal();
  const { branding, agreements } = state;
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) {
      return agreements;
    }
    return agreements.filter((a) => a.title.toLowerCase().includes(q));
  }, [agreements, search]);

  return (
    <div className="min-h-0 flex-1 overflow-y-auto bg-white p-3 sm:p-4">
      <PortalPageHeading>Agreements</PortalPageHeading>
      <div className="mb-3">
        <PortalSearchInput value={search} onChange={setSearch} />
      </div>
      <PortalTable>
        <PortalTableHead branding={branding}>
          <PortalTableHeadCell branding={branding}>Name ↑</PortalTableHeadCell>
          <PortalTableHeadCell branding={branding}>Type</PortalTableHeadCell>
          <PortalTableHeadCell branding={branding}>Actions</PortalTableHeadCell>
        </PortalTableHead>
        <PortalTableBody branding={branding}>
          {filtered.map((agreement) => (
            <PortalTableRow key={agreement.id}>
              <PortalTableCell>{agreement.title}</PortalTableCell>
              <PortalTableCell>{agreement.docType}</PortalTableCell>
              <PortalTableCell>
                <PortalIconActions
                  onView={() =>
                    dispatch({ type: "VIEW_AGREEMENT", agreementId: agreement.id })
                  }
                  onDownload={() => undefined}
                  onEdit={() => undefined}
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

export function FinancialStatementsSection() {
  const { state, dispatch } = useDemoPortal();
  const { financialStatements } = state;

  return (
    <div className="min-h-0 flex-1 overflow-y-auto bg-white p-3 sm:p-4">
      <PortalPageHeading>Financial Statements</PortalPageHeading>
      <div className="space-y-4 text-[12px]">
        {financialStatements.map((folder) => (
          <div key={folder.id}>
            <p className="mb-2 font-bold text-[#112136]">{folder.year}</p>
            <ul className="divide-y divide-[#ececec] border border-[#ececec]">
              {folder.documents.map((doc) => (
                <li key={doc.id}>
                  <button
                    type="button"
                    onClick={() =>
                      dispatch({
                        type: "VIEW_FINANCIAL_DOC",
                        payload: { folderId: folder.id, docId: doc.id },
                      })
                    }
                    className="flex w-full px-3 py-2 text-left hover:bg-[#f9fcff]"
                  >
                    {doc.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export function NotesSection() {
  const { state } = useDemoPortal();
  const { branding, notes } = state;
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) {
      return notes;
    }
    return notes.filter(
      (note) =>
        note.name.toLowerCase().includes(q) ||
        note.author.toLowerCase().includes(q),
    );
  }, [notes, search]);

  return (
    <div className="min-h-0 flex-1 overflow-y-auto bg-white p-3 sm:p-4">
      <PortalPageHeading>Notes</PortalPageHeading>
      <div className="mb-3">
        <PortalSearchInput value={search} onChange={setSearch} />
      </div>
      <PortalTable minWidth="680px">
        <PortalTableHead branding={branding}>
          <PortalTableHeadCell branding={branding}>Created Date</PortalTableHeadCell>
          <PortalTableHeadCell branding={branding}>Note Name</PortalTableHeadCell>
          <PortalTableHeadCell branding={branding}>Created By</PortalTableHeadCell>
          <PortalTableHeadCell branding={branding}>Actions</PortalTableHeadCell>
        </PortalTableHead>
        <PortalTableBody branding={branding}>
          {filtered.map((note) => (
            <PortalTableRow key={note.id}>
              <PortalTableCell>{formatDate(note.date)}</PortalTableCell>
              <PortalTableCell>{note.name}</PortalTableCell>
              <PortalTableCell>{note.author}</PortalTableCell>
              <PortalTableCell>
                <PortalIconActions onView={() => undefined} />
              </PortalTableCell>
            </PortalTableRow>
          ))}
        </PortalTableBody>
      </PortalTable>
      <PortalPagination />
    </div>
  );
}
