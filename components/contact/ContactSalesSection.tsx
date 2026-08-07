import { Mail } from "lucide-react";
import { contactPage } from "@/content/contact";
import { TrackedButtonLink } from "@/components/analytics/TrackedButtonLink";
import { TrackedEmailLink } from "@/components/analytics/TrackedEmailLink";
import { ContactTrustRow } from "@/components/contact/ContactTrustRow";
import { ZohoContactForm } from "@/components/contact/ZohoContactForm";
import { Container } from "@/components/ui/Container";
import { GenieFlow } from "@/components/visuals/GenieFlow";

export function ContactSalesSection() {
  const { intro, demo } = contactPage;
  const mailtoHref = `mailto:${intro.email}`;

  return (
    <section
      className="relative overflow-hidden bg-background py-10 md:py-14 lg:py-16"
      aria-labelledby="contact-sales-heading"
    >
      <GenieFlow variant="soft" />
      <Container className="relative z-10">
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,43fr)_minmax(0,57fr)] lg:gap-10 xl:gap-12">
          <div className="flex min-w-0 flex-col">
            <h1
              id="contact-sales-heading"
              className="text-[1.875rem] font-semibold leading-[1.15] tracking-tight text-portal-navy sm:text-[2.25rem] sm:leading-tight lg:text-[2.5rem]"
            >
              {intro.headline}
            </h1>

            <div className="mt-5 max-w-[32rem] space-y-4 text-base leading-relaxed text-portal-navy/75 sm:mt-6 sm:text-lg sm:leading-relaxed">
              <p>{intro.description}</p>
              <p>{intro.followUp}</p>
            </div>

            <div className="mt-7 max-w-[32rem] rounded-card border border-portal-blue/15 bg-portal-blue/[0.04] px-4 py-3.5 shadow-[0_4px_16px_-8px_rgba(17,33,54,0.06)] sm:px-5 sm:py-4">
              <div className="flex items-start gap-3">
                <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-button bg-portal-blue/10 text-portal-blue">
                  <Mail className="size-4" strokeWidth={2} aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-portal-navy">
                    {intro.emailPrompt}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-portal-navy/75">
                    {intro.emailLead}{" "}
                    <TrackedEmailLink
                      href={mailtoHref}
                      emailDomain="theportalgenie.com"
                      destination="sales@theportalgenie.com"
                      ctaLocation="contact_page"
                      className="font-medium text-portal-blue transition-colors duration-200 hover:text-portal-blue/80"
                    >
                      {intro.email}
                    </TrackedEmailLink>
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 max-w-[32rem] border-t border-muted/15 pt-8">
              <h2 className="text-base font-semibold tracking-tight text-portal-navy sm:text-lg">
                {demo.headline}
              </h2>
              <p className="mt-2.5 text-sm leading-relaxed text-portal-navy/75 sm:text-base">
                {demo.description}
              </p>
              <TrackedButtonLink
                href={demo.cta.href}
                className="mt-5 w-full sm:w-auto"
                track={{ type: "book_demo", ctaLocation: "contact_page" }}
              >
                {demo.cta.label}
              </TrackedButtonLink>
            </div>

            <ContactTrustRow />
          </div>

          <div className="h-fit min-w-0 self-start rounded-card border border-portal-blue/20 bg-surface p-3 shadow-[0_16px_40px_-16px_rgba(0,119,190,0.12)] ring-1 ring-portal-blue/10 sm:p-4">
            <ZohoContactForm />
          </div>
        </div>
      </Container>
    </section>
  );
}
