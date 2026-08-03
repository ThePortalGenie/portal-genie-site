/**
 * Shared active-link styles for main nav and Features section nav.
 * Portal Genie blue text + semibold + subtle underline — no filled buttons.
 */
export function navItemClasses(active: boolean, options?: { compact?: boolean }) {
  const compact = options?.compact ?? false;

  if (active) {
    return compact
      ? "inline-flex h-9 items-center border-b-2 border-portal-blue px-3.5 text-sm font-semibold text-portal-blue transition-[color,border-color] duration-200 whitespace-nowrap"
      : "inline-flex items-center whitespace-nowrap border-b-2 border-portal-blue pb-0.5 text-sm font-semibold leading-none text-portal-blue transition-[color,border-color] duration-200";
  }

  return compact
    ? "inline-flex h-9 items-center border-b-2 border-transparent px-3.5 text-sm font-medium text-portal-navy/70 transition-[color,border-color,background-color] duration-200 hover:bg-background hover:text-portal-blue whitespace-nowrap"
    : "inline-flex items-center whitespace-nowrap border-b border-transparent pb-0.5 text-sm font-medium leading-none text-portal-navy transition-[color,border-color] duration-200 hover:border-portal-blue hover:text-portal-blue";
}

export function mobileNavItemClasses(active: boolean) {
  if (active) {
    return "block rounded-button border-l-2 border-portal-blue bg-background px-3 py-3 text-sm font-semibold text-portal-blue transition-colors duration-200";
  }

  return "block rounded-button border-l-2 border-transparent px-3 py-3 text-sm font-medium text-portal-navy transition-colors duration-200 hover:bg-background hover:text-portal-blue";
}
