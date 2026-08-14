import Image from "next/image";
import Link from "next/link";
import { links } from "@/config/links";
import { site } from "@/config/site";
import { footerContent, getVisibleFooterLinks } from "@/content/footer";
import { TrackedEmailLink } from "@/components/analytics/TrackedEmailLink";
import { TrackedFooterNavLink } from "@/components/analytics/TrackedFooterNavLink";
import { Container } from "@/components/ui/Container";
import { FooterBottom } from "@/components/layout/FooterBottom";
import { FooterColumn } from "@/components/layout/FooterColumn";
import {
  FacebookBrandIcon,
  InstagramBrandIcon,
  LinkedInBrandIcon,
} from "@/components/layout/FooterSocialIcons";

const socialIcons = {
  facebook: FacebookBrandIcon,
  linkedin: LinkedInBrandIcon,
  instagram: InstagramBrandIcon,
} as const;

const footerNavLinkClass =
  "text-sm text-white/80 transition-colors duration-200 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

const footerSocialButtonClass =
  "inline-flex size-10 items-center justify-center rounded-button transition-transform duration-200 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

export function Footer() {
  const { brand, columns } = footerContent;

  return (
    <footer className="mt-auto bg-[#112136] text-white">
      <Container>
        <div className="py-12 md:py-20 lg:py-24">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-10 lg:grid-cols-12 lg:gap-8">
            <FooterColumn theme="dark" className="sm:col-span-2 lg:col-span-4">
              <Link
                href={links.home}
                className="inline-flex shrink-0 rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                aria-label={site.logo.ariaLabel}
              >
                <Image
                  src={brand.logo.src}
                  alt={brand.logo.alt}
                  width={brand.logo.width}
                  height={brand.logo.height}
                  className="h-auto max-h-[44px] w-auto max-w-[200px]"
                />
              </Link>
              <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/75">
                {brand.description}
              </p>
              <p className="mt-4 text-xs font-medium tracking-wide text-white/60">
                {brand.xeroStatement}
              </p>

              <div className="mt-6">
                <p className="text-sm font-semibold text-white">
                  {brand.socialHeading}
                </p>
                <ul className="mt-3 flex items-center gap-3">
                  {columns.connect.social.map((item) => {
                    const Icon = socialIcons[item.icon];

                    return (
                      <li key={item.icon}>
                        <a
                          href={item.href}
                          className={footerSocialButtonClass}
                          aria-label={item.ariaLabel}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Icon className="size-6" />
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </FooterColumn>

            <FooterColumn
              theme="dark"
              title={columns.product.title}
              className="lg:col-span-2"
            >
              <ul className="space-y-3">
                {getVisibleFooterLinks([...columns.product.links]).map((link) => (
                  <li key={link.href}>
                    <TrackedFooterNavLink
                      href={link.href}
                      label={link.label}
                      className={footerNavLinkClass}
                    />
                  </li>
                ))}
              </ul>
            </FooterColumn>

            <FooterColumn
              theme="dark"
              title={columns.resources.title}
              className="lg:col-span-2"
            >
              <ul className="space-y-3">
                {getVisibleFooterLinks([...columns.resources.links]).map(
                  (link) => (
                    <li key={link.href}>
                      <Link href={link.href} className={footerNavLinkClass}>
                        {link.label}
                      </Link>
                    </li>
                  ),
                )}
              </ul>
            </FooterColumn>

            <FooterColumn
              theme="dark"
              title={columns.company.title}
              className="lg:col-span-2"
            >
              <ul className="space-y-3">
                {getVisibleFooterLinks([...columns.company.links]).map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={footerNavLinkClass}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </FooterColumn>

            <FooterColumn
              theme="dark"
              title={columns.connect.title}
              className="lg:col-span-2"
            >
              <TrackedEmailLink
                href={`mailto:${columns.connect.email}`}
                emailDomain="theportalgenie.com"
                ctaLocation="footer"
                className={footerNavLinkClass}
              >
                {columns.connect.email}
              </TrackedEmailLink>
            </FooterColumn>
          </div>

          <FooterBottom />
        </div>
      </Container>
    </footer>
  );
}
