import { links } from "@/config/links";

/** Controlled answer when no Knowledge Base article is sufficiently relevant. */
export function getLowRelevanceAnswer(): string {
  return [
    "I don't have enough approved information in the Portal Genie Knowledge Base to answer that confidently.",
    "For product questions, you can browse our Knowledge Base, book a demo, or contact our team.",
    `Knowledge Base: ${links.resources}`,
    `Book a demo: ${links.bookDemo}`,
    `Contact: ${links.contact}`,
  ].join(" ");
}
