import type {
  BookingFormData,
  ContactFormData,
  IntakeSubmissionData,
} from "@/app/lib/validation";
import { config } from "@/app/lib/config";

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderUploadedFiles(urls: string[]) {
  if (urls.length === 0) {
    return "<p><strong>Uploaded documents:</strong> None provided at submission.</p>";
  }

  const items = urls
    .map(
      (url, index) =>
        `<li><a href="${escapeHtml(url)}">${`Document ${index + 1}`}</a></li>`,
    )
    .join("");

  return `<p><strong>Uploaded documents:</strong></p><ul>${items}</ul>`;
}

function formatDate(dateValue: string) {
  const [year, month, day] = dateValue.split("-").map(Number);
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(Date.UTC(year, month - 1, day)));
}

export function createCaseReference() {
  const datePart = new Date().toISOString().slice(0, 10).replaceAll("-", "");
  const randomPart = Math.random().toString(36).slice(2, 8).toUpperCase();

  return `ER-${datePart}-${randomPart}`;
}

export function buildCaseConfirmationEmail(
  submission: IntakeSubmissionData,
  caseReference: string,
) {
  return `
    <h2>We have received your case</h2>
    <p>Dear ${escapeHtml(submission.yourName)},</p>
    <p>Thank you for submitting your estate enquiry. We have received the details for <strong>${escapeHtml(submission.deceasedFullName)}</strong>.</p>
    <p><strong>Case reference:</strong> ${escapeHtml(caseReference)}</p>
    <p>Our team will review the information provided and follow up with the appropriate next steps.</p>
    ${renderUploadedFiles(submission.uploadedFiles)}
    <p>Kind regards,<br />Estate Resolve</p>
  `;
}

export function buildCaseAdminEmail(
  submission: IntakeSubmissionData,
  caseReference: string,
) {
  return `
    <h2>New estate case submitted</h2>
    <p><strong>Case reference:</strong> ${escapeHtml(caseReference)}</p>
    <p><strong>Deceased:</strong> ${escapeHtml(submission.deceasedFullName)}</p>
    <p><strong>Date of death:</strong> ${escapeHtml(formatDate(submission.dateOfDeath))}</p>
    <p><strong>Client name:</strong> ${escapeHtml(submission.yourName)}</p>
    <p><strong>Email:</strong> ${escapeHtml(submission.yourEmail)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(submission.yourPhone)}</p>
    <p><strong>Relationship:</strong> ${escapeHtml(submission.relationship)}</p>
    <p><strong>Known institutions:</strong> ${escapeHtml(submission.knownInstitutions || "Not provided")}</p>
    <p><strong>Summary:</strong><br />${escapeHtml(submission.caseSummary).replaceAll("\n", "<br />")}</p>
    ${renderUploadedFiles(submission.uploadedFiles)}
  `;
}

export function buildContactConfirmationEmail(submission: ContactFormData) {
  return `
    <h2>Thank you for contacting Estate Resolve</h2>
    <p>Hi ${escapeHtml(submission.name)},</p>
    <p>We have received your message and will respond as soon as possible.</p>
    <p>Kind regards,<br />Estate Resolve</p>
  `;
}

export function buildContactAdminEmail(submission: ContactFormData) {
  return `
    <h2>New contact enquiry</h2>
    <p><strong>Name:</strong> ${escapeHtml(submission.name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(submission.email)}</p>
    <p><strong>Message:</strong><br />${escapeHtml(submission.message).replaceAll("\n", "<br />")}</p>
  `;
}

type PaymentConfirmationEmailInput = {
  caseReference: string;
  clientName: string;
};

type PaymentAdminEmailInput = {
  caseReference: string;
  caseSummary: string;
  clientEmail: string;
  clientName: string;
  clientPhone: string;
  dateOfDeath: string;
  deceasedName: string;
  documentsFolder: string;
  knownInstitutions: string;
  niNumber: string;
  paymentAmount: string;
  relationship: string;
  sessionId: string;
  uploadedFileCount: string;
};

type BookingConfirmationEmailInput = {
  consultationDateLabel: string;
  consultationTimeLabel: string;
  fullName: string;
  meetLink: string | null;
  timeZone: string;
};

type BookingAdminEmailInput = {
  consultationDateLabel: string;
  consultationTimeLabel: string;
  htmlLink: string | null;
  meetLink: string | null;
  submission: BookingFormData;
  timeZone: string;
};

export function buildPaymentConfirmationEmail({
  caseReference,
  clientName,
}: PaymentConfirmationEmailInput) {
  return `
    <h2>Payment confirmed</h2>
    <p>Dear ${escapeHtml(clientName)},</p>
    <p>We have received your payment and your Estate Resolve case is now open.</p>
    <p><strong>Case reference:</strong> ${escapeHtml(caseReference)}</p>
    <p>Our team will begin the financial search process and update you within ${escapeHtml(config.timeline.standardTurnaround)}.</p>
    <p>Kind regards,<br />Estate Resolve</p>
  `;
}

export function buildPaymentAdminEmail({
  caseReference,
  caseSummary,
  clientEmail,
  clientName,
  clientPhone,
  dateOfDeath,
  deceasedName,
  documentsFolder,
  knownInstitutions,
  niNumber,
  paymentAmount,
  relationship,
  sessionId,
  uploadedFileCount,
}: PaymentAdminEmailInput) {
  return `
    <h2>Payment received for new estate case</h2>
    <p><strong>Case reference:</strong> ${escapeHtml(caseReference)}</p>
    <p><strong>Payment:</strong> ${escapeHtml(paymentAmount)}</p>
    <p><strong>Stripe session ID:</strong> ${escapeHtml(sessionId)}</p>
    <p><strong>Deceased:</strong> ${escapeHtml(deceasedName)}</p>
    <p><strong>Date of death:</strong> ${escapeHtml(formatDate(dateOfDeath))}</p>
    <p><strong>Client name:</strong> ${escapeHtml(clientName)}</p>
    <p><strong>Email:</strong> ${escapeHtml(clientEmail)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(clientPhone)}</p>
    <p><strong>Relationship:</strong> ${escapeHtml(relationship)}</p>
    <p><strong>National Insurance number:</strong> ${escapeHtml(niNumber)}</p>
    <p><strong>Known institutions:</strong> ${escapeHtml(knownInstitutions || "Not provided")}</p>
    <p><strong>Summary:</strong><br />${escapeHtml(caseSummary).replaceAll("\n", "<br />")}</p>
    <p><strong>Uploaded documents:</strong> ${escapeHtml(uploadedFileCount)}</p>
    <p><strong>Cloudinary folder:</strong> ${escapeHtml(documentsFolder)}</p>
  `;
}

export function buildBookingConfirmationEmail({
  consultationDateLabel,
  consultationTimeLabel,
  fullName,
  meetLink,
  timeZone,
}: BookingConfirmationEmailInput) {
  return `
    <h2>Your consultation is booked</h2>
    <p>Dear ${escapeHtml(fullName)},</p>
    <p>Your Estate Resolve consultation has been reserved successfully.</p>
    <p><strong>Date:</strong> ${escapeHtml(consultationDateLabel)}</p>
    <p><strong>Time:</strong> ${escapeHtml(consultationTimeLabel)} (${escapeHtml(timeZone)})</p>
    ${
      meetLink
        ? `<p><strong>Join link:</strong> <a href="${escapeHtml(meetLink)}">${escapeHtml(meetLink)}</a></p>`
        : `<p>We will contact you using the details you provided before the consultation begins.</p>`
    }
    <p>If you need to make a change, please reply to this email or contact ${escapeHtml(config.contact.email)}.</p>
    <p>Kind regards,<br />Estate Resolve</p>
  `;
}

export function buildBookingAdminEmail({
  consultationDateLabel,
  consultationTimeLabel,
  htmlLink,
  meetLink,
  submission,
  timeZone,
}: BookingAdminEmailInput) {
  return `
    <h2>New consultation booking</h2>
    <p><strong>Name:</strong> ${escapeHtml(submission.fullName)}</p>
    <p><strong>Email:</strong> ${escapeHtml(submission.email)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(submission.phone)}</p>
    <p><strong>Relationship:</strong> ${escapeHtml(submission.relationship)}</p>
    <p><strong>Date:</strong> ${escapeHtml(consultationDateLabel)}</p>
    <p><strong>Time:</strong> ${escapeHtml(consultationTimeLabel)} (${escapeHtml(timeZone)})</p>
    <p><strong>Calendar event:</strong> ${htmlLink ? `<a href="${escapeHtml(htmlLink)}">Open event</a>` : "Not available"}</p>
    <p><strong>Meet link:</strong> ${
      meetLink
        ? `<a href="${escapeHtml(meetLink)}">${escapeHtml(meetLink)}</a>`
        : "Not enabled"
    }</p>
    <p><strong>Consultation summary:</strong><br />${escapeHtml(submission.consultationReason).replaceAll("\n", "<br />")}</p>
  `;
}
