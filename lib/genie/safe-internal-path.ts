import { links } from "@/config/links";

const EXACT_PATHS = new Set<string>([
  links.home,
  links.features,
  links.pricing,
  links.pricingPlans,
  links.bookDemo,
  links.contact,
  links.resources,
  links.whyThePortalGenie,
  links.customerSuccess,
]);

/** Returns true for approved internal Portal Genie routes only. */
export function isSafeInternalPath(path: string): boolean {
  const trimmed = path.trim();

  if (!trimmed.startsWith("/") || trimmed.startsWith("//")) {
    return false;
  }

  const [pathname] = trimmed.split(/(?=#)/);

  if (pathname === links.home || EXACT_PATHS.has(pathname)) {
    return true;
  }

  if (pathname.startsWith("/resources/")) {
    return /^\/resources\/[\w-]+(?:\/[\w-]+)*$/.test(pathname);
  }

  return false;
}
