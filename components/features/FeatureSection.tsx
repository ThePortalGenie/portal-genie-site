import Image from "next/image";
import Link from "next/link";
import { Check, Globe, Link2, Mail, Share2 } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { BrowserFrame } from "@/components/ui/product-showcase/BrowserFrame";
import { ScrollReveal } from "@/components/features/ScrollReveal";
import { FeatureScreenshot } from "@/components/features/FeatureScreenshot";

type PortalLinkCallout = {
  heading: string;
  body: string;
  points: readonly string[];
};

const portalLinkPillMeta = [
  { label: "Website Client Login", icon: Globe },
  { label: "Customer emails", icon: Mail },
  { label: "Share directly", icon: Share2 },
] as const;

type RelatedLink = {
  label: string;
  href: string;
};

type FeatureSectionProps = {
  id: string;
  title: string;
  description: string;
  benefits: readonly string[];
  portalLinkCallout?: PortalLinkCallout;
  relatedLink?: RelatedLink;
  screenshot: {
    src: string;
    alt: string;
    aspectRatio: string;
    framed?: boolean;
    emphasis?: "visual";
  };
  imagePosition: "left" | "right";
  background?: "background" | "surface";
  /** Optional section class overrides (e.g. compact top padding for the first block) */
  className?: string;
};

export function FeatureSection({
  id,
  title,
  description,
  benefits,
  portalLinkCallout,
  relatedLink,
  screenshot,
  imagePosition,
  background = "background",
  className = "",
}: FeatureSectionProps) {
  const isImageRight = imagePosition === "right";
  const showBrowserFrame = screenshot.framed !== false;
  const visualEmphasis = screenshot.emphasis === "visual";

  const gridClass = visualEmphasis
    ? "grid items-center gap-8 md:gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-12 xl:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] xl:gap-14"
    : "grid items-center gap-8 md:gap-12 lg:grid-cols-2 lg:gap-16";

  return (
    <Section
      id={id}
      background={background}
      className={`scroll-mt-[7.5rem] sm:scroll-mt-[8.5rem] lg:scroll-mt-36 ${className}`.trim()}
    >
      <ScrollReveal>
        <div className={gridClass}>
          <div
            className={
              showBrowserFrame
                ? isImageRight
                  ? "order-2 lg:order-1"
                  : "order-2 lg:order-2"
                : isImageRight
                  ? "order-1 lg:order-1"
                  : "order-1 lg:order-2"
            }
          >
            <SectionHeader align="left" title={title} description={description} />

            <ul className="mt-6 flex flex-col gap-2 sm:mt-8 sm:gap-2.5">
              {benefits.map((benefit) => (
                <li
                  key={benefit}
                  className="flex items-start gap-2.5 text-sm text-portal-navy/70 sm:text-base"
                >
                  <Check
                    className="mt-0.5 size-4 shrink-0 text-portal-teal"
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>

            {relatedLink ? (
              <p className="mt-5 text-sm sm:mt-6">
                <Link
                  href={relatedLink.href}
                  className="font-medium text-portal-blue transition-colors duration-200 hover:text-portal-blue/80"
                >
                  {relatedLink.label}
                </Link>
              </p>
            ) : null}

            {portalLinkCallout ? (
              <aside className="mt-5 rounded-card border border-portal-blue/20 bg-surface p-3.5 shadow-[0_4px_16px_-8px_rgba(17,33,54,0.06)] sm:mt-6 sm:p-4">
                <div className="flex items-start gap-3">
                  <div
                    className="inline-flex size-8 shrink-0 items-center justify-center rounded-button bg-portal-blue/10 text-portal-blue"
                    aria-hidden="true"
                  >
                    <Link2 className="size-4" strokeWidth={2} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-semibold leading-snug text-portal-navy sm:text-[0.9375rem]">
                      {portalLinkCallout.heading}
                    </h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-portal-navy/70 sm:text-sm">
                      {portalLinkCallout.body}
                    </p>
                  </div>
                </div>
                <ul className="mt-3 grid grid-cols-1 gap-2 sm:mt-3.5 sm:grid-cols-3">
                  {portalLinkCallout.points.map((point, index) => {
                    const pill = portalLinkPillMeta[index];
                    const PillIcon = pill?.icon ?? Check;

                    return (
                      <li
                        key={point}
                        aria-label={point}
                        className="flex min-w-0 items-center gap-2 rounded-button border border-muted/20 bg-background px-2.5 py-2 text-portal-navy/80 sm:px-3 sm:py-2.5"
                      >
                        <PillIcon
                          className="size-3.5 shrink-0 text-portal-blue"
                          strokeWidth={2}
                          aria-hidden="true"
                        />
                        <span className="text-xs leading-snug sm:text-[0.8125rem]">
                          {pill?.label ?? point}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </aside>
            ) : null}
          </div>

          <div
            className={
              showBrowserFrame
                ? isImageRight
                  ? "order-1 lg:order-2"
                  : "order-1 lg:order-1"
                : isImageRight
                  ? "order-2 lg:order-2"
                  : "order-2 lg:order-1"
            }
          >
            {showBrowserFrame ? (
              <BrowserFrame>
                <FeatureScreenshot
                  src={screenshot.src}
                  alt={screenshot.alt}
                  aspectRatio={screenshot.aspectRatio}
                />
              </BrowserFrame>
            ) : (
              <div className="w-full overflow-hidden">
                <Image
                  src={screenshot.src}
                  alt={screenshot.alt}
                  width={1536}
                  height={1024}
                  quality={90}
                  className="h-auto w-full max-w-full object-contain"
                  sizes={
                    visualEmphasis
                      ? "(max-width: 1023px) 100vw, 55vw"
                      : "(max-width: 1023px) 100vw, 50vw"
                  }
                />
              </div>
            )}
          </div>
        </div>
      </ScrollReveal>
    </Section>
  );
}
