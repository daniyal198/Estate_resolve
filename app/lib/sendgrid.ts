import sgMail from "@sendgrid/mail";
import nodemailer from "nodemailer";
import type SMTPTransport from "nodemailer/lib/smtp-transport";

type SendEmailOptions = {
  html: string;
  subject: string;
  to: string;
};

let sendgridConfigured = false;
let smtpTransporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo> | null =
  null;

function getEmailProvider() {
  if (process.env.EMAIL_PROVIDER === "smtp" || process.env.SMTP_HOST) {
    return "smtp";
  }

  return "sendgrid";
}

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
  const sender = process.env.SMTP_FROM_EMAIL || process.env.SENDGRID_FROM_EMAIL;

  if (!sender) {
    throw new Error("Email sender address is not configured.");
  }

  return sender;
}

function getSenderName() {
  return (
    process.env.SMTP_FROM_NAME ||
    process.env.SENDGRID_FROM_NAME ||
    "Estate Resolve"
  );
}

export function getAdminAddress() {
  return process.env.ADMIN_EMAIL || getSenderAddress();
}

function getSmtpPort() {
  const configuredPort = process.env.SMTP_PORT;

  if (!configuredPort) {
    return process.env.SMTP_SECURE === "false" ? 587 : 465;
  }

  const parsedPort = Number(configuredPort);

  if (!Number.isInteger(parsedPort) || parsedPort <= 0) {
    throw new Error("SMTP_PORT must be a positive whole number.");
  }

  return parsedPort;
}

function getSmtpTransporter() {
  if (smtpTransporter) {
    return smtpTransporter;
  }

  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host) {
    throw new Error("SMTP_HOST is not configured.");
  }

  if (!user || !pass) {
    throw new Error("SMTP_USER and SMTP_PASS are required for SMTP email.");
  }

  smtpTransporter = nodemailer.createTransport({
    auth: {
      pass,
      user,
    },
    host,
    port: getSmtpPort(),
    secure: process.env.SMTP_SECURE !== "false",
  });

  return smtpTransporter;
}

export async function sendEmail({
  html,
  subject,
  to,
}: SendEmailOptions) {
  if (getEmailProvider() === "smtp") {
    await getSmtpTransporter().sendMail({
      from: {
        address: getSenderAddress(),
        name: getSenderName(),
      },
      html,
      subject,
      to,
    });

    return;
  }

  ensureSendgridConfigured();

  await sgMail.send({
    from: {
      email: getSenderAddress(),
      name: getSenderName(),
    },
    html,
    subject,
    to,
  });
}
