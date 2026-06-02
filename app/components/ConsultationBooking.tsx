"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { BookingDateOption, BookingSlot } from "@/app/lib/booking";
import { bookingFormSchema, type BookingFormData } from "@/app/lib/validation";
import {
  ArrowRightIcon,
  CalendarIcon,
  CheckIcon,
  ClockIcon,
  MailIcon,
  PhoneIcon,
  VideoIcon,
} from "@/app/components/Icons";

const inputClassName =
  "w-full rounded-2xl border border-brand-border bg-white px-4 py-3 text-[1rem] text-brand-ink outline-none transition focus:border-brand-gold";

const relationshipOptions = [
  "Executor",
  "Administrator",
  "Next of Kin",
  "Solicitor",
  "Other Representative",
] as const;

type AvailabilityResponse = {
  availableSlots?: BookingSlot[];
  message?: string;
  selectedDateLabel?: string;
  success: boolean;
  timeZone?: string;
};

type BookingResponse = {
  booking?: {
    calendarEventId: string;
    htmlLink: string | null;
    meetLink: string | null;
  };
  consultationDateLabel?: string;
  consultationTimeLabel?: string;
  message?: string;
  success: boolean;
};

type ConsultationBookingProps = {
  businessHoursLabel: string;
  initialDateOptions: BookingDateOption[];
  isCalendarReady: boolean;
  minimumNoticeHours: number;
  slotDurationMinutes: number;
  timeZone: string;
};

type BookingConfirmation = {
  calendarEventUrl: string | null;
  consultationDateLabel: string;
  consultationTimeLabel: string;
  meetLink: string | null;
};

type AvailabilityState = {
  error: string | null;
  isLoading: boolean;
  selectedDateLabel: string | null;
  slots: BookingSlot[];
};

type BookingStep = "date" | "time";

function BookingMetric({
  children,
  icon,
  label,
}: {
  children: React.ReactNode;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <div className="h-full rounded-2xl border border-brand-border bg-white/80 p-6">
      <div className="flex h-full flex-col items-start">
        <div className="flex h-14 w-14 items-center justify-center rounded-[1.25rem] bg-brand-navy text-brand-gold-light">
          {icon}
        </div>
        <p className="mt-5 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-brand-slate">
          {label}
        </p>
        <div className="mt-3 max-w-full text-[1.05rem] leading-8 text-brand-navy">
          {children}
        </div>
      </div>
    </div>
  );
}

export function ConsultationBooking({
  businessHoursLabel,
  initialDateOptions,
  isCalendarReady,
  minimumNoticeHours,
  slotDurationMinutes,
  timeZone,
}: ConsultationBookingProps) {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState<BookingSlot | null>(null);
  const [currentStep, setCurrentStep] = useState<BookingStep>("date");
  const [availability, setAvailability] = useState<AvailabilityState>({
    error: null,
    isLoading: false,
    selectedDateLabel: null,
    slots: [],
  });
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmation, setConfirmation] = useState<BookingConfirmation | null>(
    null,
  );
  const timeStepRef = useRef<HTMLDivElement | null>(null);

  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
    setValue,
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      consultationReason: "",
      email: "",
      fullName: "",
      phone: "",
      relationship: "",
      selectedDate: "",
      slotEnd: "",
      slotStart: "",
    },
  });

  useEffect(() => {
    setValue("selectedDate", selectedDate, { shouldValidate: true });

    if (!selectedDate || !isCalendarReady) {
      return;
    }

    let isCancelled = false;

    async function loadAvailability() {
      setAvailability((current) => ({
        ...current,
        error: null,
        isLoading: true,
      }));
      setSelectedSlot(null);
      setValue("slotStart", "", { shouldValidate: true });
      setValue("slotEnd", "", { shouldValidate: true });

      try {
        const response = await fetch(
          `/api/booking/availability?date=${encodeURIComponent(selectedDate)}`,
          {
            cache: "no-store",
          },
        );
        const payload = (await response.json()) as AvailabilityResponse;

        if (!response.ok || !payload.success) {
          throw new Error(
            payload.message ||
              "We could not load consultation times for that date.",
          );
        }

        if (isCancelled) {
          return;
        }

        setAvailability({
          error: null,
          isLoading: false,
          selectedDateLabel: payload.selectedDateLabel || null,
          slots: payload.availableSlots || [],
        });
      } catch (error) {
        if (isCancelled) {
          return;
        }

        setAvailability({
          error:
            error instanceof Error
              ? error.message
              : "We could not load consultation times for that date.",
          isLoading: false,
          selectedDateLabel: null,
          slots: [],
        });
      }
    }

    void loadAvailability();

    return () => {
      isCancelled = true;
    };
  }, [isCalendarReady, selectedDate, setValue]);

  function goToTimeStep() {
    setCurrentStep("time");
    requestAnimationFrame(() => {
      timeStepRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }

  async function onSubmit(values: BookingFormData) {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch("/api/booking", {
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });
      const payload = (await response.json()) as BookingResponse;

      if (!response.ok || !payload.success || !payload.booking) {
        throw new Error(
          payload.message ||
            "We could not confirm the consultation booking. Please try another slot.",
        );
      }

      setConfirmation({
        calendarEventUrl: payload.booking.htmlLink,
        consultationDateLabel: payload.consultationDateLabel || "",
        consultationTimeLabel: payload.consultationTimeLabel || "",
        meetLink: payload.booking.meetLink,
      });
      reset({
        consultationReason: "",
        email: "",
        fullName: "",
        phone: "",
        relationship: "",
        selectedDate: "",
        slotEnd: "",
        slotStart: "",
      });
      setSelectedDate("");
      setSelectedSlot(null);
      setCurrentStep("date");
      setAvailability((current) => ({
        ...current,
        slots: current.slots.filter(
          (slot) => slot.startIso !== values.slotStart,
        ),
      }));
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "We could not confirm the consultation booking.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="grid gap-8 xl:grid-cols-[0.95fr_1.05fr]">
      <section className="rounded-[2rem] border border-brand-border bg-brand-ivory p-6 md:p-8">
        <div className="section-label">Live Availability</div>
        <h2 className="mt-5 font-serif text-[clamp(2rem,4vw,2.8rem)] leading-[1.1] font-semibold text-brand-navy">
          Choose a consultation time that works for you
        </h2>
        <p className="mt-4 max-w-2xl text-[1rem] leading-7 text-brand-slate">
          Pick a weekday slot and we will reserve it directly in Google
          Calendar. You will receive a confirmation email at the address
          provided below.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <BookingMetric
            label="Consultation"
            icon={<ClockIcon className="h-5 w-5" />}
          >
            {slotDurationMinutes} minutes
          </BookingMetric>
          <BookingMetric
            label="Hours"
            icon={<CalendarIcon className="h-5 w-5" />}
          >
            {businessHoursLabel}
          </BookingMetric>
          <BookingMetric
            label="Delivery"
            icon={<MailIcon className="h-5 w-5" />}
          >
            Confirmation sent by email
          </BookingMetric>
        </div>

        {!isCalendarReady ? (
          <div className="mt-8 rounded-3xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm leading-7 text-amber-800">
            The Google Calendar connection still needs to be configured with
            live credentials before booking can be enabled.
          </div>
        ) : null}

        <div
          className={`mt-8 ${!isCalendarReady ? "pointer-events-none opacity-50" : ""}`}
        >
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-brand-gold">
                Step 1
              </p>
              <h3 className="mt-2 font-serif text-2xl font-semibold text-brand-navy">
                Select a day
              </h3>
            </div>
            <p className="text-right text-xs uppercase tracking-[0.16em] text-brand-slate">
              {timeZone}
            </p>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {initialDateOptions.map((dateOption) => {
              const isActive = selectedDate === dateOption.value;

              return (
                <button
                  key={dateOption.value}
                  type="button"
                  className={`rounded-2xl border px-4 py-4 text-left ${
                    isActive
                      ? "border-brand-gold bg-brand-navy text-white shadow-[0_20px_60px_rgba(15,37,69,0.18)]"
                      : "border-brand-border bg-white text-brand-navy hover:border-brand-gold"
                  }`}
                  onClick={() => {
                    setSelectedDate(dateOption.value);
                    setCurrentStep("date");
                  }}
                >
                  <div className="text-sm font-semibold uppercase tracking-[0.14em]">
                    {dateOption.label}
                  </div>
                  <div
                    className={`mt-2 text-sm leading-6 ${
                      isActive ? "text-white/72" : "text-brand-slate"
                    }`}
                  >
                    {dateOption.description}
                  </div>
                </button>
              );
            })}
          </div>

          {selectedDate ? (
            <div className="mt-6 flex flex-col gap-4 rounded-[1.5rem] border border-brand-border bg-white px-5 py-5 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-brand-gold">
                  Selected day
                </p>
                <p className="mt-2 text-[1rem] leading-7 text-brand-navy">
                  {initialDateOptions.find((option) => option.value === selectedDate)
                    ?.description || availability.selectedDateLabel}
                </p>
              </div>
              <button
                type="button"
                className="inline-flex items-center justify-center gap-3 rounded-2xl border border-brand-gold bg-brand-gold px-6 py-4 text-sm font-semibold uppercase tracking-[0.14em] text-white hover:bg-brand-gold-light hover:text-brand-navy"
                onClick={goToTimeStep}
              >
                Continue to time
                <ArrowRightIcon className="h-4 w-4" />
              </button>
            </div>
          ) : null}

          {currentStep === "time" ? (
          <div
            ref={timeStepRef}
            className="mt-8 scroll-mt-28"
          >
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-brand-gold">
                  Step 2
                </p>
                <h3 className="mt-2 font-serif text-2xl font-semibold text-brand-navy">
                  Pick a time
                </h3>
              </div>
              <p className="text-sm text-brand-slate">
                {availability.selectedDateLabel || "Loading selected date..."}
              </p>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <button
                type="button"
                className="inline-flex items-center gap-2 text-sm font-semibold text-brand-navy underline underline-offset-4"
                onClick={() => setCurrentStep("date")}
              >
                Change date
              </button>
            </div>

            {availability.isLoading ? (
              <div className="mt-5 rounded-3xl border border-brand-border bg-white px-5 py-8 text-sm text-brand-slate">
                Checking live availability...
              </div>
            ) : null}

            {availability.error ? (
              <div className="mt-5 rounded-3xl border border-red-200 bg-red-50 px-5 py-4 text-sm leading-7 text-red-700">
                {availability.error}
              </div>
            ) : null}

            {!availability.isLoading &&
            !availability.error &&
            availability.slots.length === 0 ? (
              <div className="mt-5 rounded-3xl border border-brand-border bg-white px-5 py-5 text-sm leading-7 text-brand-slate">
                No live slots remain on this date. Try another weekday.
              </div>
            ) : null}

            {!availability.isLoading &&
            !availability.error &&
            availability.slots.length > 0 ? (
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {availability.slots.map((slot) => {
                  const isActive = selectedSlot?.startIso === slot.startIso;

                  return (
                    <button
                      key={slot.startIso}
                      type="button"
                      className={`flex items-center justify-between rounded-2xl border px-4 py-4 text-left ${
                        isActive
                          ? "border-brand-gold bg-brand-gold text-white"
                          : "border-brand-border bg-white text-brand-navy hover:border-brand-gold"
                      }`}
                      onClick={() => {
                        setSelectedSlot(slot);
                        setValue("slotStart", slot.startIso, {
                          shouldValidate: true,
                        });
                        setValue("slotEnd", slot.endIso, {
                          shouldValidate: true,
                        });
                      }}
                    >
                      <div>
                        <div className="text-sm font-semibold uppercase tracking-[0.12em]">
                          {slot.timeLabel}
                        </div>
                        <div
                          className={`mt-1 text-xs uppercase tracking-[0.12em] ${
                            isActive ? "text-white/72" : "text-brand-slate"
                          }`}
                        >
                          Available now
                        </div>
                      </div>
                      {isActive ? <CheckIcon className="h-5 w-5" /> : null}
                    </button>
                  );
                })}
              </div>
            ) : null}

            {errors.slotStart ? (
              <p className="mt-3 text-sm text-red-700">
                {errors.slotStart.message}
              </p>
            ) : null}
          </div>
          ) : null}
        </div>
      </section>

      <section className="rounded-[2rem] border border-brand-border bg-white p-6 md:p-8">
        {confirmation ? (
          <div className="rounded-[1.5rem] border border-emerald-200 bg-emerald-50 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-600 text-white">
              <CheckIcon className="h-5 w-5" />
            </div>
            <h2 className="mt-5 font-serif text-3xl font-semibold text-brand-navy">
              Consultation booked
            </h2>
            <p className="mt-4 text-[1rem] leading-7 text-brand-slate">
              Your appointment is reserved for {confirmation.consultationDateLabel}{" "}
              at {confirmation.consultationTimeLabel}. A Google Calendar invite
              is on its way to your inbox.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {confirmation.meetLink ? (
                <a
                  href={confirmation.meetLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-3 rounded-2xl bg-brand-navy px-5 py-4 text-sm font-semibold uppercase tracking-[0.14em] text-white hover:bg-brand-navy-mid"
                >
                  <VideoIcon className="h-4 w-4" />
                  Open Meet link
                </a>
              ) : null}

              {confirmation.calendarEventUrl ? (
                <a
                  href={confirmation.calendarEventUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-3 rounded-2xl border border-brand-gold bg-brand-gold px-5 py-4 text-sm font-semibold uppercase tracking-[0.14em] text-white hover:bg-brand-gold-light hover:text-brand-navy"
                >
                  <CalendarIcon className="h-4 w-4" />
                  View calendar event
                </a>
              ) : null}
            </div>

            <button
              type="button"
              className="mt-6 text-sm font-semibold text-brand-navy underline underline-offset-4"
              onClick={() => setConfirmation(null)}
            >
              Book another consultation
            </button>
          </div>
        ) : (
          <form
            className="space-y-6"
            noValidate
            onSubmit={(event) => {
              event.preventDefault();
              void handleSubmit(onSubmit)(event);
            }}
          >
            <div>
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-brand-gold">
                Step 3
              </p>
              <h2 className="mt-2 font-serif text-[clamp(2rem,4vw,2.7rem)] leading-[1.1] font-semibold text-brand-navy">
                Confirm your details
              </h2>
              <p className="mt-3 max-w-2xl text-[1rem] leading-7 text-brand-slate">
                Share who you are, your role in the estate, and the points you
                want covered on the call.
              </p>
            </div>

            <input type="hidden" {...register("selectedDate")} />
            <input type="hidden" {...register("slotStart")} />
            <input type="hidden" {...register("slotEnd")} />

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label
                  className="mb-2 block text-sm font-semibold text-brand-navy"
                  htmlFor="booking-full-name"
                >
                  Full name
                </label>
                <input
                  id="booking-full-name"
                  className={inputClassName}
                  placeholder="Your full name"
                  {...register("fullName")}
                />
                {errors.fullName ? (
                  <p className="mt-2 text-sm text-red-700">
                    {errors.fullName.message}
                  </p>
                ) : null}
              </div>

              <div>
                <label
                  className="mb-2 block text-sm font-semibold text-brand-navy"
                  htmlFor="booking-email"
                >
                  Email address
                </label>
                <input
                  id="booking-email"
                  type="email"
                  className={inputClassName}
                  placeholder="name@example.com"
                  {...register("email")}
                />
                {errors.email ? (
                  <p className="mt-2 text-sm text-red-700">{errors.email.message}</p>
                ) : null}
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label
                  className="mb-2 block text-sm font-semibold text-brand-navy"
                  htmlFor="booking-phone"
                >
                  Contact number
                </label>
                <input
                  id="booking-phone"
                  type="tel"
                  className={inputClassName}
                  placeholder="+44 ..."
                  {...register("phone")}
                />
                {errors.phone ? (
                  <p className="mt-2 text-sm text-red-700">{errors.phone.message}</p>
                ) : null}
              </div>

              <div>
                <label
                  className="mb-2 block text-sm font-semibold text-brand-navy"
                  htmlFor="booking-relationship"
                >
                  Your role in the estate
                </label>
                <select
                  id="booking-relationship"
                  className={inputClassName}
                  defaultValue=""
                  {...register("relationship")}
                >
                  <option value="" disabled>
                    Select an option
                  </option>
                  {relationshipOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                {errors.relationship ? (
                  <p className="mt-2 text-sm text-red-700">
                    {errors.relationship.message}
                  </p>
                ) : null}
              </div>
            </div>

            <div>
              <label
                className="mb-2 block text-sm font-semibold text-brand-navy"
                htmlFor="booking-reason"
              >
                What would you like to cover on the call?
              </label>
              <textarea
                id="booking-reason"
                rows={6}
                className={inputClassName}
                placeholder="Tell us what stage the estate is at, what is unclear, and what guidance you want from the consultation."
                {...register("consultationReason")}
              />
              {errors.consultationReason ? (
                <p className="mt-2 text-sm text-red-700">
                  {errors.consultationReason.message}
                </p>
              ) : null}
            </div>

            <div className="rounded-[1.5rem] border border-brand-border bg-brand-ivory p-5">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-3 text-sm font-semibold text-brand-navy">
                  <ClockIcon className="h-4 w-4 text-brand-gold" />
                  {slotDurationMinutes}-minute consultation
                </div>
                <div className="flex items-center gap-3 text-sm font-semibold text-brand-navy">
                  <PhoneIcon className="h-4 w-4 text-brand-gold" />
                  Minimum notice: {minimumNoticeHours} hours
                </div>
              </div>
              <p className="mt-4 text-sm leading-7 text-brand-slate">
                Please choose a date and time first. Once submitted, the slot is
                reserved immediately in Google Calendar and the invitation is
                emailed automatically.
              </p>
            </div>

            {submitError ? (
              <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {submitError}
              </div>
            ) : null}

            <button
              type="submit"
              disabled={!isCalendarReady || isSubmitting}
              className="inline-flex w-full items-center justify-center rounded-2xl border border-brand-gold bg-brand-gold px-8 py-4 text-sm font-semibold uppercase tracking-[0.14em] text-white hover:bg-brand-gold-light hover:text-brand-navy disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? "Booking consultation..." : "Book consultation"}
            </button>
          </form>
        )}
      </section>
    </div>
  );
}
