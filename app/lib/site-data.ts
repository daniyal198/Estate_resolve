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
      { href: "/terms", label: "Terms of Service" },
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
    title: "Legally Compliant",
    description:
      "Searches are carried out through lawful, auditable processes suitable for probate administration.",
    icon: "scale",
  },
  {
    title: "A Defined Timeline",
    description:
      "Most matters are delivered within 30 working days with clear expectations from the outset.",
    icon: "clock",
  },
  {
    title: "Handled With Sensitivity",
    description:
      "Every case is approached with discretion, respect, and awareness of the family context behind the work.",
    icon: "users",
  },
  {
    title: "Probate-Ready Reporting",
    description:
      "Reports are structured to support conversations with solicitors, families and probate professionals.",
    icon: "document",
  },
  {
    title: "Secure Information Handling",
    description:
      "Identity and estate information is processed only for the purpose of the case and retained responsibly.",
    icon: "lock",
  },
  {
    title: "Fixed Transparent Fee",
    description:
      "A single clearly stated fee avoids hourly billing uncertainty at an already difficult time.",
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
      "We focus on financial relationships such as current and savings accounts, ISAs, investment accounts, insurance products, pensions, and similar holdings where a formal institution search may reveal previously unknown assets.",
  },
  {
    question: "How long does a case usually take?",
    answer:
      "Our standard turnaround is 30 working days. More complex matters can take longer if multiple institutions or supporting documents are involved, but timelines are discussed clearly at the outset.",
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
      "Not always. We can explain the authority typically required for an estate asset search and help clarify what documents are likely to be needed before the search is formally opened.",
  },
  {
    question: "How is personal information protected?",
    answer:
      "We work to UK data protection standards, limit the personal data collected to what is necessary for the case, and handle sensitive documents through controlled internal processes.",
  },
  {
    question: "Can solicitors or professional deputies instruct you?",
    answer:
      "Yes. The service can support professional representatives acting on behalf of an estate, subject to the appropriate authority and supporting documentation.",
  },
] as const;
