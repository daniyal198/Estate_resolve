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
NEXT_PUBLIC_SITE_URL=https://estate-resolve.com
NEXT_PUBLIC_CONTACT_EMAIL=hello@estate-resolve.com
NEXT_PUBLIC_CONTACT_PHONE=02081542371
NEXT_PUBLIC_BOOKING_TIME_ZONE=Europe/London
NEXT_PUBLIC_BOOKING_WINDOW_DAYS=21
NEXT_PUBLIC_BOOKING_SLOT_DURATION_MINUTES=30
NEXT_PUBLIC_BOOKING_MIN_NOTICE_HOURS=24
NEXT_PUBLIC_BOOKING_BUSINESS_HOURS_START=09:00
NEXT_PUBLIC_BOOKING_BUSINESS_HOURS_END=17:30
ADMIN_EMAIL=operations@estate-resolve.com
SENDGRID_API_KEY=your-sendgrid-api-key
SENDGRID_FROM_EMAIL=noreply@estate-resolve.com
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
- SendGrid confirmation emails
- SendGrid admin notification emails

Before testing the forms, configure:

1. A SendGrid API key and verified sender address
2. A Cloudinary unsigned upload preset and upload URL
3. An admin email address for internal notifications
4. A Google Calendar API service account and a shared booking calendar

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
