import Link from "next/link";
import { mainNavItems } from "@/content/navigation";

export function NavLinks() {
  return (
    <ul className="flex items-center gap-6 xl:gap-7">
      {mainNavItems.map((item) => (
        <li key={item.href} className="shrink-0">
          <Link
            href={item.href}
            className="inline-flex items-center whitespace-nowrap border-b border-transparent pb-0.5 text-sm font-medium leading-none text-portal-navy transition-[color,border-color] duration-200 hover:border-portal-blue hover:text-portal-blue"
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
