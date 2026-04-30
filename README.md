# Estate Resolve

Estate Resolve is a Next.js 16 application for a professional estate financial
services platform. Milestone 1 delivers the production-ready foundation:
homepage implementation, shared design system, responsive navigation, SEO
setup, and the initial page architecture for the 8-9 page site.

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

## Stack

- Next.js 16 App Router
- React 19
- Tailwind CSS 4
- TypeScript
- ESLint

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

## Milestone 1 Scope Completed

- Fresh Next.js app initialized inside `estate_resolve`
- Local git repository initialized inside `estate_resolve`
- Homepage implemented from the `concept1-refined-authority.html` direction
- Shared layout, header, footer, and reusable content sections
- Responsive page set for the initial 9-page structure
- Metadata, sitemap, and robots foundation

## Project Structure

```text
app/
  (pages)/
  components/
  lib/
  globals.css
  layout.tsx
  page.tsx
  robots.ts
  sitemap.ts
```

## Notes

- Contact details are placeholder values and should be replaced before launch.
- The secure intake form, uploads, payments, and transactional email flows are
  intentionally left for later milestones.
