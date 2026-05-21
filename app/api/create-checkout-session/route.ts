import { NextResponse } from "next/server";
import {
  PRICE_GBP_PENCE,
  buildCheckoutMetadata,
  getStripeClient,
} from "@/app/lib/stripe";
import { intakeSubmissionSchema } from "@/app/lib/validation";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const parsed = intakeSubmissionSchema.safeParse(payload);

    if (!parsed.success) {
      return NextResponse.json(
        {
          message: "Please check the form details and try again.",
          success: false,
        },
        { status: 400 },
      );
    }

    const submission = parsed.data;
    const stripe = getStripeClient();
    const origin = new URL(request.url).origin;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "gbp",
            product_data: {
              name: "Estate Financial Search Service",
              description: `Case for ${submission.deceasedFullName}`,
            },
            unit_amount: PRICE_GBP_PENCE,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}&case_reference=${encodeURIComponent(submission.caseReference)}`,
      cancel_url: `${origin}/cancel?case_reference=${encodeURIComponent(submission.caseReference)}`,
      customer_email: submission.yourEmail,
      client_reference_id: submission.caseReference,
      metadata: buildCheckoutMetadata(submission),
    });

    if (!session.url) {
      throw new Error("Stripe checkout session did not return a redirect URL.");
    }

    return NextResponse.json({
      sessionId: session.id,
      success: true,
      url: session.url,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "We could not start the secure payment flow.",
        success: false,
      },
      { status: 500 },
    );
  }
}
