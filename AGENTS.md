# CAR RENTAL THEME — KNOWLEDGE BASE

**Generated:** Mon Jun 01 2026
**Stack:** Next.js 16 · React 19 · TypeScript · Tailwind v4 · shadcn/ui · MongoDB

## OVERVIEW
Next.js car rental booking theme with MongoDB backend. Brand: ROHIT TOURS & TRAVELS (hero) / VILDMARK (metadata). Static marketing pages with dynamic fleet browsing and car detail routes.

## STRUCTURE
```
├── app/                   # Next.js App Router (routes, layout, API seed)
├── components/
│   ├── sections/          # Custom page sections (9 components)
│   └── ui/                # shadcn/ui primitives (57 generated)
├── lib/                   # MongoDB connection + cn() utility
├── hooks/                 # use-toast, use-mobile
├── models/                # Mongoose Car schema
├── styles/                # Second global CSS (duplicate)
├── public/                # Static assets, images, icons
│   └── images/            # 37 product/car images
├── components.json        # shadcn/ui config
├── next.config.mjs        # Next.js (ignoreBuildErrors, unoptimized images)
├── tsconfig.json          # strict: true, @/* alias
├── postcss.config.mjs     # Tailwind v4 via @tailwindcss/postcss
└── package.json
```

## WHERE TO LOOK
| Task | Location | Notes |
|------|----------|-------|
| Homepage | app/page.tsx | HeroSection + PhilosophySection + TestimonialsSection |
| Fleet browsing | app/fleet/page.tsx | Server component, MongoDB query, faceted filters |
| Car detail | app/cars/[id]/page.tsx | Dynamic route |
| Gallery | app/gallery/page.tsx | Image gallery page |
| Features | app/features/page.tsx | Features page |
| Pricing | app/pricing/page.tsx | Pricing page |
| Page sections | components/sections/ | 9 custom section components |
| UI primitives | components/ui/ | 57 shadcn/ui components |
| Header | components/header.tsx | Nav with scroll effect + mobile menu |
| DB connection | lib/mongodb.ts | Connection caching |
| Car schema | models/Car.ts | Mongoose model + ICar interface |
| DB seeding | app/api/seed/route.ts | GET endpoint, inserts mock cars |

## CONVENTIONS
- **"use client"** directive on all interactive components
- **Server components** for data-fetching pages (fleet, car/[id])
- **`@/`** path alias for all imports (e.g. `@/components/...`)
- **`cn()`** utility for conditional class merging (clsx + tailwind-merge)
- **shadcn/ui new-york** style for component patterns
- **Tailwind v4** with `@import 'tailwindcss'` (no config file)
- **CSS variables** for theming (light/dark via .dark class)
- **lucide-react** as icon library

## ANTI-PATTERNS
- TypeScript `ignoreBuildErrors: true` — errors suppressed at build
- Images `unoptimized: true` — Vercel deployment workaround
- **Dual lockfiles**: both `package-lock.json` and `pnpm-lock.yaml` committed
- Seed route uses `GET` for mutation — not RESTful
- `global.mongoose` typed as `any` — defeats type safety
- Catch clauses use `error: any` — no typed error handling
- **Duplicate globals.css**: `app/globals.css` (custom theme) and `styles/globals.css` (oklch defaults)
- No ESLint config file committed (relies on Next.js defaults)
- No Prettier config

## COMMANDS
```bash
npm run dev      # next dev
npm run build    # next build
npm run lint     # eslint .
npm run start    # next start
```

## NOTES
- Requires `MONGODB_URI` env var for DB connection
- `next.config.mjs` suppresses TS errors — real errors may hide until runtime
- Both `app/globals.css` and `styles/globals.css` exist with different themes (inconsistent)
- No CI/CD pipeline committed
- Next.js 16 with React 19 (stable)

## COMMON ERRORS & FIXES
| Error | Cause | Fix |
|-------|-------|-----|
| `MongoServerSelectionError: tlsv1 alert internal error` | TLS handshake failure with MongoDB Atlas; missing query params or cert validation issue | Add `tls: true`, `tlsInsecure: true` (dev), `serverSelectionTimeoutMS: 15000` to mongoose options; append `?retryWrites=true&w=majority` to URI |
| `Performance.measure() negative timestamp` | Next.js Turbopack dev bug — triggers when server component throws | Fix the underlying component error (typically MongoDB connection failure cascade) |
| `global.mongoose` typed as `any` | Original cache used `any` type | Fixed to typed `__mongooseCache` with `typeof mongoose` |
