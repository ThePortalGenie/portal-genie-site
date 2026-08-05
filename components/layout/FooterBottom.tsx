import { footerContent } from "@/content/footer";

export function FooterBottom() {
  const { bottom } = footerContent;

  return (
    <div className="mt-10 flex flex-col items-center gap-3 border-t border-muted/15 pt-6 text-center sm:mt-12 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:pt-8 sm:text-left">
      <p className="text-sm text-portal-navy/60">{bottom.copyright}</p>
      <p className="text-sm text-portal-navy/60">{bottom.tagline}</p>
    </div>
  );
}
