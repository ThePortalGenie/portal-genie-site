import Image from "next/image";
import {
  genieFlowAsset,
  type GenieFlowVariant,
} from "@/config/genie-flow";

type GenieFlowProps = {
  variant: GenieFlowVariant;
  className?: string;
};

/**
 * Decorative Genie Flow background motif.
 *
 * Reuses the homepage hero artwork with CSS transforms, opacity and masks
 * so each page can feel like a different continuation of the same trail —
 * without duplicating large image files.
 *
 * Parent section must be `relative overflow-hidden`. Content should sit
 * above with `relative z-10`. Hidden below the `lg` breakpoint.
 */
export function GenieFlow({ variant, className = "" }: GenieFlowProps) {
  return (
    <div
      aria-hidden="true"
      className={`genie-flow genie-flow--${variant} pointer-events-none absolute inset-0 overflow-hidden ${className}`.trim()}
    >
      <div className="genie-flow__media">
        <Image
          src={genieFlowAsset.src}
          alt=""
          width={genieFlowAsset.width}
          height={genieFlowAsset.height}
          quality={genieFlowAsset.quality}
          loading="lazy"
          decoding="async"
          className="genie-flow__image"
          sizes="(max-width: 1023px) 1px, 70vw"
        />
      </div>
    </div>
  );
}
