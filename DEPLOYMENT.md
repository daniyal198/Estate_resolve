# Deployment Notes

## Recommended Host

Deploy on Vercel. The project is already structured for GitHub-triggered Vercel
deployments.

## Environment Variables

Add these in Vercel for both `Production` and `Preview`:

```env
NEXT_PUBLIC_SITE_URL=https://estateresolve.co.uk
NEXT_PUBLIC_CONTACT_EMAIL=contact@estateresolve.co.uk
NEXT_PUBLIC_CONTACT_PHONE=020 3951 5065
NEXT_PUBLIC_BOOKING_TIME_ZONE=Europe/London
NEXT_PUBLIC_BOOKING_WINDOW_DAYS=21
NEXT_PUBLIC_BOOKING_SLOT_DURATION_MINUTES=30
NEXT_PUBLIC_BOOKING_MIN_NOTICE_HOURS=24
NEXT_PUBLIC_BOOKING_BUSINESS_HOURS_START=09:00
NEXT_PUBLIC_BOOKING_BUSINESS_HOURS_END=17:30

ADMIN_EMAIL=operations@estateresolve.co.uk

STRIPE_SECRET_KEY=sk_live_...
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

## Pre-Deploy Checks

```bash
npm run lint
npm run build
```

## Stripe Webhook Setup

1. Open Stripe Dashboard
2. Go to `Developers` -> `Webhooks`
3. Add endpoint:
   `https://estateresolve.co.uk/api/webhook`
4. Subscribe to:
   `checkout.session.completed`
5. Copy the signing secret into Vercel as `STRIPE_WEBHOOK_SECRET`

## Domain

1. Add the project to Vercel
2. Connect `estateresolve.co.uk`
3. Set `www.estateresolve.co.uk` to redirect to the apex domain
4. Update DNS records in GoDaddy to point to Vercel

## Google Calendar Booking Setup

1. Enable the Google Calendar API in Google Cloud for the project that owns your service account.
2. Create a service account key and store its client email and private key in Vercel environment variables.
3. Share the target Google Calendar with that service account email and grant event-edit access.
4. Copy the calendar ID into `GOOGLE_CALENDAR_ID`.
5. Set `GOOGLE_CALENDAR_CREATE_MEET_LINK=true` if you want Meet links created on each booking.

## Post-Deploy Testing

- Visit all public pages
- Visit `/book-a-consultation`
- Load available booking slots
- Create a consultation booking and confirm the event appears in Google Calendar
- Submit the contact form
- Submit a case with documents
- Complete a Stripe payment with a test card
- Confirm Stripe redirects to `/success`
- Confirm confirmation/admin emails are received
- Confirm documents appear in the Cloudinary case folder
- Check mobile layouts and browser console
