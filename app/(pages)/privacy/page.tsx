import { PageHero } from "@/app/components/PageHero";
import { buildMetadata } from "@/app/lib/seo";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description:
    "Read the Estate Resolve privacy policy covering data use, lawful basis, retention, and contact details.",
  path: "/privacy",
});

const sections = [
  {
    title: "Information We Collect",
    content:
      "We collect only the information reasonably required to assess an enquiry, open a case, carry out an estate financial search, and maintain the associated records.",
  },
  {
    title: "How We Use Information",
    content:
      "Information is used to verify authority, communicate about the matter, conduct relevant search activity, produce reports, and meet legal or regulatory obligations.",
  },
  {
    title: "Retention and Security",
    content:
      "Sensitive information is retained only for as long as necessary for operational, legal, and record-keeping purposes, and it is handled through controlled internal processes.",
  },
  {
    title: "Your Rights",
    content:
      "Where applicable, you may request access to personal data, rectification of inaccurate data, or further information about the basis on which information is processed.",
  },
] as const;

export default function PrivacyPage() {
  return (
    <main id="main-content" className="flex-1">
      <PageHero
        eyebrow="Privacy Policy"
        title="How Estate Resolve Handles Sensitive Information"
        description="This privacy summary explains the basis on which estate-related information is collected, used, and retained."
      />

      <section className="py-20">
        <div className="site-container mx-auto max-w-4xl grid gap-4">
          {sections.map((section) => (
            <article
              key={section.title}
              className="border border-brand-border bg-white px-7 py-6"
            >
              <h2 className="font-serif text-2xl font-semibold text-brand-navy">
                {section.title}
              </h2>
              <p className="mt-3 text-[1rem] leading-8 text-brand-slate">
                {section.content}
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
