import { company } from "./company";

export const site = {
  name: company.name,
  title: company.name,
  description: company.tagline,
  logo: {
    src: "/images/logos/portal-genie-logo.png",
    alt: company.name,
    ariaLabel: `${company.name} home`,
    width: 1306,
    height: 662,
  },
} as const;
