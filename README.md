# Estate Resolve

Estate Resolve is a Next.js 16 application for a professional estate financial
search service. The current codebase includes the marketing site, secure case
intake flow, Cloudinary document uploads, SendGrid transactional emails,
Stripe checkout, and payment confirmation handling via webhook.

## Pages

- `/`
- `/services`
- `/how-it-works`
- `/about`
- `/faqs`
- `/contact`
- `/book-a-consultation`
- `/privacy`
- `/terms`
- `/start-a-case`
- `/success`
- `/cancel`

## Stack

- Next.js 16 App Router
- React 19
- Tailwind CSS 4
- TypeScript
- Stripe
- Cloudinary
- SendGrid
- Google Calendar
- Vercel Analytics

## Scripts

```bash
npm run dev
npm run lint
npm run build
npm run start
```

## Local Setup

```bash
cp .env.example .env.local
npm install
npm run dev
```

Open `http://localhost:3000`.

## Required Environment Variables

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_CONTACT_EMAIL=contact@estateresolve.co.uk
NEXT_PUBLIC_CONTACT_PHONE=02081542371
NEXT_PUBLIC_BOOKING_TIME_ZONE=Europe/London
NEXT_PUBLIC_BOOKING_WINDOW_DAYS=21
NEXT_PUBLIC_BOOKING_SLOT_DURATION_MINUTES=30
NEXT_PUBLIC_BOOKING_MIN_NOTICE_HOURS=24
NEXT_PUBLIC_BOOKING_BUSINESS_HOURS_START=09:00
NEXT_PUBLIC_BOOKING_BUSINESS_HOURS_END=17:30

ADMIN_EMAIL=operations@estateresolve.co.uk

STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

SENDGRID_API_KEY=SG...
SENDGRID_FROM_NAME=Estate Resolve
SENDGRID_FROM_EMAIL=contact@estateresolve.co.uk

CLOUDINARY_UPLOAD_URL=https://api.cloudinary.com/v1_1/<cloud-name>/auto/upload
CLOUDINARY_UPLOAD_PRESET=<unsigned-upload-preset>
CLOUDINARY_UPLOAD_FOLDER=estate-resolve-documents

GOOGLE_CALENDAR_ID=<calendar-id>
GOOGLE_CALENDAR_CLIENT_EMAIL=<service-account-email>
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

## Payment Flow

1. User completes the secure intake form on `/start-a-case`
2. Supporting documents are uploaded to Cloudinary under the case reference
3. The app creates a Stripe Checkout session
4. The user completes payment on Stripe
5. Stripe redirects back to `/success`
6. Stripe webhook sends confirmation and admin notification emails

## API Routes

- `GET /api/booking/availability`
- `POST /api/booking`
- `POST /api/upload`
- `POST /api/send-contact-form`
- `POST /api/send-form-confirmation`
- `POST /api/create-checkout-session`
- `POST /api/webhook`

## Google Calendar Booking Setup

1. Create or choose the Google Calendar that should receive consultation bookings.
2. Enable the Google Calendar API in the Google Cloud project that owns your service account.
3. Create a service account and generate a JSON key.
4. Share the target calendar with the service account email and grant it permission to make changes to events.
5. Copy the calendar ID, service account email, and private key into `.env.local`.
6. Set `GOOGLE_CALENDAR_CREATE_MEET_LINK=true` if you want the API to generate Google Meet links automatically.

## Notes

- Stripe webhook delivery is required for payment confirmation emails.
- `NEXT_PUBLIC_SITE_URL` should match the live production domain on Vercel.
- The case intake flow depends on valid Stripe, SendGrid, and Cloudinary
  configuration.
- The booking flow depends on a Google Calendar that is shared with the
  configured service account.
