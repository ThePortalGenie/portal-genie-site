export const legalPages = {
  privacyPolicy: {
    metadata: {
      title: "Privacy Policy",
      description:
        "Learn how The Portal Genie collects, stores and protects your information.",
      openGraph: {
        title: "Portal Genie Privacy Policy",
        description:
          "Read how The Portal Genie handles your data and protects your privacy.",
      },
    },
    title: "Privacy Policy",
    description:
      "Learn how The Portal Genie collects, stores and protects your information.",
    pdfPath: "/legal/Privacy%20Policy.pdf",
    downloadLabel: "Download PDF",
    fallbackMessage:
      "Your browser may not support embedded PDF viewing. You can download the document instead.",
  },
  termsAndConditions: {
    metadata: {
      title: "Terms & Conditions",
      description:
        "Read the terms governing the use of The Portal Genie website and services.",
      openGraph: {
        title: "Portal Genie Terms & Conditions",
        description:
          "Review the terms and conditions for using The Portal Genie website and services.",
      },
    },
    title: "Terms & Conditions",
    description:
      "Read the terms governing the use of The Portal Genie website and services.",
    pdfPath: "/legal/Terms%20and%20Conditions.pdf",
    downloadLabel: "Download PDF",
    fallbackMessage:
      "Your browser may not support embedded PDF viewing. You can download the document instead.",
  },
} as const;
