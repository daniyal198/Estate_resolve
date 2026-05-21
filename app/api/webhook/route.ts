import type Stripe from "stripe";
import { NextResponse } from "next/server";
import {
  buildPaymentAdminEmail,
  buildPaymentConfirmationEmail,
  createCaseReference,
} from "@/app/lib/email-templates";
import { getAdminAddress, sendEmail } from "@/app/lib/sendgrid";
import { config } from "@/app/lib/config";
import { getStripeClient } from "@/app/lib/stripe";

export const runtime = "nodejs";

function formatPaymentAmount(amountTotal?: number | null) {
  if (typeof amountTotal !== "number") {
    return config.pricing.fixedFee;
  }

  return new Intl.NumberFormat("en-GB", {
    currency: "GBP",
    style: "currency",
  }).format(amountTotal / 100);
}

export async function POST(request: Request) {
  const signature = request.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !webhookSecret) {
    return NextResponse.json(
      { error: "Stripe webhook signature is not configured." },
      { status: 400 },
    );
  }

  const rawBody = await request.text();
  const stripe = getStripeClient();
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch {
    return NextResponse.json({ error: "Invalid Stripe signature." }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    if (session.payment_status === "paid") {
      const metadata = session.metadata || {};
      const caseReference =
        session.client_reference_id || metadata.caseReference || createCaseReference();
      const clientEmail =
        session.customer_details?.email || session.customer_email || metadata.clientEmail;
      const clientName =
        metadata.clientName || session.customer_details?.name || "Client";

      const emailJobs: Promise<unknown>[] = [];

      if (clientEmail) {
        emailJobs.push(
          sendEmail({
            html: buildPaymentConfirmationEmail({
              caseReference,
              clientName,
            }),
            subject: `Payment Confirmed - ${caseReference}`,
            to: clientEmail,
          }),
        );
      }

      emailJobs.push(
        sendEmail({
          html: buildPaymentAdminEmail({
            caseReference,
            caseSummary: metadata.caseSummary || "Not provided",
            clientEmail: metadata.clientEmail || clientEmail || "Not provided",
            clientName,
            clientPhone: metadata.clientPhone || "Not provided",
            dateOfDeath: metadata.dateOfDeath || new Date().toISOString().slice(0, 10),
            deceasedName: metadata.deceasedName || "Not provided",
            documentsFolder: metadata.documentsFolder || caseReference,
            knownInstitutions: metadata.knownInstitutions || "Not provided",
            niNumber: metadata.niNumber || "Not provided",
            paymentAmount: formatPaymentAmount(session.amount_total),
            relationship: metadata.relationship || "Not provided",
            sessionId: session.id,
            uploadedFileCount: metadata.uploadedFileCount || "0",
          }),
          subject: `Payment Received - ${caseReference}`,
          to: getAdminAddress(),
        }),
      );

      await Promise.all(emailJobs);
    }
  }

  return NextResponse.json({ received: true });
}
