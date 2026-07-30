import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

type ButtonVariant = "primary" | "secondary";

type ButtonLinkProps = ComponentPropsWithoutRef<typeof Link> & {
  variant?: ButtonVariant;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "inline-flex h-11 items-center justify-center rounded-button bg-portal-blue px-6 text-sm font-medium text-white transition-colors duration-200 hover:bg-portal-blue/90",
  secondary:
    "inline-flex h-11 items-center justify-center rounded-button border border-muted/40 bg-surface px-6 text-sm font-medium text-portal-navy transition-colors duration-200 hover:border-muted/70 hover:bg-background",
};

export function ButtonLink({
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={`${variantClasses[variant]} ${className}`.trim()}
      {...props}
    >
      {children}
    </Link>
  );
}
