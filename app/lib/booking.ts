export const bookingDefaults = {
  bookingWindowDays: 21,
  businessHoursEnd: "17:30",
  businessHoursStart: "09:00",
  minimumNoticeHours: 24,
  slotDurationMinutes: 30,
  timeZone: "Europe/London",
} as const;

export type BookingDateOption = {
  description: string;
  label: string;
  value: string;
};

export type BookingSlot = {
  endIso: string;
  startIso: string;
  timeLabel: string;
};

type DateParts = {
  day: number;
  hour: number;
  minute: number;
  month: number;
  second: number;
  year: number;
};

function formatDateString(parts: Pick<DateParts, "day" | "month" | "year">) {
  return `${parts.year}-${String(parts.month).padStart(2, "0")}-${String(
    parts.day,
  ).padStart(2, "0")}`;
}

function getFormatter(
  timeZone: string,
  options: Intl.DateTimeFormatOptions,
) {
  return new Intl.DateTimeFormat("en-GB", {
    ...options,
    hourCycle: "h23",
    timeZone,
  });
}

function getTimeZoneParts(date: Date, timeZone: string): DateParts {
  const parts = getFormatter(timeZone, {
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    month: "2-digit",
    second: "2-digit",
    year: "numeric",
  }).formatToParts(date);
  const values = Object.fromEntries(
    parts
      .filter((part) => part.type !== "literal")
      .map((part) => [part.type, Number(part.value)]),
  );

  return {
    day: values.day,
    hour: values.hour,
    minute: values.minute,
    month: values.month,
    second: values.second,
    year: values.year,
  };
}

function parseDateString(dateString: string) {
  const [year, month, day] = dateString.split("-").map(Number);

  return { day, month, year };
}

function parseTimeString(timeString: string) {
  const [hour, minute] = timeString.split(":").map(Number);

  return { hour, minute };
}

export function getCurrentDateInTimeZone(timeZone: string) {
  return formatDateString(getTimeZoneParts(new Date(), timeZone));
}

export function getDateStringInTimeZone(
  dateInput: Date | string,
  timeZone: string,
) {
  const date =
    typeof dateInput === "string" ? new Date(dateInput) : dateInput;

  return formatDateString(getTimeZoneParts(date, timeZone));
}

export function addDaysToDateString(dateString: string, days: number) {
  const { day, month, year } = parseDateString(dateString);
  const nextDate = new Date(Date.UTC(year, month - 1, day, 12, 0, 0));

  nextDate.setUTCDate(nextDate.getUTCDate() + days);

  return nextDate.toISOString().slice(0, 10);
}

export function getDaysBetween(startDate: string, endDate: string) {
  const start = new Date(`${startDate}T12:00:00Z`);
  const end = new Date(`${endDate}T12:00:00Z`);

  return Math.round((end.getTime() - start.getTime()) / 86_400_000);
}

export function getZonedDateTime(
  dateString: string,
  timeString: string,
  timeZone: string,
) {
  const { day, month, year } = parseDateString(dateString);
  const { hour, minute } = parseTimeString(timeString);
  const desiredTime = Date.UTC(year, month - 1, day, hour, minute, 0);
  let candidate = new Date(desiredTime);

  // Resolve the target local time to the correct UTC instant for the time zone.
  for (let attempt = 0; attempt < 3; attempt += 1) {
    const parts = getTimeZoneParts(candidate, timeZone);
    const actualTime = Date.UTC(
      parts.year,
      parts.month - 1,
      parts.day,
      parts.hour,
      parts.minute,
      parts.second,
    );
    const difference = desiredTime - actualTime;

    if (difference === 0) {
      break;
    }

    candidate = new Date(candidate.getTime() + difference);
  }

  return candidate;
}

export function isBusinessDay(dateString: string, timeZone: string) {
  const weekday = getFormatter(timeZone, {
    weekday: "short",
  }).format(getZonedDateTime(dateString, "12:00", timeZone));

  return weekday !== "Sat" && weekday !== "Sun";
}

export function buildUpcomingBookingDates(
  timeZone: string,
  count = 7,
  bookingWindowDays: number = bookingDefaults.bookingWindowDays,
): BookingDateOption[] {
  const dates: BookingDateOption[] = [];
  const today = getCurrentDateInTimeZone(timeZone);

  for (
    let offset = 0;
    offset <= bookingWindowDays && dates.length < count;
    offset += 1
  ) {
    const candidate = addDaysToDateString(today, offset);

    if (!isBusinessDay(candidate, timeZone)) {
      continue;
    }

    dates.push({
      description: getFormatter(timeZone, {
        day: "numeric",
        month: "long",
        weekday: "long",
      }).format(getZonedDateTime(candidate, "12:00", timeZone)),
      label: getFormatter(timeZone, {
        day: "numeric",
        month: "short",
        weekday: "short",
      }).format(getZonedDateTime(candidate, "12:00", timeZone)),
      value: candidate,
    });
  }

  return dates;
}

export function formatBookingSlotLabel(dateInput: Date | string, timeZone: string) {
  const date =
    typeof dateInput === "string" ? new Date(dateInput) : dateInput;

  return getFormatter(timeZone, {
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

export function formatBookingDateLabel(dateInput: Date | string, timeZone: string) {
  const date =
    typeof dateInput === "string" ? new Date(dateInput) : dateInput;

  return getFormatter(timeZone, {
    day: "numeric",
    month: "long",
    weekday: "long",
  }).format(date);
}
