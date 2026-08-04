import Image from "next/image";
import {
  accountingIntegrations,
  type AccountingIntegrationLogo,
} from "@/content/integrations";

type AccountingIntegrationLogosProps = {
  className?: string;
};

/** Shared display height — equal visual prominence; width follows aspect ratio. */
const LOGO_HEIGHT_CLASS = "h-[52px] md:h-[70px]";

/**
 * Homepage hero integration row:
 * [Xero Connected App] | [QuickBooks] [Sage]
 */
export function AccountingIntegrationLogos({
  className = "",
}: AccountingIntegrationLogosProps) {
  const [xero, ...secondary] = accountingIntegrations.logos;

  return (
    <div
      className={`flex items-center justify-center gap-4 md:justify-start md:gap-6 ${className}`}
      aria-label="Accounting integrations"
    >
      <IntegrationLogo item={xero} priority />

      <span
        aria-hidden="true"
        className="h-[52px] w-px shrink-0 bg-portal-navy/15 md:h-[64px]"
      />

      <ul className="flex items-center gap-6 md:gap-8">
        {secondary.map((item) => (
          <li key={item.name} className="flex items-center">
            <IntegrationLogo item={item} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function IntegrationLogo({
  item,
  priority = false,
}: {
  item: AccountingIntegrationLogo;
  priority?: boolean;
}) {
  return (
    <Image
      src={item.src}
      alt={item.alt}
      width={item.width}
      height={item.height}
      priority={priority}
      className={`${LOGO_HEIGHT_CLASS} w-auto object-contain`}
      sizes="(max-width: 768px) 120px, 160px"
    />
  );
}
