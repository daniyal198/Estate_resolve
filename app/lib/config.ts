export const config = {
  site: {
    name: "Estate Resolve",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://estate-resolve.com",
    description:
      "Professional estate financial search services for families and executors across England, Wales and Scotland.",
  },
  contact: {
    email:
      process.env.NEXT_PUBLIC_CONTACT_EMAIL || "hello@estate-resolve.com",
    phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || "02081542371",
    phoneHref: `tel:${(process.env.NEXT_PUBLIC_CONTACT_PHONE || "02081542371").replace(/[^\d]/g, "")}`,
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
