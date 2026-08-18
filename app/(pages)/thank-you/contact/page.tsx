import type { Metadata } from "next";
import Link from "next/link";
import { FormConversion } from "@/app/components/FormConversion";
import { PageHero } from "@/app/components/PageHero";
import { buildMetadata } from "@/app/lib/seo";

export const metadata: Metadata = {
  ...buildMetadata({
    title: "Thank You",
    description:
      "Your message has been sent to the Estate Resolve team and a confirmation email is on its way.",
    path: "/thank-you/contact",
  }),
  robots: {
    follow: false,
    index: false,
  },
};

export default function ContactThankYouPage() {
  return (
    <main id="main-content" className="flex-1">
      <FormConversion
        conversion="contact"
        dataLayerEvent="contact_form_submitted"
        formName="contact"
        vercelEventName="Contact Form Submitted"
      />
      <PageHero
        eyebrow="Message Received"
        title="Thank You For Getting In Touch"
        description="Your message has been sent to our team and a confirmation email is on its way to you."
      />

      <section className="py-20">
        <div className="site-container max-w-4xl space-y-8">
          <article className="border border-emerald-200 bg-emerald-50 p-8 md:p-10">
            <h2 className="font-serif text-3xl font-semibold text-brand-navy">
              We have your enquiry
            </h2>
            <p className="mt-4 text-sm leading-7 text-brand-slate">
              A member of the Estate Resolve team will review your message and
              respond directly. If your enquiry is urgent, you can call us on
              the number listed on our contact page.
            </p>
          </article>

          <article className="border border-brand-border bg-white p-8 md:p-10">
            <h2 className="font-serif text-2xl font-semibold text-brand-navy">
              While you wait
            </h2>
            <p className="mt-4 text-sm leading-7 text-brand-slate">
              You may find it useful to read how our process works, or to book a
              consultation if you would prefer to speak with us directly.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/book-a-consultation"
                className="inline-flex items-center justify-center border border-brand-gold bg-brand-gold px-6 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-white hover:bg-brand-gold-light hover:text-brand-navy"
              >
                Book a consultation
              </Link>
              <Link
                href="/how-it-works"
                className="inline-flex items-center justify-center border border-brand-border px-6 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-brand-navy hover:border-brand-gold"
              >
                How it works
              </Link>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
