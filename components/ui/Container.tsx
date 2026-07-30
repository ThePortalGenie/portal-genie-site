import type { ComponentPropsWithoutRef, ElementType } from "react";

type ContainerProps<T extends ElementType = "div"> = {
  as?: T;
  children: React.ReactNode;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

export function Container<T extends ElementType = "div">({
  as,
  children,
  className = "",
  ...props
}: ContainerProps<T>) {
  const Component = as ?? "div";

  return (
    <Component
      className={`mx-auto w-full max-w-content px-6 md:px-8 ${className}`.trim()}
      {...props}
    >
      {children}
    </Component>
  );
}
