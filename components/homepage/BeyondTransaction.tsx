"use client";

import { useEffect, useRef, useState } from "react";
import {
  ChevronDown,
  CreditCard,
  FileText,
  MessageSquare,
  Receipt,
  type LucideIcon,
} from "lucide-react";
import { homepage } from "@/content/homepage";
import { Container } from "@/components/ui/Container";

const iconMap: Record<string, LucideIcon> = {
  receipt: Receipt,
  "credit-card": CreditCard,
  "file-text": FileText,
  "message-square": MessageSquare,
};

export function BeyondTransaction() {
  const { headline, description, steps } = homepage.beyondTransaction;
  const flowRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = flowRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-surface py-[72px] md:py-24 lg:py-[120px]">
      <Container>
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="max-w-xl lg:sticky lg:top-28">
            <h2 className="text-3xl font-semibold tracking-tight text-portal-navy sm:text-4xl">
              {headline}
            </h2>
            <p className="mt-6 text-base leading-relaxed text-portal-navy/75 sm:text-lg">
              {description}
            </p>
          </div>

          <div ref={flowRef} className="mx-auto w-full max-w-md lg:max-w-none">
            <ol className="flex flex-col items-stretch">
              {steps.map((step, index) => {
                const Icon = iconMap[step.icon];
                const isLast = index === steps.length - 1;

                return (
                  <li key={step.title} className="flex flex-col items-center">
                    <article
                      className={`w-full rounded-card border border-muted/20 bg-surface p-5 shadow-[0_8px_24px_-8px_rgba(17,33,54,0.08)] transition-all duration-500 motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none hover:-translate-y-0.5 hover:border-muted/30 sm:p-6 ${
                        isVisible
                          ? "translate-y-0 opacity-100"
                          : "translate-y-4 opacity-0"
                      }`}
                      style={{
                        transitionDelay: isVisible
                          ? `${index * 120}ms`
                          : "0ms",
                      }}
                    >
                      <div className="mb-4 inline-flex size-9 items-center justify-center rounded-button bg-portal-blue/10 text-portal-blue">
                        <Icon
                          className="size-4"
                          strokeWidth={2}
                          aria-hidden="true"
                        />
                      </div>
                      <h3 className="text-base font-semibold text-portal-navy">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-portal-navy/75">
                        {step.description}
                      </p>
                    </article>

                    {!isLast ? (
                      <div
                        className="flex flex-col items-center py-3"
                        aria-hidden="true"
                      >
                        <span className="h-5 w-px bg-muted/40" />
                        <ChevronDown
                          className="size-4 text-muted/70"
                          strokeWidth={2}
                        />
                        <span className="h-5 w-px bg-muted/40" />
                      </div>
                    ) : null}
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </Container>
    </section>
  );
}
