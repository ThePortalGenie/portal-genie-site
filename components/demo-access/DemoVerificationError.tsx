import Link from "next/link";

type DemoVerificationErrorProps = {
  reason: "missing" | "invalid" | "expired";
};

const COPY: Record<DemoVerificationErrorProps["reason"], { title: string; body: string }> = {
  missing: {
    title: "Verification link invalid",
    body: "This verification link is not valid. Request a new link to access the Portal Genie demo.",
  },
  invalid: {
    title: "Verification link invalid",
    body: "We couldn't verify this link. Request a new link to access the Portal Genie demo.",
  },
  expired: {
    title: "Verification link expired",
    body: "This verification link is no longer valid. Request a new link to access the Portal Genie demo.",
  },
};

export function DemoVerificationError({ reason }: DemoVerificationErrorProps) {
  const content = COPY[reason];

  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-10">
      <div className="w-full max-w-md rounded-card border border-muted/20 bg-surface p-8 text-center shadow-[0_8px_30px_-12px_rgba(17,33,54,0.18)]">
        <h1 className="text-xl font-bold text-portal-navy">{content.title}</h1>
        <p className="mt-4 text-sm leading-relaxed text-portal-navy/70">{content.body}</p>
        <Link
          href="/demo/client-portal"
          className="mt-6 inline-flex w-full items-center justify-center rounded-button bg-portal-blue px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-portal-blue/90"
        >
          Request New Verification Link
        </Link>
      </div>
    </div>
  );
}
