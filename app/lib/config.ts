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
      process.env.NEXT_PUBLIC_CONTACT_PHONE || "+44 (0)20 7946 0820",
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
