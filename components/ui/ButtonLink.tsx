import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary";

type ButtonLinkProps = Omit<ComponentPropsWithoutRef<"a">, "href"> & {
  href: string;
  variant?: ButtonVariant;
  children: ReactNode;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "inline-flex h-11 items-center justify-center rounded-button bg-portal-blue px-6 text-sm font-medium text-white transition-colors duration-200 hover:bg-portal-blue/90",
  secondary:
    "inline-flex h-11 items-center justify-center rounded-button border border-muted/40 bg-surface px-6 text-sm font-medium text-portal-navy transition-colors duration-200 hover:border-muted/70 hover:bg-background",
};

function isExternalHref(href: string) {
  return /^https?:\/\//.test(href);
}

export function ButtonLink({
  href,
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonLinkProps) {
  const classes = `${variantClasses[variant]} ${className}`.trim();

  if (isExternalHref(href)) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...props}>
      {children}
    </Link>
  );
}
