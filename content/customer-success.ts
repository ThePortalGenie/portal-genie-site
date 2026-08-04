import { links } from "@/config/links";
import { buttons } from "@/content/buttons";

export const xeroAppStoreUrl =
  "https://apps.xero.com/app/the-portal-genie" as const;

export const customerSuccessPage = {
  metadata: {
    title: "Customer Success",
    description:
      "Read verified Portal Genie reviews from the Xero App Store. See why businesses value seamless Xero integration, exceptional support and a better customer experience.",
    openGraph: {
      title:
        "Portal Genie Customer Success — Verified Xero App Store Reviews",
      description:
        "Authentic customer stories and verified Xero App Store reviews from businesses using Portal Genie to deliver a connected customer experience alongside Xero.",
    },
  },
  hero: {
    headline: "Trusted by businesses using Xero.",
    description:
      "Businesses across multiple industries rely on The Portal Genie to deliver a more connected, professional customer experience. Read what verified customers have to say.",
    rating: {
      value: "5.0",
      label: "Rating",
      source: "Verified Xero App Store Reviews",
    },
    primaryCta: {
      label: "Read Reviews",
      href: "#reviews",
    },
    secondaryCta: {
      label: buttons.bookDemo,
      href: links.bookDemo,
    },
  },
  statistics: {
    items: [
      {
        stars: 5,
        value: "5.0",
        label: "Average Rating",
      },
      {
        stars: 5,
        value: "100%",
        label: "Five-Star Reviews",
      },
      {
        value: "Verified",
        label: "On the Xero App Store",
        icon: "badge-check",
      },
    ],
  },
  testimonials: {
    headline: "Featured customer stories",
    description:
      "Verified reviews from businesses using Portal Genie alongside Xero.",
    items: [
      {
        name: "Justin Myles Fuchs",
        title: "A Great Addition to the Xero Ecosystem",
        date: "7 May 2026",
        excerpt:
          "I have really enjoyed working with The Portal Genie. What stands out most is the simplicity of the platform and how easy it is for clients to use.",
        body: "I have really enjoyed working with The Portal Genie. What stands out most is the simplicity of the platform and how easy it is for clients to use without needing extensive training or support.\n\nThe integration with Xero works well and the ability for clients to securely access invoices, statements and shared documents in one place has helped create a far more professional and organised client experience.\n\nOne of the unique features we particularly like is the branded client-facing portal and the ease of sharing documents directly through the platform.\n\nThe Portal Genie fills a very practical gap in the cloud accounting space and is a great solution for businesses and accounting firms looking for a simple, modern and client-friendly portal solution.",
      },
      {
        name: "Charmain Olckers",
        title: "Seamless Integration & Great Support",
        date: "13 May 2026",
        excerpt:
          "The integration works really well and has helped streamline processes between systems. The team has been proactive, knowledgeable, and supportive from start to finish.",
        body: "The integration works really well and has helped streamline processes between systems. The team has been proactive, knowledgeable, and supportive from start to finish.",
      },
      {
        name: "Charnel de Villiers",
        title: "Great client facing application",
        date: "19 February 2026",
        excerpt:
          "We are thoroughly enjoying using The Portal Genie and in particular being able to share documents directly within the application. We also like how secure the login is. Great client facing application!",
        body: "We are thoroughly enjoying using The Portal Genie and in particular being able to share documents directly within the application. We also like how secure the login is. Great client facing application!",
      },
      {
        name: "Enrico Prins",
        title: "Excellent experience using Portal Genie",
        date: "19 May 2026",
        excerpt:
          "We've had an excellent experience using Portal Genie integrated with Xero at E Prins & Associates - Accountants. The platform gives our clients seamless access to their statements, invoices, and credit notes at any time, which has significantly improved efficiency, communication, and overall client service.\n\nPortal Genie is user-friendly, easy to customise, and has added real value to our day-to-day operations. Their support team has been professional, responsive, and extremely helpful throughout the entire process.",
        body: "We've had an excellent experience using Portal Genie integrated with Xero at E Prins & Associates - Accountants. The platform gives our clients seamless access to their statements, invoices, and credit notes at any time, which has significantly improved efficiency, communication, and overall client service.\n\nPortal Genie is user-friendly, easy to customise, and has added real value to our day-to-day operations. Their support team has been professional, responsive, and extremely helpful throughout the entire process.\n\nWe highly recommend Portal Genie to businesses looking to improve client experience and streamline their customer communication through a reliable and customer-centric solution.",
      },
      {
        name: "Kamogelo Alamu",
        date: "28 July 2026",
        excerpt:
          "Geoff's assistance was the quickest I have ever received in my entire working career. I learned to use the Portal Genie seamlessly with his assistance.",
        body: "Geoff's assistance was the quickest I have ever received in my entire working career. I learned to use the Portal Genie seamlessly with his assistance.",
      },
      {
        name: "Anina Rowland",
        date: "27 July 2026",
        excerpt:
          "We had a super awesome experience with the assistance, the app and the connecting of the app. The explanations and the details was provided with so much patience!\n\nWell done! And the after sale support is still great!",
        body: "We had a super awesome experience with the assistance, the app and the connecting of the app. The explanations and the details was provided with so much patience!\n\nWell done! And the after sale support is still great!",
      },
      {
        name: "Yvonne Lubbe",
        date: "14 May 2026",
        excerpt:
          "We've had a great experience with Portal Genie integrated with Xero. It gives our clients easy access to pull their own statements, invoices, and credit notes, which has really improved convenience and communication. The platform is easy to customise, and their friendly and helpful team continue to provide great support throughout the process. Recommended for businesses that value customer centricity.",
        body: "We've had a great experience with Portal Genie integrated with Xero. It gives our clients easy access to pull their own statements, invoices, and credit notes, which has really improved convenience and communication. The platform is easy to customise, and their friendly and helpful team continue to provide great support throughout the process. Recommended for businesses that value customer centricity.",
      },
    ],
  },
  commonThemes: {
    headline: "What customers consistently say",
    description:
      "Themes that appear again and again across verified Xero App Store reviews.",
    items: [
      {
        title: "Exceptional Support",
        description:
          "Customers repeatedly praise the responsiveness, knowledge and friendliness of the Portal Genie team.",
        icon: "headphones",
      },
      {
        title: "Easy to Use",
        description:
          "Businesses consistently describe the platform as intuitive and simple for both staff and customers.",
        icon: "sparkles",
      },
      {
        title: "Works Seamlessly with Xero",
        description:
          "Portal Genie enhances existing Xero workflows without disrupting them.",
        icon: "puzzle",
      },
      {
        title: "Improves Customer Experience",
        description:
          "Businesses report more professional communication, easier document access and better customer interactions.",
        icon: "heart-handshake",
      },
    ],
  },
  verified: {
    headline: "Verified on the Xero App Store",
    description:
      "Every review displayed on this page comes from a verified customer through the Xero App Store. These are authentic experiences from businesses using Portal Genie alongside Xero — not marketing copy.",
    cta: {
      label: "View Reviews on the Xero App Store",
      href: xeroAppStoreUrl,
    },
  },
  industriesServed: {
    eyebrow: "Industries we serve",
    heading: {
      line1: "Built for every industry.",
      line2: "Designed for your customers.",
    },
    description:
      "The Portal Genie helps businesses across a wide range of industries deliver seamless customer experiences and streamline operations.",
    mobilePreviewCount: 8,
    expandLabel: "View all industries",
    collapseLabel: "Show fewer",
    items: [
      { name: "Accounting", icon: "calculator" },
      { name: "Construction", icon: "hard-hat" },
      { name: "E-commerce", icon: "shopping-cart" },
      { name: "Education", icon: "graduation-cap" },
      { name: "Education Management", icon: "book-open-check" },
      { name: "Equestrian Sports", icon: "trophy" },
      { name: "Fine Art", icon: "palette" },
      { name: "Food & Beverage", icon: "utensils-crossed" },
      { name: "Food Manufacturing", icon: "factory" },
      { name: "Financial Services", icon: "landmark" },
      { name: "Health, Wellness & Fitness", icon: "heart-pulse" },
      { name: "Hospitality", icon: "concierge-bell" },
      { name: "Individual Contact", icon: "user-round" },
      { name: "Information Technology", icon: "monitor" },
      { name: "Jewellery", icon: "gem" },
      { name: "Marketing & Advertising", icon: "megaphone" },
      { name: "Medical Devices", icon: "stethoscope" },
      { name: "Mining", icon: "mountain" },
      { name: "Physiotherapists", icon: "accessibility" },
      { name: "Property", icon: "home" },
      { name: "Property Management", icon: "key-round" },
      { name: "Security & Investigations", icon: "shield-check" },
      { name: "Software Development", icon: "code-2" },
      { name: "Sportswear", icon: "shirt" },
      { name: "Telecommunications", icon: "phone" },
      { name: "Transportation & Logistics", icon: "truck" },
      { name: "Travel & Tourism", icon: "plane" },
      { name: "Wholesale", icon: "warehouse" },
      { name: "Upholstery & Cleaning", icon: "brush" },
    ],
  },
  finalCta: {
    headline: "Ready to experience The Portal Genie for yourself?",
    description:
      "Book a demo to see the platform in action, or start free and explore how Portal Genie complements your Xero workflow.",
    primaryCta: {
      label: buttons.bookDemo,
      href: links.bookDemo,
    },
    secondaryCta: {
      label: buttons.startFree,
      href: links.startFree,
    },
  },
} as const;
