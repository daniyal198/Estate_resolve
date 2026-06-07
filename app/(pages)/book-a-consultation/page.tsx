import Link from "next/link";
import { ConsultationBooking } from "@/app/components/ConsultationBooking";
import {
  CalendarIcon,
  CheckIcon,
  MailIcon,
  PhoneIcon,
} from "@/app/components/Icons";
import { PageHero } from "@/app/components/PageHero";
import { buildUpcomingBookingDates, bookingDefaults } from "@/app/lib/booking";
import {
  getBookingPublicSettings,
  isGoogleCalendarConfigured,
} from "@/app/lib/google-calendar";
import { config } from "@/app/lib/config";
import { buildMetadata } from "@/app/lib/seo";

export const metadata = buildMetadata({
  title: "Book a Consultation",
  description:
    "Choose a consultation slot, reserve it through Google Calendar, and receive a confirmation invite automatically.",
  path: "/book-a-consultation",
});

function getPageBookingSettings() {
  if (isGoogleCalendarConfigured()) {
    return getBookingPublicSettings();
  }

  return {
    bookingWindowDays: bookingDefaults.bookingWindowDays,
    businessHoursEnd:
      process.env.NEXT_PUBLIC_BOOKING_BUSINESS_HOURS_END ||
      bookingDefaults.businessHoursEnd,
    businessHoursStart:
      process.env.NEXT_PUBLIC_BOOKING_BUSINESS_HOURS_START ||
      bookingDefaults.businessHoursStart,
    minimumNoticeHours:
      Number(process.env.NEXT_PUBLIC_BOOKING_MIN_NOTICE_HOURS) ||
      bookingDefaults.minimumNoticeHours,
    slotDurationMinutes:
      Number(process.env.NEXT_PUBLIC_BOOKING_SLOT_DURATION_MINUTES) ||
      bookingDefaults.slotDurationMinutes,
    timeZone:
      process.env.NEXT_PUBLIC_BOOKING_TIME_ZONE || bookingDefaults.timeZone,
  };
}

const consultationHighlights = [
  {
    description:
      "Clarify whether the estate is ready for a full financial asset search.",
    icon: <CheckIcon className="h-5 w-5" />,
    title: "Preparation review",
  },
  {
    description:
      "Discuss likely evidence, authority documents, and the next practical step.",
    icon: <CalendarIcon className="h-5 w-5" />,
    title: "Case planning",
  },
  {
    description:
      "Receive the invitation directly by email once the slot is confirmed.",
    icon: <MailIcon className="h-5 w-5" />,
    title: "Instant confirmation",
  },
];

export default function BookConsultationPage() {
  const bookingSettings = getPageBookingSettings();
  const initialDateOptions = buildUpcomingBookingDates(
    bookingSettings.timeZone,
    8,
    bookingSettings.bookingWindowDays,
  );
  const isCalendarReady = isGoogleCalendarConfigured();
  const businessHoursLabel = `${bookingSettings.businessHoursStart} to ${bookingSettings.businessHoursEnd}, Monday to Friday`;

  return (
    <main id="main-content" className="flex-1">
      <PageHero
        eyebrow="Book a Consultation"
        title="Reserve a Private Estate Consultation"
        description="Choose a weekday slot, tell us what you need covered, and receive an invitation through Google Calendar as soon as the booking is confirmed."
      />

      <section className="py-20">
        <div className="site-container">
          <ConsultationBooking
            businessHoursLabel={businessHoursLabel}
            initialDateOptions={initialDateOptions}
            isCalendarReady={isCalendarReady}
            minimumNoticeHours={bookingSettings.minimumNoticeHours}
            slotDurationMinutes={bookingSettings.slotDurationMinutes}
            timeZone={bookingSettings.timeZone}
          />
        </div>
      </section>

      <section className="pb-20">
        <div className="site-container grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <article className="rounded-[2rem] border border-brand-border bg-white p-8">
            <div className="section-label">What We Cover</div>
            <h2 className="mt-5 font-serif text-[clamp(2rem,4vw,2.8rem)] leading-[1.12] font-semibold text-brand-navy">
              A short call built around the estate questions that matter most
            </h2>
            <div className="mt-8 grid gap-4">
              {consultationHighlights.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-brand-border bg-brand-ivory p-5"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-navy text-brand-gold-light">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-brand-navy">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm leading-7 text-brand-slate">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </article>

          <div className="grid gap-6">
            <article className="rounded-[2rem] border border-brand-border bg-brand-ivory p-8">
              <h2 className="font-serif text-2xl font-semibold text-brand-navy">
                Useful before the call
              </h2>
              <ul className="mt-6 space-y-4 text-sm leading-7 text-brand-slate">
                <li className="border-b border-brand-border pb-4">
                  The deceased person&apos;s full name and the estate stage you
                  have already reached.
                </li>
                <li className="border-b border-brand-border pb-4">
                  Any grant, will, letter of authority, or solicitor instruction
                  already in place.
                </li>
                <li className="border-b border-brand-border pb-4">
                  Known banks, pensions, insurers, or missing account details
                  you want discussed.
                </li>
                <li>
                  Questions about whether to proceed to the secure intake and
                  fixed-fee search.
                </li>
              </ul>
            </article>

            <article className="rounded-[2rem] border border-brand-border bg-white p-8">
              <h2 className="font-serif text-2xl font-semibold text-brand-navy">
                Prefer to speak first?
              </h2>
              <p className="mt-4 text-sm leading-7 text-brand-slate">
                If the available slots do not work, contact us directly and we
                can help manually.
              </p>
              <div className="mt-6 space-y-4">
                <a
                  href={`mailto:${config.contact.email}`}
                  className="flex items-center gap-3 text-sm font-semibold text-brand-navy"
                >
                  <MailIcon className="h-5 w-5 text-brand-gold" />
                  {config.contact.email}
                </a>
                <a
                  href={config.contact.phoneHref}
                  className="flex items-center gap-3 text-sm font-semibold text-brand-navy"
                >
                  <PhoneIcon className="h-5 w-5 text-brand-gold" />
                  {config.contact.phone}
                </a>
              </div>
              <Link
                href="/contact"
                className="mt-6 inline-flex rounded-2xl border border-brand-gold bg-brand-gold px-6 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-white hover:bg-brand-gold-light hover:text-brand-navy"
              >
                Contact the team
              </Link>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
