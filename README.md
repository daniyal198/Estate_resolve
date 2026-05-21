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
NEXT_PUBLIC_CONTACT_PHONE=+44 20 8154 2371

ADMIN_EMAIL=operations@estateresolve.co.uk

STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

SENDGRID_API_KEY=SG...
SENDGRID_FROM_NAME=Estate Resolve
SENDGRID_FROM_EMAIL=contact@estateresolve.co.uk

CLOUDINARY_UPLOAD_URL=https://api.cloudinary.com/v1_1/<cloud-name>/auto/upload
CLOUDINARY_UPLOAD_PRESET=<unsigned-upload-preset>
CLOUDINARY_UPLOAD_FOLDER=estate-resolve-documents
```

## Payment Flow

1. User completes the secure intake form on `/start-a-case`
2. Supporting documents are uploaded to Cloudinary under the case reference
3. The app creates a Stripe Checkout session
4. The user completes payment on Stripe
5. Stripe redirects back to `/success`
6. Stripe webhook sends confirmation and admin notification emails

## API Routes

- `POST /api/upload`
- `POST /api/send-contact-form`
- `POST /api/send-form-confirmation`
- `POST /api/create-checkout-session`
- `POST /api/webhook`

## Notes

- Stripe webhook delivery is required for payment confirmation emails.
- `NEXT_PUBLIC_SITE_URL` should match the live production domain on Vercel.
- The case intake flow depends on valid Stripe, SendGrid, and Cloudinary
  configuration.
