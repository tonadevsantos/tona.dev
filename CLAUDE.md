# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal website (tona.dev) built with Astro 5, using server-side rendering with Node.js adapter. The site includes personal content, project showcases, and interactive applications.

## Key Technologies

- **Framework**: Astro 5 with SSR (server output mode)
- **UI**: React components with Astro components
- **Styling**: TailwindCSS 4 (via Vite plugin)
- **Content**: MDX for content management with custom collections
- **Testing**: Vitest configured
- **Node Version**: Uses .nvmrc (Node version managed)

## Development Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start development server at localhost:3000 |
| `npm run build` | Type check with `astro check` then build production site |
| `npm run preview` | Preview production build locally |
| `npm run astro` | Run Astro CLI commands |

## Architecture

### Directory Structure
- `src/pages/` - Astro file-based routing (includes blog, projects, chores)
- `src/layouts/` - Layout components (Layout.astro, Frontmatter.astro)
- `src/components/` - Reusable UI components (mix of .astro and .tsx)
- `src/content/` - Content collections (projects with MDX support)
- `src/apps/` - Interactive applications with their own routing
- `src/views/` - Page-specific view components
- `src/core/lib/` - Utility functions and business logic
- `src/styles/` - Styling configuration and tokens

### Key Components Architecture
- **Apps System**: Self-contained applications in `src/apps/` with `AppRouter.tsx` and `AppBox.astro` for routing
- **Content Collections**: Projects defined in `content.config.ts` using Astro's glob loader
- **Path Aliases**: `@/*` maps to `src/*` for cleaner imports
- **React Integration**: React components (.tsx) work alongside Astro components (.astro)

### Content Management
- Projects collection uses MDX with custom schema (title, meta array)
- Content stored in `src/content/projects/` with automatic loading via glob pattern

### Styling Approach
- TailwindCSS 4 via Vite plugin (not PostCSS)
- Design tokens in `src/styles/tokens.ts`
- Sass available for complex styling needs

### Build Configuration
- Server-side rendering enabled with Node.js standalone adapter
- TypeScript with strict configuration extending Astro's strict preset
- Custom redirects configured in astro.config.mjs
- MDX and React integrations enabled