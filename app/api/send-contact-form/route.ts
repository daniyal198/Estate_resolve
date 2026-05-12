import { NextResponse } from "next/server";
import {
  buildContactAdminEmail,
  buildContactConfirmationEmail,
} from "@/app/lib/email-templates";
import { contactFormSchema } from "@/app/lib/validation";
import { getAdminAddress, sendEmail } from "@/app/lib/sendgrid";

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const parsed = contactFormSchema.safeParse(payload);

    if (!parsed.success) {
      return NextResponse.json(
        {
          message: "Please check the contact form details and try again.",
          success: false,
        },
        { status: 400 },
      );
    }

    const submission = parsed.data;

    await Promise.all([
      sendEmail({
        html: buildContactConfirmationEmail(submission),
        subject: "We have received your message",
        to: submission.email,
      }),
      sendEmail({
        html: buildContactAdminEmail(submission),
        subject: "New Estate Resolve Contact Enquiry",
        to: getAdminAddress(),
      }),
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "We could not send your message.",
        success: false,
      },
      { status: 500 },
    );
  }
}
