/**
 * Verifies the configured email provider and optionally sends a test message.
 *
 *   npm run email:test                  # connect + authenticate only
 *   npm run email:test -- you@mail.com  # also send a test email
 *
 * Reads .env.local (falling back to .env) so it can be run before deploying.
 */
import { readFileSync } from "node:fs";
import nodemailer from "nodemailer";

function loadEnvFile() {
  for (const file of [".env.local", ".env"]) {
    let contents;

    try {
      contents = readFileSync(file, "utf8");
    } catch {
      continue;
    }

    for (const line of contents.split("\n")) {
      const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)$/);

      if (!match) {
        continue;
      }

      const value = match[2].trim().replace(/^["']|["']$/g, "");

      if (!(match[1] in process.env)) {
        process.env[match[1]] = value;
      }
    }

    console.log(`Loaded environment from ${file}`);

    return;
  }

  console.log("No .env.local or .env found; using the current shell environment.");
}

loadEnvFile();

const {
  ADMIN_EMAIL,
  SMTP_FROM_EMAIL,
  SMTP_FROM_NAME = "Estate Resolve",
  SMTP_HOST,
  SMTP_PASS,
  SMTP_PORT,
  SMTP_SECURE,
  SMTP_USER,
} = process.env;

const missing = ["SMTP_HOST", "SMTP_USER", "SMTP_PASS", "SMTP_FROM_EMAIL"].filter(
  (key) => !process.env[key],
);

if (missing.length > 0) {
  console.error(`Missing required variables: ${missing.join(", ")}`);
  process.exit(1);
}

const port = SMTP_PORT ? Number(SMTP_PORT) : 587;
const secure =
  SMTP_SECURE === "true" ? true : SMTP_SECURE === "false" ? false : port === 465;

console.log(`Host:   ${SMTP_HOST}:${port} (secure: ${secure})`);
console.log(`User:   ${SMTP_USER}`);
console.log(`From:   ${SMTP_FROM_NAME} <${SMTP_FROM_EMAIL}>`);

const transporter = nodemailer.createTransport({
  auth: { pass: SMTP_PASS, user: SMTP_USER },
  host: SMTP_HOST,
  port,
  secure,
});

try {
  await transporter.verify();
  console.log("\nConnection and authentication succeeded.");
} catch (error) {
  console.error("\nConnection failed:", error.message);
  process.exit(1);
}

const recipient = process.argv[2] || ADMIN_EMAIL;

if (!recipient) {
  console.log("Pass a recipient address to also send a test email.");
  process.exit(0);
}

try {
  const info = await transporter.sendMail({
    from: { address: SMTP_FROM_EMAIL, name: SMTP_FROM_NAME },
    html: "<p>This is a test email from the Estate Resolve website.</p>",
    subject: "Estate Resolve email test",
    text: "This is a test email from the Estate Resolve website.",
    to: recipient,
  });

  console.log(`Test email sent to ${recipient} (id: ${info.messageId}).`);
} catch (error) {
  console.error("Send failed:", error.message);
  process.exit(1);
}
