import sgMail from "@sendgrid/mail";

type SendEmailOptions = {
  html: string;
  subject: string;
  to: string;
};

let sendgridConfigured = false;

function ensureSendgridConfigured() {
  if (sendgridConfigured) {
    return;
  }

  const apiKey = process.env.SENDGRID_API_KEY;

  if (!apiKey) {
    throw new Error("SendGrid API key is not configured.");
  }

  sgMail.setApiKey(apiKey);
  sendgridConfigured = true;
}

function getSenderAddress() {
  const sender = process.env.SENDGRID_FROM_EMAIL;

  if (!sender) {
    throw new Error("SendGrid sender email is not configured.");
  }

  return sender;
}

export function getAdminAddress() {
  return process.env.ADMIN_EMAIL || getSenderAddress();
}

export async function sendEmail({
  html,
  subject,
  to,
}: SendEmailOptions) {
  ensureSendgridConfigured();

  await sgMail.send({
    from: getSenderAddress(),
    html,
    subject,
    to,
  });
}
