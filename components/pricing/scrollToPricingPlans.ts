import { pricingPromotion } from "@/content/pricing";

export function scrollToPricingPlans(
  behavior: ScrollBehavior = "smooth",
) {
  document.getElementById(pricingPromotion.targetId)?.scrollIntoView({
    behavior,
    block: "start",
  });
}
