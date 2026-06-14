export const navigationLinks = [
  { href: "/services", label: "Services" },
  { href: "/how-it-works", label: "The Process" },
  { href: "/book-a-consultation", label: "Consultation" },
  { href: "/about", label: "About Us" },
  { href: "/faqs", label: "FAQs" },
] as const;

export const footerGroups = [
  {
    title: "Services",
    links: [
      { href: "/services", label: "Our Services" },
      { href: "/how-it-works", label: "How It Works" },
      { href: "/sample-reports", label: "Sample Reports" },
      { href: "/book-a-consultation", label: "Book a Consultation" },
      { href: "/start-a-case", label: "Start a Case" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About Us" },
      { href: "/contact", label: "Contact" },
      { href: "/faqs", label: "FAQs" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms & Conditions" },
    ],
  },
] as const;

export const trustHighlights = [
  {
    title: "ICO Registered",
    description: "Data handled under UK GDPR and professional confidentiality standards.",
    icon: "shield",
  },
  {
    title: "Secure & Confidential",
    description: "Sensitive case information is handled with encrypted workflows and discretion.",
    icon: "lock",
  },
  {
    title: "UK-Based Service",
    description: "Focused on estate searches relating to England, Wales and Scotland.",
    icon: "check",
  },
  {
    title: "Trusted",
    description:
      "Trusted by families, solicitors, DIY probates and executors seeking financial clarity.",
    icon: "users",
  },
] as const;

export const processSteps = [
  {
    number: "01",
    title: "Submit Your Case",
    description:
      "Share the deceased's details, your role, and any known financial leads through our intake process.",
  },
  {
    number: "02",
    title: "Secure Instruction",
    description:
      "We confirm the brief, authority to act, and the fixed fee before the search begins.",
  },
  {
    number: "03",
    title: "Institution Search",
    description:
      "Our team contacts relevant financial institutions and traces accounts, investments, and policies.",
  },
  {
    number: "04",
    title: "Receive Your Report",
    description:
      "You receive a formal findings report with the next actions needed for probate or estate administration.",
  },
] as const;

export const standards = [
  {
    title: "Cost-Effective",
    description:
      "A modest fixed fee for a comprehensive search that may uncover previously unknown assets and potentially more than pay for itself.",
    icon: "scale",
  },
  {
    title: "Often Payable by the Estate",
    description:
      "In most cases, the fee can be treated as an estate administration expense and paid from estate funds.",
    icon: "clock",
  },
  {
    title: "Ideal for DIY Probate",
    description:
      "Helps executors identify estate assets with greater confidence, reducing the need for costly professional searches.",
    icon: "users",
  },
  {
    title: "Probate-Ready Reporting",
    description:
      "Receive a clear, detailed report suitable for probate applications, executors, administrators, and legal professionals.",
    icon: "document",
  },
  {
    title: "Supports Due Diligence",
    description:
      "Demonstrates that reasonable steps were taken to identify the deceased's assets.",
    icon: "lock",
  },
  {
    title: "Helps Reduce Risk",
    description:
      "A thorough search helps minimise the chance of assets being overlooked during estate administration.",
    icon: "pound",
  },
] as const;

export const faqItems = [
  {
    question: "Who is this service for?",
    answer:
      "Estate Resolve is designed for executors, administrators, solicitors, and close family members who need help identifying bank accounts, investments, pensions, and other financial assets belonging to a deceased person.",
  },
  {
    question: "What kinds of assets can you help trace?",
    answer:
      "We focus on financial relationships such as current and savings accounts, investment accounts, insurance products, pensions, NS&I holdings, and similar assets where a formal institution search may reveal previously unknown accounts.",
  },
  {
    question: "Can your asset search fee be recovered from the estate?",
    answer:
      "In most cases, reasonable asset-search fees can be reimbursed from estate funds as part of the administration of the estate.",
  },
  {
    question: "What banks and financial institutions do you contact?",
    answer:
      "We conduct enquiries with over 140 financial institutions, including banks, building societies, pension providers, insurers, investment managers, share registrars, and court registers covering more than 400 financial brands and trading names across the UK.",
  },
  {
    question: "How long does a case usually take?",
    answer:
      "We aim to complete most searches within 30 days. In some cases, timescales may be extended due to delays or additional requirements from financial institutions. Any significant findings received after the report has been issued will be communicated to you as part of our ongoing enquiries.",
  },
  {
    question: "Do you guarantee that assets will be found?",
    answer:
      "No legitimate provider can guarantee an outcome. What we provide is a structured, professional search process designed to reduce the risk of unknown financial assets being overlooked.",
  },
  {
    question: "Is the fee fixed?",
    answer:
      "Yes. The service is positioned around a fixed fee so families and executors can proceed with certainty rather than open-ended hourly billing.",
  },
  {
    question: "Do I need probate before starting?",
    answer:
      "No. We can explain the authority typically required for an estate asset search and help clarify what documents are likely to be needed before the search is formally opened.",
  },
] as const;
