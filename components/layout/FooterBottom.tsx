"use client";

import Link from "next/link";
import { ConsentPreferencesTrigger } from "@/components/analytics/ConsentPreferencesTrigger";
import { footerContent, getVisibleFooterLinks } from "@/content/footer";

const footerLinkClass =
  "text-sm text-white/75 transition-colors duration-200 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

export function FooterBottom() {
  const { bottom } = footerContent;

  return (
    <div className="mt-10 border-t border-white/15 pt-6 sm:mt-12 sm:pt-8">
      <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:text-left">
        <p className="text-sm text-white/70">{bottom.copyright}</p>

        <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          {getVisibleFooterLinks([...bottom.links]).map((link) => (
            <li key={link.href}>
              <Link href={link.href} className={footerLinkClass}>
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <ConsentPreferencesTrigger className={footerLinkClass} />
          </li>
        </ul>
      </div>

      <p className="mt-4 text-center text-sm text-white/60 sm:text-right">
        {bottom.tagline}
      </p>
    </div>
  );
}
