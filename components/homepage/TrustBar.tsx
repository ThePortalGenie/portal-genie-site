import { Check } from "lucide-react";
import { homepage } from "@/content/homepage";
import { Container } from "@/components/ui/Container";

export function TrustBar() {
  return (
    <section className="border-y border-muted/15 bg-surface">
      <Container>
        <ul className="grid gap-6 py-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8 lg:py-10">
          {homepage.trustBar.items.map((item) => (
            <li key={item} className="flex items-center gap-3">
              <Check
                className="size-4 shrink-0 text-portal-teal"
                strokeWidth={2}
                aria-hidden="true"
              />
              <span className="text-sm text-portal-navy/75">{item}</span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
