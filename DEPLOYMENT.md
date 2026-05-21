# Deployment Notes

## Recommended Host

Deploy on Vercel. The project is already structured for GitHub-triggered Vercel
deployments.

## Environment Variables

Add these in Vercel for both `Production` and `Preview`:

```env
NEXT_PUBLIC_SITE_URL=https://estateresolve.co.uk
NEXT_PUBLIC_CONTACT_EMAIL=contact@estateresolve.co.uk
NEXT_PUBLIC_CONTACT_PHONE=+44 20 8154 2371

ADMIN_EMAIL=operations@estateresolve.co.uk

STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

SENDGRID_API_KEY=SG...
SENDGRID_FROM_NAME=Estate Resolve
SENDGRID_FROM_EMAIL=contact@estateresolve.co.uk

CLOUDINARY_UPLOAD_URL=https://api.cloudinary.com/v1_1/<cloud-name>/auto/upload
CLOUDINARY_UPLOAD_PRESET=<unsigned-upload-preset>
CLOUDINARY_UPLOAD_FOLDER=estate-resolve-documents
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

## Post-Deploy Testing

- Visit all public pages
- Submit the contact form
- Submit a case with documents
- Complete a Stripe payment with a test card
- Confirm Stripe redirects to `/success`
- Confirm confirmation/admin emails are received
- Confirm documents appear in the Cloudinary case folder
- Check mobile layouts and browser console
