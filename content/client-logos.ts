import { links } from "@/config/links";

export interface ClientLogo {
  name: string;
  image: string;
  alt: string;
}

export type TrustedByVariant = "default" | "compact" | "hero" | "strip";

export type TrustedByPlacement = {
  id: string;
  title: string;
  subtitle?: string;
  variant: TrustedByVariant;
  background: "background" | "surface";
  showCountries?: boolean;
  relatedLink?: {
    label: string;
    href: string;
  };
};

export const trustedByContent = {
  title: "Trusted by",
  customersInHeading: "Customers in",
} as const;

export interface CustomerCountry {
  name: string;
  flag: string;
}

export const customerCountries: CustomerCountry[] = [
  { flag: "🇿🇦", name: "South Africa" },
  { flag: "🇬🇧", name: "United Kingdom" },
  { flag: "🇺🇸", name: "United States" },
  { flag: "🇦🇺", name: "Australia" },
  { flag: "🇨🇦", name: "Canada" },
  { flag: "🇮🇪", name: "Ireland" },
];

export const trustedByPlacements = {
  homepage: {
    id: "homepage-trusted-by",
    title: "Trusted by businesses using The Portal Genie",
    variant: "strip",
    background: "background",
    showCountries: false,
  },
  features: {
    id: "features-trusted-by",
    title: "Built for businesses that care about customer experience",
    subtitle:
      "From accounting firms to professional services businesses, organisations trust The Portal Genie to deliver a connected customer experience.",
    variant: "default",
    background: "surface",
    relatedLink: {
      label: "See customer stories",
      href: links.customerSuccess,
    },
  },
  pricing: {
    id: "pricing-trusted-by",
    title: "Trusted before you subscribe",
    subtitle:
      "Join businesses already improving their customer experience with The Portal Genie.",
    variant: "default",
    background: "background",
  },
  customerSuccess: {
    id: "customer-success-trusted-by",
    title: "Trusted by businesses across South Africa",
    subtitle:
      "Real businesses. Real customer experiences. Verified through the Xero App Store.",
    variant: "default",
    background: "background",
  },
} as const satisfies Record<string, TrustedByPlacement>;

export const clientLogos: ClientLogo[] = [
  {
    name: "African Technopreneurs",
    image: "/images/logos/optimized/african-techno-logo.webp",
    alt: "African Technopreneurs",
  },
  {
    name: "Candid Accountants",
    image: "/images/logos/CANDID LOGO.png",
    alt: "Candid Accountants",
  },
  {
    name: "D. P. Fuchs & Associates CC",
    image: "/images/logos/IMG_0270.jpeg",
    alt: "D. P. Fuchs & Associates CC",
  },
  {
    name: "ePrins Accountants",
    image: "/images/logos/EPA_logo.png",
    alt: "ePrins Accountants",
  },
  {
    name: "Finance & Payroll Executive",
    image: "/images/logos/FPE Logo Col Blu (S).jpg",
    alt: "Finance & Payroll Executive",
  },
  {
    name: "Fractional FM",
    image: "/images/logos/FFM - Primary Logo.png",
    alt: "Fractional FM",
  },
  {
    name: "FREED",
    image: "/images/logos/optimized/freed-logo.webp",
    alt: "FREED",
  },
  {
    name: "Ibamba Accounting Tax Advisory",
    image: "/images/logos/Ibamba Logo Cropped.png",
    alt: "Ibamba Accounting Tax Advisory",
  },
  {
    name: "JBM Finance Solutions",
    image: "/images/logos/optimized/jbm-logo.webp",
    alt: "JBM Finance Solutions",
  },
  {
    name: "Legalese",
    image: "/images/logos/Legalese Logo (on blue) - 6.jpg",
    alt: "Legalese",
  },
  {
    name: "Legalese",
    image: "/images/logos/Legalese Logo Icon.png",
    alt: "Legalese",
  },
  {
    name: "Moore",
    image: "/images/logos/Moore_Logo_voor_donkere_achtergrond_CMYK.png",
    alt: "Moore",
  },
  {
    name: "Myccountant",
    image: "/images/logos/optimized/myccountant-logo.webp",
    alt: "Myccountant",
  },
  {
    name: "SnQ",
    image: "/images/logos/Final SnQ Logo-25.png",
    alt: "SnQ",
  },
  {
    name: "Sourcing",
    image: "/images/logos/optimized/sourcing-logo.webp",
    alt: "Sourcing",
  },
  {
    name: "Trailblazer Systems",
    image: "/images/logos/TBS LOGO FINAL_updated Dec24-01.png",
    alt: "Trailblazer Systems",
  },
];
