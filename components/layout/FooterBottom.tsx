import { footerContent } from "@/content/footer";

export function FooterBottom() {
  const { bottom } = footerContent;

  return (
    <div className="mt-12 flex flex-col gap-4 border-t border-muted/15 pt-8 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
      <p className="text-sm text-portal-navy/60">{bottom.copyright}</p>
      <p className="text-sm text-portal-navy/60">{bottom.tagline}</p>
    </div>
  );
}
