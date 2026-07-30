import Link from "next/link";
import { mainNavItems } from "@/content/navigation";

export function NavLinks() {
  return (
    <ul className="flex items-center gap-9">
      {mainNavItems.map((item) => (
        <li key={item.href}>
          <Link
            href={item.href}
            className="border-b border-transparent pb-0.5 text-sm font-medium text-portal-navy transition-[color,border-color] duration-200 hover:border-portal-blue hover:text-portal-blue"
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
