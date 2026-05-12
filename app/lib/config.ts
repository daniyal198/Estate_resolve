export const config = {
  site: {
    name: "Estate Resolve",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://estate-resolve.com",
    description:
      "Professional estate financial search services for families and executors across England and Wales.",
  },
  contact: {
    email:
      process.env.NEXT_PUBLIC_CONTACT_EMAIL || "hello@estate-resolve.com",
    phone:
      process.env.NEXT_PUBLIC_CONTACT_PHONE || "+44 20 8154 2371",
    address: "71-75 Shelton Street, Covent Garden, London, WC2H 9JQ",
    officeHours: "Monday to Friday, 9:00 to 17:30",
    serviceArea: "England & Wales",
  },
  pricing: {
    fixedFee: "£300",
  },
  timeline: {
    standardTurnaround: "10 to 15 working days",
  },
} as const;
