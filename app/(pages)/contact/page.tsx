import { ContactForm } from "@/app/components/ContactForm";
import { MailIcon, MapPinIcon, PhoneIcon } from "@/app/components/Icons";
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
        <div className="site-container grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
          <article className="border border-brand-border bg-white p-8 md:p-10">
            <div className="section-label">Send a message</div>
            <h2 className="mt-5 font-serif text-[clamp(2rem,4vw,2.7rem)] leading-[1.16] font-semibold text-brand-navy">
              Tell us what you need clarified
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-brand-slate">
              Use the contact form if you need to discuss whether an estate
              search is appropriate, whether the documents you have are
              sufficient, or how the process works in practice.
            </p>
            <div className="mt-8">
              <ContactForm />
            </div>
          </article>

          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-1">
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
              href={config.contact.phoneHref}
              className="mt-5 inline-flex text-sm font-semibold text-brand-navy underline decoration-brand-gold underline-offset-4"
            >
              {config.contact.phone}
            </a>
            <p className="mt-4 text-sm text-brand-slate">
              {config.contact.officeHours}
            </p>
            </article>

            <article className="border border-brand-border bg-white p-8">
            <div className="flex h-12 w-12 items-center justify-center bg-brand-navy text-brand-gold-light">
              <MapPinIcon className="h-5 w-5" />
            </div>
            <h2 className="mt-6 font-serif text-2xl font-semibold text-brand-navy">
              Address
            </h2>
            <address className="mt-5 not-italic text-sm font-semibold leading-7 text-brand-navy">
              {config.contact.address}
            </address>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
