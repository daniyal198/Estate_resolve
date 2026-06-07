import { z } from "zod";

export const uploadConstraints = {
  acceptedMimeTypes: ["application/pdf", "image/jpeg", "image/png"] as const,
  maxFileCount: 6,
  maxFileSizeBytes: 10 * 1024 * 1024,
} as const;

function isValidDateInput(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }

  const [year, month, day] = value.split("-").map(Number);
  const candidate = new Date(Date.UTC(year, month - 1, day));

  return (
    candidate.getUTCFullYear() === year &&
    candidate.getUTCMonth() === month - 1 &&
    candidate.getUTCDate() === day
  );
}

function isFutureDateInput(value: string) {
  const [year, month, day] = value.split("-").map(Number);
  const candidateTime = Date.UTC(year, month - 1, day);
  const now = new Date();
  const todayTime = Date.UTC(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
  );

  return candidateTime > todayTime;
}

function isValidIsoDateTime(value: string) {
  const parsedTime = Date.parse(value);

  return Number.isFinite(parsedTime);
}

const requiredTrueMessage = "This confirmation is required.";

export const intakeFormSchema = z.object({
  deceasedFullName: z
    .string()
    .trim()
    .min(2, "Please enter the deceased person's full name."),
  dateOfDeath: z
    .string()
    .refine(isValidDateInput, "Please provide a valid date of birth.")
    .refine(
      (value) => !isFutureDateInput(value),
      "Date of birth cannot be in the future.",
    ),
  niNumber: z
    .string()
    .trim()
    .max(32, "National Insurance number is too long.")
    .optional()
    .or(z.literal("")),
  yourName: z.string().trim().min(2, "Please enter your full name."),
  yourAddress: z
    .string()
    .trim()
    .min(5, "Please enter your address."),
  yourPostalCode: z
    .string()
    .trim()
    .min(3, "Please enter your postal code."),
  yourEmail: z
    .string()
    .trim()
    .email("Please enter a valid email address."),
  yourPhone: z
    .string()
    .trim()
    .min(7, "Please enter a valid contact number."),
  relationship: z
    .string()
    .trim()
    .min(2, "Please select or describe your relationship to the estate."),
  knownInstitutions: z
    .string()
    .trim()
    .max(1500, "Please keep this section under 1500 characters.")
    .optional()
    .or(z.literal("")),
  caseSummary: z
    .string()
    .trim()
    .min(20, "Please provide a short summary so we can assess the matter.")
    .max(2000, "Please keep the case summary under 2000 characters."),
  hasAuthority: z.boolean().refine((value) => value, requiredTrueMessage),
  consentToProcess: z.boolean().refine((value) => value, requiredTrueMessage),
});

export const intakeSubmissionSchema = intakeFormSchema.extend({
  caseReference: z
    .string()
    .trim()
    .min(5, "Case reference is required."),
  uploadedFiles: z
    .array(z.string().url("Each uploaded file must be a valid URL."))
    .max(uploadConstraints.maxFileCount),
});

export const contactFormSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name."),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address."),
  message: z
    .string()
    .trim()
    .min(10, "Please include a brief message.")
    .max(2000, "Please keep your message under 2000 characters."),
});

export const bookingAvailabilityQuerySchema = z.object({
  date: z
    .string()
    .refine(isValidDateInput, "Please provide a valid booking date."),
});

export const bookingFormSchema = z
  .object({
    fullName: z.string().trim().min(2, "Please enter your full name."),
    email: z
      .string()
      .trim()
      .email("Please enter a valid email address."),
    phone: z
      .string()
      .trim()
      .min(7, "Please enter a valid contact number."),
    relationship: z
      .string()
      .trim()
      .min(2, "Please describe your role in the estate."),
    consultationReason: z
      .string()
      .trim()
      .min(20, "Please give us a short outline before booking.")
      .max(1500, "Please keep this summary under 1500 characters."),
    selectedDate: z
      .string()
      .refine(isValidDateInput, "Please select a valid consultation date."),
    slotStart: z
      .string()
      .trim()
      .refine(isValidIsoDateTime, "Please select a valid time slot."),
    slotEnd: z
      .string()
      .trim()
      .refine(isValidIsoDateTime, "Please select a valid time slot."),
  })
  .refine(
    (value) => new Date(value.slotEnd).getTime() > new Date(value.slotStart).getTime(),
    {
      message: "Selected slot timing is invalid.",
      path: ["slotEnd"],
    },
  );

export type IntakeFormData = z.infer<typeof intakeFormSchema>;
export type IntakeSubmissionData = z.infer<typeof intakeSubmissionSchema>;
export type ContactFormData = z.infer<typeof contactFormSchema>;
export type BookingAvailabilityQuery = z.infer<
  typeof bookingAvailabilityQuerySchema
>;
export type BookingFormData = z.infer<typeof bookingFormSchema>;
