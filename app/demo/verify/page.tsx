import { redirect } from "next/navigation";
import { DemoVerificationError } from "@/components/demo-access/DemoVerificationError";

const VERIFY_ERROR_REASONS = ["missing", "invalid", "expired"] as const;

type VerifyErrorReason = (typeof VERIFY_ERROR_REASONS)[number];

function parseVerifyErrorReason(error: string | undefined): VerifyErrorReason | null {
  if (!error) {
    return null;
  }

  return VERIFY_ERROR_REASONS.includes(error as VerifyErrorReason)
    ? (error as VerifyErrorReason)
    : "expired";
}

export default async function DemoVerifyPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string; error?: string }>;
}) {
  const params = await searchParams;

  const errorReason = parseVerifyErrorReason(params.error);
  if (errorReason) {
    return <DemoVerificationError reason={errorReason} />;
  }

  const token = params.token?.trim();
  if (!token) {
    return <DemoVerificationError reason="missing" />;
  }

  redirect(`/api/demo/verify?token=${encodeURIComponent(token)}`);
}
