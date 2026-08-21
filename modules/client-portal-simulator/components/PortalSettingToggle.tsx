"use client";

type DemoToggleProps = {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
  ariaLabel: string;
};

export function DemoToggle({ enabled, onChange, ariaLabel }: DemoToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      aria-label={ariaLabel}
      onClick={() => onChange(!enabled)}
      className={`relative h-6 w-10 shrink-0 rounded-full transition-colors ${enabled ? "bg-portal-blue" : "bg-muted/40"}`}
    >
      <span
        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${enabled ? "left-[18px]" : "left-0.5"}`}
      />
    </button>
  );
}

type PortalSettingToggleProps = {
  title: string;
  description: string;
  enabled: boolean;
  onChange: (enabled: boolean) => void;
  ariaLabel: string;
  /** When true, omit outer card and heading — for use inside CustomiseSection. */
  embedded?: boolean;
};

export function PortalSettingToggle({
  title,
  description,
  enabled,
  onChange,
  ariaLabel,
  embedded = false,
}: PortalSettingToggleProps) {
  const controls = (
    <>
      <p className={`text-xs leading-relaxed text-portal-navy/65 ${embedded ? "" : "mt-1.5"}`}>
        {description}
      </p>
      <div className={`flex items-center gap-3 text-sm font-medium ${embedded ? "mt-4" : "mt-4"}`}>
        <span className={!enabled ? "text-portal-navy" : "text-portal-navy/45"}>Disable</span>
        <DemoToggle enabled={enabled} onChange={onChange} ariaLabel={ariaLabel} />
        <span className={enabled ? "text-portal-navy" : "text-portal-navy/45"}>Enable</span>
      </div>
    </>
  );

  if (embedded) {
    return controls;
  }

  return (
    <article className="rounded-lg border border-muted/20 bg-background/40 p-4">
      <h4 className="text-sm font-semibold text-portal-navy">{title}</h4>
      {controls}
    </article>
  );
}
