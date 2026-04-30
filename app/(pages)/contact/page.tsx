import { MailIcon, PhoneIcon } from "@/app/components/Icons";
import { PageHero } from "@/app/components/PageHero";
import { config } from "@/app/lib/config";
import { buildMetadata } from "@/app/lib/seo";

export const metadata = buildMetadata({
  title: "Contact",
  description:
    "Contact Estate Resolve to discuss whether an estate financial search is appropriate for your matter.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <main id="main-content" className="flex-1">
      <PageHero
        eyebrow="Contact"
        title="Speak With Estate Resolve"
        description="If you need to understand whether an estate financial search is suitable, start with a direct conversation."
      />

      <section className="py-20">
        <div className="site-container grid gap-8 md:grid-cols-2">
          <article className="border border-brand-border bg-white p-8">
            <div className="flex h-12 w-12 items-center justify-center bg-brand-navy text-brand-gold-light">
              <MailIcon className="h-5 w-5" />
            </div>
            <h2 className="mt-6 font-serif text-2xl font-semibold text-brand-navy">
              Email
            </h2>
            <p className="mt-3 text-sm leading-7 text-brand-slate">
              For general enquiries, introductions from solicitors, or case
              preparation questions.
            </p>
            <a
              href={`mailto:${config.contact.email}`}
              className="mt-5 inline-flex text-sm font-semibold text-brand-navy underline decoration-brand-gold underline-offset-4"
            >
              {config.contact.email}
            </a>
          </article>

          <article className="border border-brand-border bg-white p-8">
            <div className="flex h-12 w-12 items-center justify-center bg-brand-navy text-brand-gold-light">
              <PhoneIcon className="h-5 w-5" />
            </div>
            <h2 className="mt-6 font-serif text-2xl font-semibold text-brand-navy">
              Telephone
            </h2>
            <p className="mt-3 text-sm leading-7 text-brand-slate">
              Available during office hours for initial case discussions and
              service suitability queries.
            </p>
            <a
              href={`tel:${config.contact.phone.replace(/[^+\d]/g, "")}`}
              className="mt-5 inline-flex text-sm font-semibold text-brand-navy underline decoration-brand-gold underline-offset-4"
            >
              {config.contact.phone}
            </a>
            <p className="mt-4 text-sm text-brand-slate">
              {config.contact.officeHours}
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}
