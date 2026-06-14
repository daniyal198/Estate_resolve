import { NextResponse } from "next/server";
import {
  buildSolicitorEnquiryAdminEmail,
  buildSolicitorEnquiryConfirmationEmail,
} from "@/app/lib/email-templates";
import { getAdminAddress, sendEmail } from "@/app/lib/sendgrid";
import { solicitorEnquiryFormSchema } from "@/app/lib/validation";

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const parsed = solicitorEnquiryFormSchema.safeParse(payload);

    if (!parsed.success) {
      return NextResponse.json(
        {
          message: "Please review the professional enquiry details and try again.",
          success: false,
        },
        { status: 400 },
      );
    }

    const submission = parsed.data;

    await Promise.all([
      sendEmail({
        html: buildSolicitorEnquiryConfirmationEmail(submission),
        subject: "We have received your professional enquiry",
        to: submission.email,
      }),
      sendEmail({
        html: buildSolicitorEnquiryAdminEmail(submission),
        subject: `New solicitor enquiry - ${submission.company}`,
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
            : "We could not send your professional enquiry.",
        success: false,
      },
      { status: 500 },
    );
  }
}
