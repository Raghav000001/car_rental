# APP ROUTES — ROUTE KNOWLEDGE BASE

## OVERVIEW
Next.js 16 App Router routes, layouts, and API endpoints for a car rental booking theme.

## STRUCTURE
```
app/
├── layout.tsx          # Root layout (Header + FooterSection + globals.css)
├── page.tsx            # Homepage (HeroSection, PhilosophySection, TestimonialsSection)
├── globals.css         # Active global stylesheet (Tailwind v4 CSS variables)
├── fleet/page.tsx      # Fleet browsing — server component, MongoDB query, faceted filters
├── cars/[id]/page.tsx  # Car detail — dynamic route
├── gallery/page.tsx    # Gallery page
├── features/page.tsx   # Features page
├── pricing/page.tsx    # Pricing page
└── api/seed/route.ts   # DB seeding endpoint (GET — nonstandard, inserts mock cars)
```

## WHERE TO LOOK
| Task | Path | Notes |
|------|------|-------|
| Route definitions | `app/*/page.tsx` | Each route is a flat folder under `app/` |
| Root layout | `app/layout.tsx` | Imports Header, FooterSection; sets metadata |
| Homepage | `app/page.tsx` | Section-based composition |
| Fleet (all cars) | `app/fleet/page.tsx` | `searchParams` for faceted filtering |
| Single car | `app/cars/[id]/page.tsx` | Dynamic route with `params.id` |
| Book a car | `components/booking-modal.tsx` | Opened from fleet grid, 3-step flow + email |
| Booking API | `app/api/booking/route.ts` | POST handler — sends emails via Nodemailer |
| Seed DB | `app/api/seed/route.ts` | GET handler — visit after setting MONGODB_URI |

## CONVENTIONS
- Server components for data-fetching pages (fleet, car/[id])
- `searchParams` is typed as `Promise<{ [key: string]: string \| undefined }>`
- All routes use shared layout from `<html>` → `<body>` wrapper
- No route groups, no parallel routes, no intercepting routes

## MISSING STANDARD FILES (NO)
- `middleware.ts` — no auth/redirect middleware
- `loading.tsx` — no loading skeletons (Suspense in fleet uses inline fallback)
- `error.tsx` — no error boundaries
- `not-found.tsx` — no custom 404
