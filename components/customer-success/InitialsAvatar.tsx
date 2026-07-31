type InitialsAvatarProps = {
  name: string;
  className?: string;
};

function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function InitialsAvatar({ name, className = "" }: InitialsAvatarProps) {
  return (
    <div
      className={`inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-portal-blue/10 text-sm font-semibold text-portal-blue ${className}`.trim()}
      aria-hidden="true"
    >
      {getInitials(name)}
    </div>
  );
}

export function getInitialsFromName(name: string): string {
  return getInitials(name);
}
