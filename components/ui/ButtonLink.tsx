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
    "inline-flex min-h-11 items-center justify-center rounded-button bg-portal-blue px-5 py-2.5 text-center text-sm font-medium leading-snug text-white transition-colors duration-200 hover:bg-portal-blue/90 sm:px-6",
  secondary:
    "inline-flex min-h-11 items-center justify-center rounded-button border border-muted/40 bg-surface px-5 py-2.5 text-center text-sm font-medium leading-snug text-portal-navy transition-colors duration-200 hover:border-muted/70 hover:bg-background sm:px-6",
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
