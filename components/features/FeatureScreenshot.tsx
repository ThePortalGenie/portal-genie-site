import Image from "next/image";

type FeatureScreenshotProps = {
  src: string;
  alt: string;
  aspectRatio?: string;
};

/**
 * Product screenshot inside BrowserFrame — mirrors the sizing and object-fit
 * behaviour used by ProductShowcase on the homepage so every Features section
 * presents imagery at a consistent scale.
 */
export function FeatureScreenshot({
  src,
  alt,
  aspectRatio = "3/2",
}: FeatureScreenshotProps) {
  return (
    <div
      className="relative w-full max-h-[280px] overflow-hidden bg-background sm:max-h-none"
      style={{ aspectRatio }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        quality={90}
        className="object-contain object-top"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
      />
    </div>
  );
}
