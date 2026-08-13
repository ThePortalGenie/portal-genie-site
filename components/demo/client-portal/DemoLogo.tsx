type DemoLogoProps = {
  companyName: string;
  logoUrl: string | null;
  size?: "sm" | "md";
};

function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function DemoLogo({ companyName, logoUrl, size = "md" }: DemoLogoProps) {
  const dimension = size === "sm" ? "h-9 w-9" : "h-12 w-12";

  if (logoUrl) {
    return (
      <img
        src={logoUrl}
        alt={`${companyName} logo`}
        className={`${dimension} rounded-lg object-contain bg-white/10`}
      />
    );
  }

  return (
    <div
      className={`${dimension} flex items-center justify-center rounded-lg bg-white/10 text-sm font-bold text-white`}
      aria-hidden="true"
    >
      {getInitials(companyName)}
    </div>
  );
}
