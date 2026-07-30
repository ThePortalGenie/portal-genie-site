import type { ReactNode } from "react";
import { Container } from "./Container";

type SectionBackground = "background" | "surface";

type SectionProps = {
  children: ReactNode;
  background?: SectionBackground;
  className?: string;
};

const backgroundClasses: Record<SectionBackground, string> = {
  background: "bg-background",
  surface: "bg-surface",
};

export function Section({
  children,
  background = "background",
  className = "",
}: SectionProps) {
  return (
    <section
      className={`${backgroundClasses[background]} py-[72px] md:py-24 lg:py-[120px] ${className}`.trim()}
    >
      <Container>{children}</Container>
    </section>
  );
}
