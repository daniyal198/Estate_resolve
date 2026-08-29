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
    dateOfBirth: submission.dateOfBirth,
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
    caseSummary: normalizeMetadataValue(submission.caseSummary || "Not provided"),
    uploadedFileCount: String(submission.uploadedFiles.length),
    documentsFolder: getCloudinaryCaseFolder(submission.caseReference),
  } satisfies Record<string, string>;
}

export type VerifiedCheckoutSession = {
  amountPaid: string | null;
  caseReference: string | null;
  clientEmail: string | null;
  serviceLabel: string | null;
  sessionId: string;
};

/**
 * Confirms with Stripe that a checkout session was actually paid.
 *
 * The success page is a public URL, so the `session_id` in the query string
 * proves nothing on its own. Nothing may be presented as confirmed until
 * Stripe itself reports `payment_status === "paid"`.
 */
export async function verifyPaidCheckoutSession(
  sessionId: string,
): Promise<VerifiedCheckoutSession | null> {
  if (!sessionId.startsWith("cs_")) {
    return null;
  }

  try {
    const stripe = getStripeClient();
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      return null;
    }

    const metadata = session.metadata || {};

    return {
      amountPaid:
        typeof session.amount_total === "number"
          ? new Intl.NumberFormat("en-GB", {
              currency: (session.currency || "gbp").toUpperCase(),
              style: "currency",
            }).format(session.amount_total / 100)
          : null,
      caseReference: session.client_reference_id || metadata.caseReference || null,
      clientEmail:
        session.customer_details?.email || session.customer_email || null,
      serviceLabel: metadata.servicePackageLabel || null,
      sessionId: session.id,
    };
  } catch {
    return null;
  }
}
