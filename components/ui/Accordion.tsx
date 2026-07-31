"use client";

import { ChevronDown } from "lucide-react";
import { useId, useState } from "react";

export type AccordionItem = {
  question: string;
  answer: string;
};

type AccordionProps = {
  items: readonly AccordionItem[];
};

export function Accordion({ items }: AccordionProps) {
  const baseId = useId();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-muted/20 border-y border-muted/20">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const panelId = `${baseId}-panel-${index}`;
        const buttonId = `${baseId}-button-${index}`;

        return (
          <div key={item.question}>
            <h3>
              <button
                id={buttonId}
                type="button"
                className="flex w-full items-center justify-between gap-4 py-5 text-left text-base font-semibold text-portal-navy transition-colors duration-200 hover:text-portal-blue"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
              >
                <span>{item.question}</span>
                <ChevronDown
                  className={`size-4 shrink-0 text-muted transition-transform duration-200 motion-reduce:transition-none ${
                    isOpen ? "rotate-180" : ""
                  }`}
                  strokeWidth={2}
                  aria-hidden="true"
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className="pb-5 text-sm leading-relaxed text-portal-navy/75 sm:text-base"
            >
              {item.answer}
            </div>
          </div>
        );
      })}
    </div>
  );
}
