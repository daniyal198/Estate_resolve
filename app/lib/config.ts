export const config = {
  site: {
    name: "Estate Resolve",
    url:
      process.env.NEXT_PUBLIC_SITE_URL || "https://www.estateresolve.co.uk",
    description:
      "Professional estate financial search services for families and executors across England, Wales and Scotland.",
  },
  company: {
    legalName: "AR Gravitas Ltd",
    companyNumber: "16340531",
    jurisdiction: "England and Wales",
    tradingName: "Estate Resolve",
    fullLegalName:
      "AR Gravitas Ltd (Companies House No. 16340531), registered in England and Wales, trading as Estate Resolve",
  },
  contact: {
    email:
      process.env.NEXT_PUBLIC_CONTACT_EMAIL || "contact@estateresolve.co.uk",
    phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || "020 3951 5065",
    phoneHref: `tel:${(process.env.NEXT_PUBLIC_CONTACT_PHONE || "020 3951 5065").replace(/[^\d]/g, "")}`,
    address: "71-75 Shelton Street, Covent Garden, London, WC2H 9JQ",
    addressLines: [
      "71-75 Shelton Street",
      "Covent Garden",
      "London",
      "WC2H 9JQ",
    ],
    officeHours: "Monday to Friday, 9:00 to 17:30",
    serviceArea: "England, Wales and Scotland",
  },
  pricing: {
    fixedFee: "£175",
  },
  timeline: {
    standardTurnaround: "30 working days",
  },
} as const;
