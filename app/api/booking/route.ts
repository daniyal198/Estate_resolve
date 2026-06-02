import { NextResponse } from "next/server";
import {
  buildBookingAdminEmail,
  buildBookingConfirmationEmail,
} from "@/app/lib/email-templates";
import {
  formatBookingDateLabel,
  formatBookingSlotLabel,
} from "@/app/lib/booking";
import {
  createBooking,
  getBookingPublicSettings,
  isGoogleCalendarConfigured,
} from "@/app/lib/google-calendar";
import { getAdminAddress, sendEmail } from "@/app/lib/sendgrid";
import { bookingFormSchema } from "@/app/lib/validation";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!isGoogleCalendarConfigured()) {
    return NextResponse.json(
      {
        message: "Google Calendar booking is not configured yet.",
        success: false,
      },
      { status: 503 },
    );
  }

  try {
    const payload = await request.json();
    const parsed = bookingFormSchema.safeParse(payload);

    if (!parsed.success) {
      return NextResponse.json(
        {
          message: "Please review the consultation details and try again.",
          success: false,
        },
        { status: 400 },
      );
    }

    const settings = getBookingPublicSettings();
    const booking = await createBooking(parsed.data);
    const consultationDateLabel = formatBookingDateLabel(
      parsed.data.slotStart,
      settings.timeZone,
    );
    const consultationTimeLabel = formatBookingSlotLabel(
      parsed.data.slotStart,
      settings.timeZone,
    );

    const emailResults = await Promise.allSettled([
      sendEmail({
        html: buildBookingConfirmationEmail({
          consultationDateLabel,
          consultationTimeLabel,
          fullName: parsed.data.fullName,
          meetLink: booking.meetLink,
          timeZone: settings.timeZone,
        }),
        subject: `Consultation booked - ${consultationDateLabel} at ${consultationTimeLabel}`,
        to: parsed.data.email,
      }),
      sendEmail({
        html: buildBookingAdminEmail({
          consultationDateLabel,
          consultationTimeLabel,
          htmlLink: booking.htmlLink,
          meetLink: booking.meetLink,
          submission: parsed.data,
          timeZone: settings.timeZone,
        }),
        subject: `New consultation booking - ${parsed.data.fullName}`,
        to: getAdminAddress(),
      }),
    ]);
    const emailWarnings = emailResults.some(
      (result) => result.status === "rejected",
    );

    return NextResponse.json({
      booking,
      consultationDateLabel,
      consultationTimeLabel,
      emailWarning: emailWarnings,
      success: true,
      timeZone: settings.timeZone,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "We could not create the consultation booking.",
        success: false,
      },
      { status: 500 },
    );
  }
}
