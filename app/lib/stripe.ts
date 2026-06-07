import Stripe from "stripe";
import { getCloudinaryCaseFolder } from "@/app/lib/cloudinary";
import type { IntakeSubmissionData } from "@/app/lib/validation";

export const PRICE_GBP_PENCE = 17500;

const STRIPE_API_VERSION = "2026-04-22.dahlia";
const METADATA_LIMIT = 500;

function normalizeMetadataValue(value: string) {
  return value.replace(/\s+/g, " ").trim().slice(0, METADATA_LIMIT);
}

export function getStripeClient() {
  const secretKey = process.env.STRIPE_SECRET_KEY;

  if (!secretKey) {
    throw new Error("Stripe secret key is not configured.");
  }

  return new Stripe(secretKey, {
    apiVersion: STRIPE_API_VERSION,
  });
}

export function buildCheckoutMetadata(submission: IntakeSubmissionData) {
  return {
    caseReference: submission.caseReference,
    deceasedName: normalizeMetadataValue(submission.deceasedFullName),
    dateOfDeath: submission.dateOfDeath,
    clientName: normalizeMetadataValue(submission.yourName),
    clientEmail: normalizeMetadataValue(submission.yourEmail),
    clientPhone: normalizeMetadataValue(submission.yourPhone),
    relationship: normalizeMetadataValue(submission.relationship),
    niNumber: normalizeMetadataValue(submission.niNumber || "Not provided"),
    knownInstitutions: normalizeMetadataValue(
      submission.knownInstitutions || "Not provided",
    ),
    caseSummary: normalizeMetadataValue(submission.caseSummary),
    uploadedFileCount: String(submission.uploadedFiles.length),
    documentsFolder: getCloudinaryCaseFolder(submission.caseReference),
  } satisfies Record<string, string>;
}
