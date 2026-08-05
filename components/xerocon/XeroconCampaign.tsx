import { XeroconFinalCta } from "@/components/xerocon/XeroconFinalCta";
import { XeroconHeader } from "@/components/xerocon/XeroconHeader";
import { XeroconHero } from "@/components/xerocon/XeroconHero";
import { XeroconHowItWorks } from "@/components/xerocon/XeroconHowItWorks";
import { XeroconPricing } from "@/components/xerocon/XeroconPricing";
import { XeroconValue } from "@/components/xerocon/XeroconValue";

export function XeroconCampaign() {
  return (
    <div className="flex min-h-full flex-col bg-background">
      <XeroconHeader />
      <main>
        <XeroconHero />
        <XeroconValue />
        <XeroconHowItWorks />
        <XeroconPricing />
        <XeroconFinalCta />
      </main>
    </div>
  );
}
