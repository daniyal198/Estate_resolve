import { NextResponse } from "next/server";
import {
  buildCaseAdminEmail,
  buildCaseConfirmationEmail,
  createCaseReference,
} from "@/app/lib/email-templates";
import { getAdminAddress, sendEmail } from "@/app/lib/sendgrid";
import { intakeSubmissionSchema } from "@/app/lib/validation";

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
    const caseReference = submission.caseReference || createCaseReference();

    await Promise.all([
      sendEmail({
        html: buildCaseConfirmationEmail(submission, caseReference),
        subject: `Case Received - ${caseReference}`,
        to: submission.yourEmail,
      }),
      sendEmail({
        html: buildCaseAdminEmail(submission, caseReference),
        subject: `New Estate Resolve Case - ${caseReference}`,
        to: getAdminAddress(),
      }),
    ]);

    return NextResponse.json({
      caseReference,
      success: true,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "We could not send the case emails.",
        success: false,
      },
      { status: 500 },
    );
  }
}
