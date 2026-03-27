# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server with Turbopack
npm run build    # Production build with Turbopack
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Stack

- **Next.js 15** (App Router) + **React 19** + **TypeScript**
- **NextUI v2** for UI components
- **Tailwind CSS 4** for styling
- **Fontsource** fonts: Sora (headings), Inter (body), IBM Plex Mono (code)

## Architecture

This is a personal portfolio site with two pages:

- `/` — Hero section + featured projects grid + skills section
- `/projects` — Full project gallery

**Key patterns:**
- Project data lives in `src/data/index.ts` as a typed array — add projects here, set `featured: true` to surface them on the home page
- `src/theme/config.ts` holds the NextUI theme (dark mode, custom colors, fonts)
- `src/app/providers.tsx` wraps the app in the NextUI provider
- Custom animations (particles, shimmer, glow) are defined in `src/app/globals.css`

**Import alias:** `@/` maps to `src/`

**Images:** Remote images from `images.unsplash.com` are allowed via `next.config.ts`; local images go in `public/images/`
