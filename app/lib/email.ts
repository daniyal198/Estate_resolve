import nodemailer from "nodemailer";
import type SMTPTransport from "nodemailer/lib/smtp-transport";

type SendEmailOptions = {
  html: string;
  replyTo?: string;
  subject: string;
  to: string;
};

let smtpTransporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo> | null =
  null;

function assertSmtpProvider() {
  const configured = process.env.EMAIL_PROVIDER?.trim().toLowerCase();

  if (configured && configured !== "smtp") {
    throw new Error(
      `EMAIL_PROVIDER is set to "${configured}", but this site sends over SMTP only. Set EMAIL_PROVIDER=smtp.`,
    );
  }
}

function getSenderAddress() {
  const sender = process.env.SMTP_FROM_EMAIL;

  if (!sender) {
    throw new Error("SMTP_FROM_EMAIL is not configured.");
  }

  return sender;
}

function getSenderName() {
  return process.env.SMTP_FROM_NAME || "Estate Resolve";
}

export function getAdminAddress() {
  return process.env.ADMIN_EMAIL || getSenderAddress();
}

function getSmtpPort() {
  const configuredPort = process.env.SMTP_PORT;

  if (!configuredPort) {
    return 587;
  }

  const parsedPort = Number(configuredPort);

  if (!Number.isInteger(parsedPort) || parsedPort <= 0) {
    throw new Error("SMTP_PORT must be a positive whole number.");
  }

  return parsedPort;
}

// Port 465 expects TLS from the first byte; 587 and 2525 start plaintext and
// upgrade via STARTTLS. Deriving this from the port stops the common
// misconfiguration where port 587 is paired with an implicit-TLS connection
// and the request hangs until it times out.
function getSmtpSecure(port: number) {
  const configured = process.env.SMTP_SECURE?.trim().toLowerCase();

  if (configured === "true") {
    return true;
  }

  if (configured === "false") {
    return false;
  }

  return port === 465;
}

function getSmtpTransporter() {
  if (smtpTransporter) {
    return smtpTransporter;
  }

  assertSmtpProvider();

  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host) {
    throw new Error(
      "SMTP_HOST is not configured. Brevo uses smtp-relay.brevo.com.",
    );
  }

  if (!user || !pass) {
    throw new Error(
      "SMTP_USER and SMTP_PASS are required. Both come from the SMTP tab of the Brevo dashboard.",
    );
  }

  const port = getSmtpPort();

  smtpTransporter = nodemailer.createTransport({
    auth: {
      pass,
      user,
    },
    host,
    port,
    secure: getSmtpSecure(port),
  });

  return smtpTransporter;
}

export function isEmailConfigured() {
  try {
    assertSmtpProvider();
    getSenderAddress();

    return Boolean(
      process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS,
    );
  } catch {
    return false;
  }
}

export async function verifyEmailTransport() {
  await getSmtpTransporter().verify();
}

export async function sendEmail({
  html,
  replyTo,
  subject,
  to,
}: SendEmailOptions) {
  await getSmtpTransporter().sendMail({
    from: {
      address: getSenderAddress(),
      name: getSenderName(),
    },
    html,
    replyTo,
    subject,
    to,
  });
}
