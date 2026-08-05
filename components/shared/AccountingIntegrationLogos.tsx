import Image from "next/image";
import {
  accountingIntegrations,
  type AccountingIntegrationLogo,
} from "@/content/integrations";

type AccountingIntegrationLogosProps = {
  className?: string;
  /** Horizontal alignment of the logo row */
  align?: "center" | "start";
  /** Visual density — compact for homepage hero trust strip */
  size?: "default" | "compact";
};

const SIZE_CLASSES = {
  default: {
    logo: "h-10 sm:h-[52px] md:h-[70px]",
    divider: "h-10 sm:h-[52px] md:h-[64px]",
    gap: "gap-3 sm:gap-4 md:gap-6",
    secondaryGap: "gap-4 sm:gap-6 md:gap-8",
  },
  compact: {
    logo: "h-8 sm:h-9 md:h-11",
    divider: "h-8 sm:h-9 md:h-11",
    gap: "gap-2.5 sm:gap-3 md:gap-5",
    secondaryGap: "gap-3.5 sm:gap-4 md:gap-6",
  },
} as const;

/**
 * Integration logo row:
 * [Xero Connected App] | [QuickBooks] [Sage]
 */
export function AccountingIntegrationLogos({
  className = "",
  // Kept for call-site clarity; logos centre on mobile and left-align from md.
  align: _align = "center",
  size = "default",
}: AccountingIntegrationLogosProps) {
  const [xero, ...secondary] = accountingIntegrations.logos;
  const sizeClasses = SIZE_CLASSES[size];

  return (
    <div
      className={`flex max-w-full flex-wrap items-center justify-center md:justify-start ${sizeClasses.gap} ${className}`}
      aria-label="Accounting integrations"
    >
      <IntegrationLogo item={xero} logoClass={sizeClasses.logo} priority />

      <span
        aria-hidden="true"
        className={`w-px shrink-0 bg-portal-navy/15 ${sizeClasses.divider}`}
      />

      <ul className={`flex flex-wrap items-center ${sizeClasses.secondaryGap}`}>
        {secondary.map((item) => (
          <li key={item.name} className="flex items-center">
            <IntegrationLogo item={item} logoClass={sizeClasses.logo} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function IntegrationLogo({
  item,
  logoClass,
  priority = false,
}: {
  item: AccountingIntegrationLogo;
  logoClass: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={item.src}
      alt={item.alt}
      width={item.width}
      height={item.height}
      priority={priority}
      className={`${logoClass} w-auto max-w-full object-contain`}
      sizes="(max-width: 768px) 100px, 140px"
    />
  );
}
