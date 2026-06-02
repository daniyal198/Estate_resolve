import { google } from "googleapis";
import type { calendar_v3 } from "googleapis";
import {
  bookingDefaults,
  formatBookingSlotLabel,
  getCurrentDateInTimeZone,
  getDateStringInTimeZone,
  getDaysBetween,
  getZonedDateTime,
  isBusinessDay,
  type BookingSlot,
} from "@/app/lib/booking";
import type { BookingFormData } from "@/app/lib/validation";

const calendarScopes: string[] = [
  "https://www.googleapis.com/auth/calendar",
];

type BookingSettings = {
  bookingWindowDays: number;
  businessHoursEnd: string;
  businessHoursStart: string;
  calendarId: string;
  createMeetLink: boolean;
  eventLocation: string;
  eventTitlePrefix: string;
  minimumNoticeHours: number;
  privateKey: string;
  serviceAccountEmail: string;
  slotDurationMinutes: number;
  timeZone: string;
};

function parsePositiveInteger(
  value: string | undefined,
  fallback: number,
  fieldName: string,
) {
  if (!value) {
    return fallback;
  }

  const parsed = Number(value);

  if (!Number.isInteger(parsed) || parsed <= 0) {
    throw new Error(`${fieldName} must be a positive whole number.`);
  }

  return parsed;
}

function parseClockTime(value: string | undefined, fallback: string, fieldName: string) {
  const resolved = value || fallback;

  if (!/^\d{2}:\d{2}$/.test(resolved)) {
    throw new Error(`${fieldName} must use HH:MM format.`);
  }

  return resolved;
}

function getBookingSettings(): BookingSettings {
  const calendarId = process.env.GOOGLE_CALENDAR_ID;
  const serviceAccountEmail = process.env.GOOGLE_CALENDAR_CLIENT_EMAIL;
  const privateKey = process.env.GOOGLE_CALENDAR_PRIVATE_KEY?.replace(
    /\\n/g,
    "\n",
  );

  if (!calendarId) {
    throw new Error("Google Calendar ID is not configured.");
  }

  if (!serviceAccountEmail) {
    throw new Error("Google Calendar service account email is not configured.");
  }

  if (!privateKey) {
    throw new Error("Google Calendar private key is not configured.");
  }

  const slotDurationMinutes = parsePositiveInteger(
    process.env.GOOGLE_CALENDAR_SLOT_DURATION_MINUTES ||
      process.env.NEXT_PUBLIC_BOOKING_SLOT_DURATION_MINUTES,
    bookingDefaults.slotDurationMinutes,
    "Google Calendar slot duration",
  );
  const bookingWindowDays = parsePositiveInteger(
    process.env.GOOGLE_CALENDAR_BOOKING_WINDOW_DAYS ||
      process.env.NEXT_PUBLIC_BOOKING_WINDOW_DAYS,
    bookingDefaults.bookingWindowDays,
    "Google Calendar booking window",
  );
  const minimumNoticeHours = parsePositiveInteger(
    process.env.GOOGLE_CALENDAR_MIN_NOTICE_HOURS ||
      process.env.NEXT_PUBLIC_BOOKING_MIN_NOTICE_HOURS,
    bookingDefaults.minimumNoticeHours,
    "Google Calendar minimum notice",
  );
  const businessHoursStart = parseClockTime(
    process.env.GOOGLE_CALENDAR_BUSINESS_HOURS_START ||
      process.env.NEXT_PUBLIC_BOOKING_BUSINESS_HOURS_START,
    bookingDefaults.businessHoursStart,
    "Google Calendar business-hours start",
  );
  const businessHoursEnd = parseClockTime(
    process.env.GOOGLE_CALENDAR_BUSINESS_HOURS_END ||
      process.env.NEXT_PUBLIC_BOOKING_BUSINESS_HOURS_END,
    bookingDefaults.businessHoursEnd,
    "Google Calendar business-hours end",
    );
  const timeZone =
    process.env.GOOGLE_CALENDAR_TIME_ZONE ||
    process.env.NEXT_PUBLIC_BOOKING_TIME_ZONE ||
    bookingDefaults.timeZone;

  return {
    bookingWindowDays,
    businessHoursEnd,
    businessHoursStart,
    calendarId,
    createMeetLink: process.env.GOOGLE_CALENDAR_CREATE_MEET_LINK === "true",
    eventLocation:
      process.env.GOOGLE_CALENDAR_BOOKING_LOCATION ||
      "Phone or Google Meet consultation",
    eventTitlePrefix:
      process.env.GOOGLE_CALENDAR_EVENT_TITLE_PREFIX ||
      "Estate Resolve consultation",
    minimumNoticeHours,
    privateKey,
    serviceAccountEmail,
    slotDurationMinutes,
    timeZone,
  };
}

function getCalendarClient() {
  const settings = getBookingSettings();
  const auth = new google.auth.JWT({
    email: settings.serviceAccountEmail,
    key: settings.privateKey,
    scopes: calendarScopes,
  });

  return google.calendar({
    auth,
    version: "v3",
  });
}

function getBusinessRangeForDate(date: string, settings: BookingSettings) {
  const start = getZonedDateTime(
    date,
    settings.businessHoursStart,
    settings.timeZone,
  );
  const end = getZonedDateTime(date, settings.businessHoursEnd, settings.timeZone);

  if (end.getTime() <= start.getTime()) {
    throw new Error("Booking business hours are invalid.");
  }

  return { end, start };
}

function isOverlappingBusyRange(
  slotStart: Date,
  slotEnd: Date,
  busyRanges: calendar_v3.Schema$TimePeriod[],
) {
  return busyRanges.some((busyRange) => {
    if (!busyRange.start || !busyRange.end) {
      return false;
    }

    const busyStart = new Date(busyRange.start);
    const busyEnd = new Date(busyRange.end);

    return slotStart < busyEnd && slotEnd > busyStart;
  });
}

async function getBusyRanges(
  calendar: calendar_v3.Calendar,
  settings: BookingSettings,
  timeMin: string,
  timeMax: string,
) {
  const response = await calendar.freebusy.query({
    requestBody: {
      items: [{ id: settings.calendarId }],
      timeMax,
      timeMin,
      timeZone: settings.timeZone,
    },
  });

  return response.data.calendars?.[settings.calendarId]?.busy || [];
}

function assertBookingDateAllowed(date: string, settings: BookingSettings) {
  const today = getCurrentDateInTimeZone(settings.timeZone);
  const daysAhead = getDaysBetween(today, date);

  if (daysAhead < 0) {
    throw new Error("You can only book future consultation slots.");
  }

  if (daysAhead > settings.bookingWindowDays) {
    throw new Error("This date is outside the current consultation window.");
  }

  if (!isBusinessDay(date, settings.timeZone)) {
    throw new Error("Consultations are available Monday to Friday.");
  }
}

function assertBookingSlotAllowed(submission: BookingFormData, settings: BookingSettings) {
  assertBookingDateAllowed(submission.selectedDate, settings);

  const slotStart = new Date(submission.slotStart);
  const slotEnd = new Date(submission.slotEnd);

  if (
    getDateStringInTimeZone(slotStart, settings.timeZone) !==
    submission.selectedDate
  ) {
    throw new Error("Selected consultation date does not match the chosen slot.");
  }

  const durationMinutes =
    (slotEnd.getTime() - slotStart.getTime()) / 60_000;

  if (durationMinutes !== settings.slotDurationMinutes) {
    throw new Error("Selected consultation slot duration is invalid.");
  }

  const { end, start } = getBusinessRangeForDate(
    submission.selectedDate,
    settings,
  );
  const minimumStartTime = new Date(
    Date.now() + settings.minimumNoticeHours * 60 * 60 * 1000,
  );

  if (slotStart < minimumStartTime) {
    throw new Error("This slot no longer meets the minimum booking notice.");
  }

  if (slotStart < start || slotEnd > end) {
    throw new Error("Selected consultation slot is outside working hours.");
  }
}

function buildBookingDescription(submission: BookingFormData) {
  return [
    `Client: ${submission.fullName}`,
    `Email: ${submission.email}`,
    `Phone: ${submission.phone}`,
    `Role in estate: ${submission.relationship}`,
    "",
    "Consultation summary:",
    submission.consultationReason,
  ].join("\n");
}

export function isGoogleCalendarConfigured() {
  return Boolean(
    process.env.GOOGLE_CALENDAR_ID &&
      process.env.GOOGLE_CALENDAR_CLIENT_EMAIL &&
      process.env.GOOGLE_CALENDAR_PRIVATE_KEY,
  );
}

export function getBookingPublicSettings() {
  const settings = getBookingSettings();

  return {
    bookingWindowDays: settings.bookingWindowDays,
    businessHoursEnd: settings.businessHoursEnd,
    businessHoursStart: settings.businessHoursStart,
    minimumNoticeHours: settings.minimumNoticeHours,
    slotDurationMinutes: settings.slotDurationMinutes,
    timeZone: settings.timeZone,
  };
}

export async function getAvailableBookingSlots(date: string): Promise<BookingSlot[]> {
  const settings = getBookingSettings();

  assertBookingDateAllowed(date, settings);

  const calendar = getCalendarClient();
  const { end, start } = getBusinessRangeForDate(date, settings);
  const busyRanges = await getBusyRanges(
    calendar,
    settings,
    start.toISOString(),
    end.toISOString(),
  );
  const slotDurationMs = settings.slotDurationMinutes * 60_000;
  const minimumStartTime = new Date(
    Date.now() + settings.minimumNoticeHours * 60 * 60 * 1000,
  );
  const slots: BookingSlot[] = [];

  for (
    let slotStart = start.getTime();
    slotStart + slotDurationMs <= end.getTime();
    slotStart += slotDurationMs
  ) {
    const candidateStart = new Date(slotStart);
    const candidateEnd = new Date(slotStart + slotDurationMs);

    if (candidateStart < minimumStartTime) {
      continue;
    }

    if (isOverlappingBusyRange(candidateStart, candidateEnd, busyRanges)) {
      continue;
    }

    slots.push({
      endIso: candidateEnd.toISOString(),
      startIso: candidateStart.toISOString(),
      timeLabel: formatBookingSlotLabel(candidateStart, settings.timeZone),
    });
  }

  return slots;
}

export async function createBooking(submission: BookingFormData) {
  const settings = getBookingSettings();

  assertBookingSlotAllowed(submission, settings);

  const slotStart = new Date(submission.slotStart);
  const slotEnd = new Date(submission.slotEnd);
  const calendar = getCalendarClient();
  const busyRanges = await getBusyRanges(
    calendar,
    settings,
    slotStart.toISOString(),
    slotEnd.toISOString(),
  );

  if (isOverlappingBusyRange(slotStart, slotEnd, busyRanges)) {
    throw new Error("That consultation slot has just been taken. Please choose another.");
  }

  const requestBody: calendar_v3.Schema$Event = {
    description: buildBookingDescription(submission),
    end: {
      dateTime: slotEnd.toISOString(),
      timeZone: settings.timeZone,
    },
    guestsCanInviteOthers: false,
    guestsCanModify: false,
    location: settings.eventLocation,
    reminders: {
      useDefault: true,
    },
    start: {
      dateTime: slotStart.toISOString(),
      timeZone: settings.timeZone,
    },
    summary: `${settings.eventTitlePrefix}: ${submission.fullName}`,
    visibility: "private",
  };

  const insertResponse = await calendar.events.insert({
    calendarId: settings.calendarId,
    conferenceDataVersion: settings.createMeetLink ? 1 : 0,
    requestBody: settings.createMeetLink
      ? {
          ...requestBody,
          conferenceData: {
            createRequest: {
              requestId: crypto.randomUUID(),
            },
          },
        }
      : requestBody,
    sendUpdates: "none",
  });

  if (!insertResponse.data.id) {
    throw new Error("Google Calendar did not return a booking ID.");
  }

  const meetLink = insertResponse.data.conferenceData?.entryPoints?.find(
    (entryPoint) => entryPoint.entryPointType === "video",
  )?.uri;

  return {
    calendarEventId: insertResponse.data.id,
    htmlLink: insertResponse.data.htmlLink || null,
    meetLink: meetLink || null,
  };
}
