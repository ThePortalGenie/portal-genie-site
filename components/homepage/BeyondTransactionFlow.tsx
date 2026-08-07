"use client";

import {
  ChevronDown,
  CreditCard,
  FileText,
  MessageSquare,
  Receipt,
  type LucideIcon,
} from "lucide-react";
import { homepage } from "@/content/homepage";
import { Card, CardDescription, CardTitle } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";
import { useScrollReveal, SCROLL_REVEAL_STAGGER_MS } from "@/hooks/useScrollReveal";

const iconMap: Record<string, LucideIcon> = {
  receipt: Receipt,
  "credit-card": CreditCard,
  "file-text": FileText,
  "message-square": MessageSquare,
};

export function BeyondTransactionFlow() {
  const { steps } = homepage.beyondTransaction;
  const { ref: flowRef, isVisible } = useScrollReveal(0.15);

  return (
    <div ref={flowRef} className="mx-auto w-full max-w-md lg:max-w-none">
      <ol className="flex flex-col items-stretch">
        {steps.map((step, index) => {
          const Icon = iconMap[step.icon];
          const isLast = index === steps.length - 1;

          return (
            <li key={step.title} className="flex flex-col items-center">
              <Card
                interactive
                reveal={isVisible}
                revealDelay={index * SCROLL_REVEAL_STAGGER_MS}
                className="w-full p-5 sm:p-6"
              >
                <IconBadge icon={Icon} className="mb-4" />
                <CardTitle className="text-base">{step.title}</CardTitle>
                <CardDescription className="mt-2 text-sm sm:text-sm">
                  {step.description}
                </CardDescription>
              </Card>

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
  );
}
