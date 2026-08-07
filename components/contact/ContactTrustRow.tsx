import { Clock, ShieldCheck, Users, type LucideIcon } from "lucide-react";
import { contactPage } from "@/content/contact";

const trustIcons: Record<
  (typeof contactPage.trust)[number]["icon"],
  LucideIcon
> = {
  shield: ShieldCheck,
  clock: Clock,
  users: Users,
};

export function ContactTrustRow() {
  return (
    <ul className="mt-8 grid gap-4 sm:grid-cols-3 sm:gap-3">
      {contactPage.trust.map((item) => {
        const Icon = trustIcons[item.icon];

        return (
          <li key={item.title} className="flex items-start gap-2.5">
            <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-button bg-portal-blue/10 text-portal-blue">
              <Icon className="size-3.5" strokeWidth={2} aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <p className="text-sm font-medium leading-snug text-portal-navy">
                {item.title}
              </p>
              <p className="mt-0.5 text-xs leading-snug text-portal-navy/60">
                {item.description}
              </p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
