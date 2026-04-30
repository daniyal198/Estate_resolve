# Deployment Notes

## Environment

Create `.env.local` from `.env.example` and confirm the public site URL and
contact details.

## Pre-deploy Checks

```bash
npm run lint
npm run build
```

## Recommended Host

Vercel is the natural deployment target for this Next.js application.

## Before Launch

- Replace placeholder contact details with live values.
- Review legal copy for privacy and terms pages.
- Add the secure intake flow and associated backend integrations in Milestone 2.
