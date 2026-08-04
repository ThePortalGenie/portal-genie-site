/**
 * Accounting platform integrations shown in the homepage hero.
 * Xero Connected App (logo + badge) is one asset; QuickBooks and Sage
 * Business Cloud are additional platforms — not Connected App claims.
 */
export const accountingIntegrations = {
  logos: [
    {
      name: "Xero",
      src: "/images/logos/xero-connected-app-badge.png",
      alt: "Xero Connected App",
      width: 1522,
      height: 789,
    },
    {
      name: "QuickBooks",
      src: "/images/integrations/quickbooks.png",
      alt: "QuickBooks",
      width: 145,
      height: 145,
    },
    {
      name: "Sage Business Cloud",
      src: "/images/integrations/sage-business-cloud.png",
      alt: "Sage Business Cloud",
      width: 145,
      height: 145,
    },
  ],
} as const;

export type AccountingIntegrationLogo =
  (typeof accountingIntegrations.logos)[number];
