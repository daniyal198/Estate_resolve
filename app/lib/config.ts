const baseServicePackages = [
  {
    description:
      "Structured search across UK banks, building societies, insurers, pension providers, investment institutions, dormant assets and unclaimed court funds.",
    label: "Standard Estate Search",
    price: "£175",
    pricePence: 17500,
    value: "standard_estate_search",
  },
  {
    description:
      "Includes the standard estate search together with liability and due-diligence searches.",
    label: "Asset & Liability Search",
    price: "£210",
    pricePence: 21000,
    value: "asset_liability_search",
  },
  {
    description:
      "Includes the asset and liability search together with international enquiries for overseas assets and interests.",
    label: "International Estate Search",
    price: "£350",
    pricePence: 35000,
    value: "international_estate_search",
  },
] as const;

function formatPenceAsGbp(pricePence: number) {
  return new Intl.NumberFormat("en-GB", {
    currency: "GBP",
    style: "currency",
  }).format(pricePence / 100);
}

function getOptionalTestPaymentOption() {
  if (process.env.NEXT_PUBLIC_TEST_PAYMENT_OPTION_ENABLED !== "true") {
    return null;
  }

  const parsedPricePence = Number.parseInt(
    process.env.NEXT_PUBLIC_TEST_PAYMENT_OPTION_PRICE_PENCE || "",
    10,
  );

  if (
    !Number.isFinite(parsedPricePence) ||
    parsedPricePence < 100 ||
    parsedPricePence > 500
  ) {
    return null;
  }

  return {
    description:
      "Temporary low-value option for verifying the live Stripe payment flow.",
    label: "Payment Verification",
    price: formatPenceAsGbp(parsedPricePence),
    pricePence: parsedPricePence,
    value: "payment_verification",
  } as const;
}

const testPaymentOption = getOptionalTestPaymentOption();
const servicePackages = testPaymentOption
  ? [...baseServicePackages, testPaymentOption]
  : baseServicePackages;

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
    servicePackages,
    testPaymentOptionEnabled: Boolean(testPaymentOption),
  },
  timeline: {
    standardTurnaround: "30 working days",
  },
} as const;
