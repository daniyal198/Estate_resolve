import { NextResponse } from "next/server";
import { formatBookingDateLabel } from "@/app/lib/booking";
import {
  getAvailableBookingSlots,
  getBookingPublicSettings,
  isGoogleCalendarConfigured,
} from "@/app/lib/google-calendar";
import { bookingAvailabilityQuerySchema } from "@/app/lib/validation";

export const runtime = "nodejs";

export async function GET(request: Request) {
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
    const { searchParams } = new URL(request.url);
    const parsed = bookingAvailabilityQuerySchema.safeParse({
      date: searchParams.get("date"),
    });

    if (!parsed.success) {
      return NextResponse.json(
        {
          message: "Please provide a valid consultation date.",
          success: false,
        },
        { status: 400 },
      );
    }

    const settings = getBookingPublicSettings();
    const availableSlots = await getAvailableBookingSlots(parsed.data.date);

    return NextResponse.json({
      availableSlots,
      selectedDate: parsed.data.date,
      selectedDateLabel: formatBookingDateLabel(
        `${parsed.data.date}T12:00:00Z`,
        settings.timeZone,
      ),
      success: true,
      timeZone: settings.timeZone,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "We could not load consultation availability.",
        success: false,
      },
      { status: 500 },
    );
  }
}
