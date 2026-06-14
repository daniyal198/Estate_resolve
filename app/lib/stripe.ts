import Stripe from "stripe";
import { config } from "@/app/lib/config";
import { getCloudinaryCaseFolder } from "@/app/lib/cloudinary";
import type { IntakeSubmissionData } from "@/app/lib/validation";

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

export function getServicePackagePricing(servicePackage: string) {
  const serviceOption = config.pricing.servicePackages.find(
    (option) => option.value === servicePackage,
  );

  if (!serviceOption) {
    throw new Error("Selected service option is invalid.");
  }

  return serviceOption;
}

export function buildCheckoutMetadata(submission: IntakeSubmissionData) {
  const serviceOption = getServicePackagePricing(submission.servicePackage);

  return {
    caseReference: submission.caseReference,
    deceasedName: normalizeMetadataValue(submission.deceasedFullName),
    dateOfDeath: submission.dateOfDeath,
    clientName: normalizeMetadataValue(submission.yourName),
    clientAddress: normalizeMetadataValue(submission.yourAddress),
    clientPostalCode: normalizeMetadataValue(submission.yourPostalCode),
    clientEmail: normalizeMetadataValue(submission.yourEmail),
    clientPhone: normalizeMetadataValue(submission.yourPhone),
    servicePackage: serviceOption.value,
    servicePackageLabel: normalizeMetadataValue(serviceOption.label),
    servicePackagePrice: serviceOption.price,
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
