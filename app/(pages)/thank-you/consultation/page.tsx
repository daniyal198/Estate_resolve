import type { Metadata } from "next";
import Link from "next/link";
import { FormConversion } from "@/app/components/FormConversion";
import { PageHero } from "@/app/components/PageHero";
import { buildMetadata } from "@/app/lib/seo";

export const metadata: Metadata = {
  ...buildMetadata({
    title: "Consultation Booked",
    description:
      "Your Estate Resolve consultation is confirmed and a calendar invite is on its way.",
    path: "/thank-you/consultation",
  }),
  robots: {
    follow: false,
    index: false,
  },
};

type ConsultationThankYouPageProps = {
  searchParams: Promise<{
    calendar?: string;
    date?: string;
    meet?: string;
    time?: string;
  }>;
};

function readParam(value: string | undefined) {
  return typeof value === "string" && value.length > 0 ? value : null;
}

export default async function ConsultationThankYouPage({
  searchParams,
}: ConsultationThankYouPageProps) {
  const params = await searchParams;
  const dateLabel = readParam(params.date);
  const timeLabel = readParam(params.time);
  const calendarEventUrl = readParam(params.calendar);
  const meetLink = readParam(params.meet);

  return (
    <main id="main-content" className="flex-1">
      <FormConversion
        conversion="consultation"
        dataLayerEvent="consultation_booked"
        dedupeToken={dateLabel && timeLabel ? `${dateLabel} ${timeLabel}` : null}
        formName="consultation"
        vercelEventName="Consultation Booked"
      />
      <PageHero
        eyebrow="Consultation Booked"
        title="Your Consultation Is Confirmed"
        description="Thank you. Your appointment is reserved and a calendar invite is on its way to your inbox."
      />

      <section className="py-20">
        <div className="site-container max-w-4xl space-y-8">
          <article className="border border-emerald-200 bg-emerald-50 p-8 md:p-10">
            <h2 className="font-serif text-3xl font-semibold text-brand-navy">
              Consultation booked
            </h2>
            {dateLabel && timeLabel ? (
              <p className="mt-4 text-sm leading-7 text-brand-slate">
                Your appointment is reserved for {dateLabel} at {timeLabel}. A
                Google Calendar invite is on its way to your inbox.
              </p>
            ) : (
              <p className="mt-4 text-sm leading-7 text-brand-slate">
                Your appointment is reserved. A Google Calendar invite is on its
                way to your inbox.
              </p>
            )}
            {meetLink || calendarEventUrl ? (
              <div className="mt-8 flex flex-wrap gap-4">
                {meetLink ? (
                  <a
                    href={meetLink}
                    className="inline-flex items-center justify-center border border-brand-gold bg-brand-gold px-6 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-white hover:bg-brand-gold-light hover:text-brand-navy"
                    rel="noreferrer"
                    target="_blank"
                  >
                    Join Google Meet
                  </a>
                ) : null}
                {calendarEventUrl ? (
                  <a
                    href={calendarEventUrl}
                    className="inline-flex items-center justify-center border border-brand-border px-6 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-brand-navy hover:border-brand-gold"
                    rel="noreferrer"
                    target="_blank"
                  >
                    View calendar event
                  </a>
                ) : null}
              </div>
            ) : null}
          </article>

          <article className="border border-brand-border bg-white p-8 md:p-10">
            <h2 className="font-serif text-2xl font-semibold text-brand-navy">
              What happens next
            </h2>
            <ol className="mt-6 space-y-4 text-sm leading-7 text-brand-slate">
              <li>1. You will receive a confirmation email with the appointment details.</li>
              <li>2. A member of our team will call you at the time you selected.</li>
              <li>3. We will talk through your situation and the options available.</li>
              <li>4. If you decide to proceed, we will open your case and begin the search.</li>
            </ol>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/"
                className="inline-flex items-center justify-center border border-brand-gold bg-brand-gold px-6 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-white hover:bg-brand-gold-light hover:text-brand-navy"
              >
                Return home
              </Link>
              <Link
                href="/book-a-consultation"
                className="inline-flex items-center justify-center border border-brand-border px-6 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-brand-navy hover:border-brand-gold"
              >
                Book another consultation
              </Link>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
