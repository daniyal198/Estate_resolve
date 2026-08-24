# Local Setup

This project is a Next.js 16 app using React 19, TypeScript, and Tailwind CSS.

## Prerequisites

- Node.js 20 or newer
- npm
- git

Check installed versions:

```bash
node -v
npm -v
git --version
```

## Clone And Run

```bash
git clone https://github.com/daniyal198/Estate_resolve.git
cd Estate_resolve
cp .env.example .env.local
npm install
npm run dev
```

Open the app at:

```text
http://localhost:3000
```

## Environment Variables

This project uses `.env.local`.

Create it from the example file:

```bash
cp .env.example .env.local
```

Current example values:

```env
NEXT_PUBLIC_SITE_URL=https://www.estateresolve.co.uk
NEXT_PUBLIC_CONTACT_EMAIL=contact@estateresolve.co.uk
NEXT_PUBLIC_CONTACT_PHONE=02081542371
NEXT_PUBLIC_BOOKING_TIME_ZONE=Europe/London
NEXT_PUBLIC_BOOKING_WINDOW_DAYS=21
NEXT_PUBLIC_BOOKING_SLOT_DURATION_MINUTES=30
NEXT_PUBLIC_BOOKING_MIN_NOTICE_HOURS=24
NEXT_PUBLIC_BOOKING_BUSINESS_HOURS_START=09:00
NEXT_PUBLIC_BOOKING_BUSINESS_HOURS_END=17:30
NEXT_PUBLIC_GTM_CONTAINER_ID=GTM-53H4G39C
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GOOGLE_ADS_ID=AW-XXXXXXXXXX
NEXT_PUBLIC_GOOGLE_ADS_CONSULTATION_CONVERSION_LABEL=<consultation-conversion-label>
NEXT_PUBLIC_GOOGLE_ADS_CONTACT_CONVERSION_LABEL=<contact-conversion-label>
NEXT_PUBLIC_GOOGLE_ADS_SOLICITOR_CONVERSION_LABEL=<solicitor-conversion-label>
NEXT_PUBLIC_GOOGLE_ADS_START_CASE_CONVERSION_LABEL=<start-case-conversion-label>
NEXT_PUBLIC_GOOGLE_ADS_PAID_CASE_CONVERSION_LABEL=<paid-case-conversion-label>
ADMIN_EMAIL=operations@estateresolve.co.uk
EMAIL_PROVIDER=smtp
SMTP_HOST=smtp-relay.brevo.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-brevo-smtp-login
SMTP_PASS=your-brevo-smtp-key
SMTP_FROM_NAME=Estate Resolve
SMTP_FROM_EMAIL=contact@estateresolve.co.uk
CLOUDINARY_UPLOAD_URL=https://api.cloudinary.com/v1_1/your-cloud-name/auto/upload
CLOUDINARY_UPLOAD_PRESET=your_unsigned_upload_preset
CLOUDINARY_UPLOAD_FOLDER=estate-resolve-documents
GOOGLE_CALENDAR_ID=your-calendar-id@group.calendar.google.com
GOOGLE_CALENDAR_CLIENT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
GOOGLE_CALENDAR_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
GOOGLE_CALENDAR_TIME_ZONE=Europe/London
GOOGLE_CALENDAR_BOOKING_WINDOW_DAYS=21
GOOGLE_CALENDAR_SLOT_DURATION_MINUTES=30
GOOGLE_CALENDAR_MIN_NOTICE_HOURS=24
GOOGLE_CALENDAR_BUSINESS_HOURS_START=09:00
GOOGLE_CALENDAR_BUSINESS_HOURS_END=17:30
GOOGLE_CALENDAR_BOOKING_LOCATION=Phone or Google Meet consultation
GOOGLE_CALENDAR_EVENT_TITLE_PREFIX=Estate Resolve consultation
GOOGLE_CALENDAR_CREATE_MEET_LINK=false
```

Update these values as needed for the local or deployed environment.

## Milestone 2 Services

This milestone adds:

- secure intake form submission
- Cloudinary document uploads
- confirmation emails to the enquirer
- admin notification emails

Before testing the forms, configure:

1. SMTP credentials and a verified sender address (see Email Setup below)
2. A Cloudinary unsigned upload preset and upload URL
3. An admin email address for internal notifications
4. A Google Calendar API service account and a shared booking calendar

## Email Setup

Outgoing mail is sent through Brevo's SMTP relay. Each enquiry sends two
emails - one to the enquirer, one to `ADMIN_EMAIL` - so the free tier's
300 emails/day covers roughly 150 enquiries a day.

1. Create an account at https://www.brevo.com.
2. Under **Senders, Domains & Dedicated IPs -> Domains**, add
   `estateresolve.co.uk` and publish the DKIM/Brevo-code DNS records it lists.
   Sending works without this, but the domain publishes `DMARC p=quarantine`,
   so unauthenticated mail will be quarantined rather than delivered.
3. Under **Senders**, verify `contact@estateresolve.co.uk` so it can be used
   as the From address.
4. Generate an SMTP key at https://app.brevo.com/settings/keys/smtp and put the
   login and key into `SMTP_USER` / `SMTP_PASS`. Keep them in `.env.local`
   locally and in Vercel's environment variables in production - never in git.
5. Verify the configuration before deploying:

   ```bash
   npm run email:test                    # connect and authenticate only
   npm run email:test -- you@example.com # also send a test message
   ```

Admin notification emails set `Reply-To` to the enquirer's address, so replying
from the `ADMIN_EMAIL` mailbox reaches the enquirer directly. Incoming mail is
handled by the existing mailbox provider and is unaffected by this setup.

## Google Calendar Booking Setup

1. In Google Cloud, enable the Google Calendar API for the project that will own the booking integration.
2. Create a service account and generate a JSON key.
3. Copy the service account email into the Google Calendar sharing settings for the calendar you want to use for bookings.
4. Grant that service account permission to make changes to events.
5. Paste the calendar ID, service account email, and private key into `.env.local`.
6. Set `GOOGLE_CALENDAR_CREATE_MEET_LINK=true` if you want each booking to generate a Google Meet link automatically.

## Useful Commands

Start the dev server:

```bash
npm run dev
```

Run lint:

```bash
npm run lint
```

Create a production build:

```bash
npm run build
```

Run the production server locally:

```bash
npm run start
```

## Troubleshooting

If `npm install` fails, check that Node.js is installed and up to date.

If port `3000` is already in use, stop the other process using it or run:

```bash
npm run dev -- --port 3001
```
