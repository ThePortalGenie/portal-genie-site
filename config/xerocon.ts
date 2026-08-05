import { links } from "@/config/links";

/**
 * Xerocon campaign configuration.
 *
 * Toggle `active` to switch between the live promotional page and the
 * expired-offer fallback. Pricing here is separate from /pricing.
 *
 * Do not invent promotional amounts — leave prices as null until confirmed.
 */
export const xeroconCampaign = {
  /** When false, /xerocon shows the expired-offer state (QR codes still work) */
  active: true,

  /**
   * Optional ISO date string (YYYY-MM-DD). When set and in the past,
   * the campaign is treated as inactive even if `active` is true.
   * Leave null until you decide to expire automatically.
   */
  offerExpiry: null as string | null,

  /** Dedicated campaign signup / claim-offer URL */
  signupUrl:
    "https://app.theportalgenie.com/app/register?registerPage=true&packageId=PRO_CUSTOMER_PORTAL",

  pricing: {
    currencyNote: "Prices shown in USD. Contact us for other currencies.",
    premium: {
      name: "Premium",
      description: "The complete core Portal Genie experience.",
      /** Base monthly promotional price — null until confirmed */
      monthlyPrice: null as number | null,
      includedUsers: 5,
      additionalUserPrice: null as number | null,
      features: [
        "Secure client portal connected to Xero",
        "Invoices, statements, quotes & credit notes",
        "Client document access and uploads",
        "Your logo and brand colours",
        "Internal notes & document statuses",
      ],
    },
    advanced: {
      name: "Advanced",
      description: "Everything in Premium, plus branding and automation.",
      monthlyPrice: null as number | null,
      includedUsers: 7,
      additionalUserPrice: null as number | null,
      features: [
        "Everything in Premium",
        "Your own portal web address",
        "Send emails from your own domain",
        "Schedule email campaigns",
        "Remove Portal Genie branding",
      ],
    },
  },

  links: {
    pricing: links.pricing,
    bookDemo: links.bookDemo,
    login: links.login,
    home: links.home,
  },
} as const;

export type XeroconCampaign = typeof xeroconCampaign;

/** True when the campaign should show the live promotional landing page */
export function isXeroconCampaignActive(
  campaign: typeof xeroconCampaign = xeroconCampaign,
  now: Date = new Date(),
): boolean {
  if (!campaign.active) {
    return false;
  }

  if (campaign.offerExpiry) {
    const expiry = new Date(`${campaign.offerExpiry}T23:59:59.999Z`);
    if (!Number.isNaN(expiry.getTime()) && now > expiry) {
      return false;
    }
  }

  return true;
}
