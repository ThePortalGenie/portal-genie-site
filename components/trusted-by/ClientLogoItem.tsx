import Image from "next/image";
import type { ClientLogo } from "@/content/client-logos";

type ClientLogoItemProps = {
  logo: ClientLogo;
  compact?: boolean;
};

export function ClientLogoItem({ logo, compact = false }: ClientLogoItemProps) {
  return (
    <li className="flex items-center justify-center">
      <div
        className={`flex items-center justify-center ${
          compact
            ? "h-12 w-full max-w-[120px] px-3 md:h-14 md:max-w-[140px]"
            : "h-14 w-full max-w-[140px] px-4 md:h-16 md:max-w-[160px] lg:max-w-[180px]"
        }`.trim()}
      >
        <Image
          src={logo.image}
          alt={logo.alt}
          width={180}
          height={72}
          className={`max-h-full w-auto max-w-full object-contain opacity-80 transition-opacity duration-200 hover:opacity-100 ${
            compact ? "max-h-10 md:max-h-12" : "max-h-12 md:max-h-14 lg:max-h-16"
          }`.trim()}
        />
      </div>
    </li>
  );
}
