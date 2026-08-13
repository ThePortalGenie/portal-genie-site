import { redirect } from "next/navigation";
import { DemoVerificationError } from "@/components/demo-access/DemoVerificationError";
import { verifyDemoAccessToken } from "@/lib/demo-auth/verify-token";

export default async function DemoVerifyPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const params = await searchParams;
  const result = await verifyDemoAccessToken(params.token);

  if (result.ok || result.reason === "already_verified") {
    redirect("/demo/client-portal");
  }

  const reason =
    result.reason === "missing" || result.reason === "invalid" || result.reason === "expired"
      ? result.reason
      : "expired";

  return <DemoVerificationError reason={reason} />;
}
