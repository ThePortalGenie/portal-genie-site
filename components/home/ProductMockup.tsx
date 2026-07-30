export function ProductMockup() {
  return (
    <div
      className="overflow-hidden rounded-card border border-muted/25 bg-surface shadow-[0_12px_40px_-12px_rgba(17,33,54,0.12)]"
      aria-hidden="true"
    >
      {/* Browser chrome */}
      <div className="flex items-center gap-3 border-b border-muted/20 bg-background px-4 py-3">
        <div className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-muted/70" />
          <span className="size-2.5 rounded-full bg-muted/70" />
          <span className="size-2.5 rounded-full bg-muted/70" />
        </div>
        <div className="mx-auto flex h-7 w-full max-w-sm items-center rounded-button border border-muted/20 bg-surface px-3">
          <span className="truncate text-xs text-muted">app.portalgenie.com</span>
        </div>
      </div>

      {/* Application shell */}
      <div className="flex min-h-[320px] sm:min-h-[380px]">
        {/* Sidebar */}
        <aside className="hidden w-[72px] shrink-0 flex-col gap-3 border-r border-muted/20 bg-background p-3 sm:flex md:w-44 md:p-4">
          <div className="mb-2 h-3 w-16 rounded bg-portal-navy/15 md:w-24" />
          <div className="flex flex-col gap-2">
            <div className="h-8 rounded-button bg-portal-blue/10 ring-1 ring-portal-blue/20" />
            <div className="h-8 rounded-button bg-muted/20" />
            <div className="h-8 rounded-button bg-muted/20" />
            <div className="h-8 rounded-button bg-muted/20" />
            <div className="h-8 rounded-button bg-muted/20" />
          </div>
        </aside>

        {/* Main content */}
        <div className="flex flex-1 flex-col gap-4 p-4 sm:p-5">
          <div className="flex items-center justify-between gap-3">
            <div className="space-y-2">
              <div className="h-3 w-28 rounded bg-portal-navy/20" />
              <div className="h-2.5 w-40 rounded bg-muted/40" />
            </div>
            <div className="h-8 w-20 rounded-button bg-portal-blue/90 sm:w-24" />
          </div>

          {/* Stat cards */}
          <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
            <div className="rounded-button border border-muted/20 bg-background p-3 sm:p-4">
              <div className="mb-3 h-2 w-10 rounded bg-muted/50" />
              <div className="h-4 w-12 rounded bg-portal-navy/25" />
            </div>
            <div className="rounded-button border border-muted/20 bg-background p-3 sm:p-4">
              <div className="mb-3 h-2 w-10 rounded bg-muted/50" />
              <div className="h-4 w-14 rounded bg-portal-navy/25" />
            </div>
            <div className="rounded-button border border-muted/20 bg-background p-3 sm:p-4">
              <div className="mb-3 h-2 w-10 rounded bg-muted/50" />
              <div className="h-4 w-10 rounded bg-portal-teal/40" />
            </div>
          </div>

          {/* Content cards */}
          <div className="grid flex-1 grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="rounded-button border border-muted/20 bg-background p-4">
              <div className="mb-4 h-2.5 w-24 rounded bg-portal-navy/20" />
              <div className="space-y-2.5">
                <div className="h-2 w-full rounded bg-muted/30" />
                <div className="h-2 w-5/6 rounded bg-muted/30" />
                <div className="h-2 w-4/6 rounded bg-muted/30" />
                <div className="h-2 w-3/4 rounded bg-muted/30" />
              </div>
            </div>
            <div className="rounded-button border border-muted/20 bg-background p-4">
              <div className="mb-4 h-2.5 w-20 rounded bg-portal-navy/20" />
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="size-7 shrink-0 rounded-full bg-portal-blue/15" />
                  <div className="h-2 flex-1 rounded bg-muted/30" />
                </div>
                <div className="flex items-center gap-3">
                  <div className="size-7 shrink-0 rounded-full bg-portal-teal/20" />
                  <div className="h-2 flex-1 rounded bg-muted/30" />
                </div>
                <div className="flex items-center gap-3">
                  <div className="size-7 shrink-0 rounded-full bg-muted/40" />
                  <div className="h-2 flex-1 rounded bg-muted/30" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
