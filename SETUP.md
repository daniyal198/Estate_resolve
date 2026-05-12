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
NEXT_PUBLIC_CONTACT_PHONE=+44 20 8154 2371
ADMIN_EMAIL=operations@estate-resolve.com
SENDGRID_API_KEY=your-sendgrid-api-key
SENDGRID_FROM_EMAIL=noreply@estate-resolve.com
CLOUDINARY_UPLOAD_URL=https://api.cloudinary.com/v1_1/your-cloud-name/auto/upload
CLOUDINARY_UPLOAD_PRESET=your_unsigned_upload_preset
CLOUDINARY_UPLOAD_FOLDER=estate-resolve-documents
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
