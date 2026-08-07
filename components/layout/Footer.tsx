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
import { LinkedInIcon, YouTubeIcon } from "@/components/layout/FooterSocialIcons";

const socialIcons = {
  linkedin: LinkedInIcon,
  youtube: YouTubeIcon,
} as const;
export function Footer() {
  const { brand, columns } = footerContent;

  return (
    <footer className="mt-auto border-t border-muted/15 bg-background">
      <Container>
        <div className="py-12 md:py-20 lg:py-24">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-10 lg:grid-cols-3 xl:grid-cols-5 xl:gap-8">
            <FooterColumn className="sm:col-span-2 lg:col-span-3 xl:col-span-1">
              <Link
                href={links.home}
                className="inline-flex shrink-0"
                aria-label={site.logo.ariaLabel}
              >
                <Image
                  src={site.logo.src}
                  alt={site.logo.alt}
                  width={site.logo.width}
                  height={site.logo.height}
                  className="h-auto max-h-[44px] w-auto"
                />
              </Link>
              <p className="mt-5 max-w-sm text-sm leading-relaxed text-portal-navy/75">
                {brand.description}
              </p>
              <p className="mt-4 text-xs font-medium tracking-wide text-portal-navy/50">
                {brand.xeroStatement}
              </p>
            </FooterColumn>

            <FooterColumn title={columns.product.title}>
              <ul className="space-y-3">
                {getVisibleFooterLinks([...columns.product.links]).map((link) => (
                  <li key={link.href}>
                    <TrackedFooterNavLink
                      href={link.href}
                      label={link.label}
                      className="text-sm text-portal-navy/70 transition-colors duration-200 hover:text-portal-blue"
                    />
                  </li>
                ))}
              </ul>
            </FooterColumn>

            <FooterColumn title={columns.resources.title}>
              <ul className="space-y-3">
                {getVisibleFooterLinks([...columns.resources.links]).map(
                  (link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-portal-navy/70 transition-colors duration-200 hover:text-portal-blue"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ),
                )}
              </ul>
            </FooterColumn>

            <FooterColumn title={columns.company.title}>
              <ul className="space-y-3">
                {getVisibleFooterLinks([...columns.company.links]).map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-portal-navy/70 transition-colors duration-200 hover:text-portal-blue"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </FooterColumn>

            <FooterColumn title={columns.connect.title}>
              <TrackedEmailLink
                href={`mailto:${columns.connect.email}`}
                emailDomain="theportalgenie.com"
                ctaLocation="footer"
                className="text-sm text-portal-navy/70 transition-colors duration-200 hover:text-portal-blue"
              >
                {columns.connect.email}
              </TrackedEmailLink>
              <ul className="mt-5 flex items-center gap-3">
                {columns.connect.social.map((item) => {
                  const Icon = socialIcons[item.icon];
                  const isExternal = item.href.startsWith("http");

                  return (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        className="inline-flex size-10 items-center justify-center rounded-button text-portal-navy/70 transition-colors duration-200 hover:bg-surface hover:text-portal-blue"
                        aria-label={item.label}
                        {...(isExternal
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                      >
                        <Icon className="size-5" aria-hidden="true" />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </FooterColumn>
          </div>

          <FooterBottom />
        </div>
      </Container>
    </footer>
  );
}
