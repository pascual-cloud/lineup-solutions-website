# Conventions

## Branding

### Colors (from brand guidelines)
- **Purple/Violet:** ~#7B2FBE (logo left chevron)
- **Red:** ~#E31E24 (gradient midpoint)
- **Orange:** ~#F7941D (logo right chevron / gradient end)
- **Dark Charcoal:** ~#3C3C3C (text)
- *Exact hex values to be confirmed from brandbook PDF*

### Fonts
- **Satoshi Black** — headings / display
- **Inter** — body / UI text (full weight range available)
- **Poppins** — secondary / accent
- Font files in `src/DLS/FONTS/`

### Logo
- Diamond icon: two interlocking chevrons (purple + orange/gradient)
- Variants in `src/DLS/LOGOTIPO LINE_UP/PNG/` (01–08)
- Use variant 01 (full color, light bg) as default

## Code Style
- TypeScript strict mode
- Functional components only
- Use `cn()` for merging Tailwind classes
- shadcn/ui components live in `src/components/ui/`
- Custom components in `src/components/`

## Naming
- Files: kebab-case for pages, PascalCase for components
- CSS variables: `--kebab-case`
- TypeScript: camelCase for variables/functions, PascalCase for types/components

## Package Management
- Always use `pnpm` — never `npm` or `yarn`
- Run `pnpm add <pkg>` to install dependencies
- Run `pnpm dev` for local development (port 3000)
