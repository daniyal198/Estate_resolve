import { z } from "zod";

export const uploadConstraints = {
  acceptedMimeTypes: ["application/pdf", "image/jpeg", "image/png"] as const,
  maxFileCount: 4,
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

const requiredTrueMessage = "This confirmation is required.";

export const intakeFormSchema = z.object({
  deceasedFullName: z
    .string()
    .trim()
    .min(2, "Please enter the deceased person's full name."),
  dateOfDeath: z
    .string()
    .refine(isValidDateInput, "Please provide a valid date of death.")
    .refine(
      (value) => !isFutureDateInput(value),
      "Date of death cannot be in the future.",
    ),
  niNumber: z
    .string()
    .trim()
    .max(32, "National Insurance number is too long.")
    .optional()
    .or(z.literal("")),
  yourName: z.string().trim().min(2, "Please enter your full name."),
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

export type IntakeFormData = z.infer<typeof intakeFormSchema>;
export type IntakeSubmissionData = z.infer<typeof intakeSubmissionSchema>;
export type ContactFormData = z.infer<typeof contactFormSchema>;
