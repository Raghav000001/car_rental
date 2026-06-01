# COMPONENTS — UI KNOWLEDGE BASE

## OVERVIEW
71 components across two subdirectories: generated shadcn/ui primitives (57) and custom page sections (9), plus app-level components.

## STRUCTURE
```
components/
├── ui/                # 57 shadcn/ui new-york primitives (generated)
├── sections/          # 9 custom section components
├── header.tsx         # Nav with scroll effect + mobile menu
├── fleet-sidebar.tsx  # Faceted filter sidebar for fleet page
├── hero-section.tsx   # Homepage hero
└── ...                # Other page components
```

## WHERE TO LOOK
| Task | Location | Notes |
|------|----------|-------|
| shadcn/ui primitives | `components/ui/` | 57 files — button, card, dialog, etc. |
| Page sections | `components/sections/` | 9 custom sections used by pages |
| Navigation | `components/header.tsx` | Scroll effect + mobile hamburger menu |
| Fleet filters | `components/fleet-sidebar.tsx` | Uses `useSearchParams` (client component) |

## CONVENTIONS
- shadcn/ui **new-york** style (more compact, higher contrast)
- `"use client"` on all interactive components (header, fleet-sidebar, ui primitives)
- Import via `@/components/...` alias
- `cn()` utility for class merging (clsx + tailwind-merge)
- CSS variables in `app/globals.css` for theming
- **lucide-react** for icons

## ANTI-PATTERNS
- Do NOT manually edit `components/ui/` files — they are shadcn-generated and meant to be regenerated
- Do NOT add page logic inside section components — sections are presentational
- Avoid adding new npm dependencies for UI — shadcn/ui + lucide-react covers most cases
