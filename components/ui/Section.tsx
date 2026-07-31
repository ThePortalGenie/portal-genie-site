import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { Container } from "./Container";

type SectionBackground = "background" | "surface";

type SectionProps = ComponentPropsWithoutRef<"section"> & {
  children: ReactNode;
  background?: SectionBackground;
};

const backgroundClasses: Record<SectionBackground, string> = {
  background: "bg-background",
  surface: "bg-surface",
};

export function Section({
  children,
  background = "background",
  className = "",
  ...props
}: SectionProps) {
  return (
    <section
      className={`${backgroundClasses[background]} py-[72px] md:py-24 lg:py-[120px] ${className}`.trim()}
      {...props}
    >
      <Container>{children}</Container>
    </section>
  );
}
