# Architecture

## Stack
- **Framework:** Next.js 16 (App Router)
- **UI:** React 19, TypeScript
- **Styling:** Tailwind CSS v4 + tw-animate-css
- **Components:** shadcn/ui, Radix UI, Magic UI
- **Animations:** Motion (Framer Motion)
- **Globe:** cobe
- **Icons:** Lucide React, Radix Icons
- **Package manager:** pnpm

## Directory Layout

```
src/
├── app/              # Next.js App Router pages and layouts
│   ├── layout.tsx    # Root layout
│   ├── page.tsx      # Home page
│   ├── globals.css   # Global styles + Tailwind imports
│   └── favicon.ico
├── components/       # Reusable UI components
│   └── ui/           # shadcn/ui primitives
├── lib/              # Utilities (cn helper, etc.)
└── DLS/              # Brand assets (fonts, logos, brandbook) — NOT deployed
```

## Routing
- App Router with file-based routing under `src/app/`
- Layouts nest via `layout.tsx` files

## Styling
- Tailwind v4 with PostCSS
- CSS variables for theming (defined in `globals.css`)
- `cn()` utility from `src/lib/utils.ts` for conditional classes
