import Image from "next/image";
import { BrowserFrame } from "./BrowserFrame";
import { FeatureCallout, type FeatureCalloutProps } from "./FeatureCallout";

export interface ProductShowcaseProps {
  title: string;
  description: string;
  image: string;
  alt: string;
  layout?: "left" | "right" | "center";
  showBrowserFrame?: boolean;
  showCopy?: boolean;
  featureCallouts?: FeatureCalloutProps[];
}

export function ProductShowcase({
  title,
  description,
  image,
  alt,
  layout = "left",
  showBrowserFrame = true,
  showCopy = true,
  featureCallouts = [],
}: ProductShowcaseProps) {
  const imageContent = (
    <div className="relative aspect-[16/10] w-full max-h-[280px] overflow-hidden bg-background sm:max-h-none">
      <Image
        src={image}
        alt={alt}
        fill
        className="object-contain object-top"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 896px, 896px"
      />
    </div>
  );

  const visual = showBrowserFrame ? (
    <BrowserFrame title="app.portalgenie.com">{imageContent}</BrowserFrame>
  ) : (
    <div className="overflow-hidden rounded-[24px] border border-muted/25 bg-surface shadow-[0_12px_40px_-12px_rgba(17,33,54,0.12)]">
      {imageContent}
    </div>
  );

  const callouts =
    featureCallouts.length > 0 ? (
      <div className="mt-4 flex flex-col gap-3 md:mt-0">
        {featureCallouts.map((callout) => (
          <FeatureCallout key={callout.title} {...callout} />
        ))}
      </div>
    ) : null;

  const copy = (
    <div
      className={
        layout === "center"
          ? "mx-auto max-w-2xl text-center"
          : "max-w-xl"
      }
    >
      <h2 className="text-3xl font-semibold tracking-tight text-portal-navy sm:text-4xl">
        {title}
      </h2>
      <p className="mt-4 text-base leading-relaxed text-portal-navy/75 sm:mt-6 sm:text-lg">
        {description}
      </p>
    </div>
  );

  const visualBlock = (
    <div className="relative w-full">
      {visual}
      {featureCallouts.length > 0 ? (
        <div className="pointer-events-none absolute inset-0 hidden md:block">
          <div className="pointer-events-auto relative h-full w-full">
            {featureCallouts.map((callout) => (
              <FeatureCallout key={callout.title} {...callout} />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );

  if (layout === "center") {
    if (!showCopy) {
      return (
        <div className="w-full">
          {visualBlock}
          {callouts ? <div className="mt-4 md:hidden">{callouts}</div> : null}
        </div>
      );
    }

    return (
      <article className="w-full">
        {copy}
        <div className="mx-auto mt-10 max-w-4xl lg:mt-12">{visualBlock}</div>
        {callouts ? (
          <div className="mx-auto mt-4 max-w-4xl md:hidden">{callouts}</div>
        ) : null}
      </article>
    );
  }

  const isImageLeft = layout === "right";

  return (
    <article className="grid w-full items-center gap-10 lg:grid-cols-2 lg:gap-16">
      <div className={isImageLeft ? "lg:order-1" : "lg:order-2"}>
        {visualBlock}
        {callouts ? <div className="md:hidden">{callouts}</div> : null}
      </div>
      <div className={isImageLeft ? "lg:order-2" : "lg:order-1"}>{copy}</div>
    </article>
  );
}
