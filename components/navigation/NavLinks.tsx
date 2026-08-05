"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getVisibleMainNavItems } from "@/content/navigation";
import { navItemClasses } from "@/components/navigation/navStyles";

export function NavLinks() {
  const pathname = usePathname();
  const navItems = getVisibleMainNavItems();

  return (
    <ul className="flex items-center gap-6 xl:gap-7">
      {navItems.map((item) => {
        const isActive = pathname === item.href;

        return (
          <li key={item.href} className="shrink-0">
            <Link
              href={item.href}
              className={navItemClasses(isActive)}
              aria-current={isActive ? "page" : undefined}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
