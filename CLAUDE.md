# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

All commands run from the monorepo root via Turbo unless otherwise noted.

```bash
# Dev
pnpm dev              # all apps in parallel
pnpm dev:web          # Next.js only (port 3000)
pnpm dev:api          # Medusa only (port 9000 + admin port 5173)

# Build
pnpm build
pnpm build:web
pnpm build:api

# Lint (apps/web + packages only — apps/api has no ESLint)
pnpm lint
pnpm lint:web

# Format (Prettier, all files)
pnpm format           # write
# format:check is absent intentionally — add it when CI exists

# Typecheck
pnpm typecheck
pnpm typecheck:web
pnpm typecheck:api

# DB
pnpm --filter @apps/api migrate     # run Medusa migrations
pnpm --filter @apps/api seed        # seed data

# Infra (from apps/api/)
pnpm --filter @apps/api docker:up   # start PostgreSQL + Redis + Medusa in Docker
pnpm --filter @apps/api docker:down
```

Node.js >= 22.22.0 is required (`engines` field enforced by pnpm).

## Architecture

### Monorepo layout

```
apps/
  web/   — Next.js 16 storefront (React 19, App Router, Turbopack)
  api/   — Medusa v2 backend (REST API + admin dashboard)
packages/
  eslint-config/     — shared ESLint configs (base / react / next)
  typescript-config/ — shared tsconfig presets
  ui/                — shared React component library
```

### apps/web — Storefront

**Routing**: `src/app/[countryCode]/(main)/` and `src/app/[countryCode]/(checkout)/`. Every route is prefixed by country code (e.g. `/us`, `/fr`). The middleware (`src/proxy.ts`) runs on Edge, fetches available regions from Medusa, maps the incoming URL to the right region, and redirects accordingly.

**Folder structure**:

```
src/
  app/        — Next.js routes (App Router)
  components/ — React components
  data/       — Server Actions + fetchers, one file per domain (cart.ts, products.ts, …)
  utils/      — Pure utility functions (sort-products.ts, error.ts, cn.ts, …)
  lib/        — Cross-cutting concerns only: config.ts, env.ts, env.edge.ts, types.ts
```

**Data layer**: `src/data/` contains server-only async functions (tagged `"use server"`) that call the Medusa SDK. One file per domain (`cart.ts`, `products.ts`, `customer.ts`, etc.). These are called directly from Server Components or Server Actions — no REST fetching in client components.

**SDK singleton**: `src/lib/config.ts` exports a single `sdk` instance (`@medusajs/js-sdk`). It patches `sdk.client.fetch` to inject the `x-medusa-locale` header on every request.

**Caching**: Next.js cache tags are built from `_medusa_cache_id` cookie (see `src/data/cookies.ts`). `getCacheOptions(tag)` returns the `{ tags }` object to pass to `fetch`. Auth token stored in `_medusa_jwt` (httpOnly).

**Shared types**: `src/lib/types.ts` holds types shared between `data/` and `utils/` (e.g. `SortOptions`). Do not create a `types/` folder — collocate types with their module unless they are shared across multiple modules.

**Tailwind + CVA**: Prettier is configured to sort Tailwind classes inside `cva()` calls (plugin scoped to `apps/web`).

### apps/api — Medusa backend

Standard Medusa v2 structure:

- `src/api/` — custom REST endpoints (admin + store)
- `src/modules/` — custom Medusa modules
- `src/workflows/` — Medusa workflows
- `src/subscribers/` — event subscribers
- `src/jobs/` — scheduled jobs
- `src/links/` — module links

Config in `medusa-config.ts`. Requires `DATABASE_URL`, `JWT_SECRET`, `COOKIE_SECRET`, `STORE_CORS`, `ADMIN_CORS`, `AUTH_CORS`.

No ESLint — only Prettier and TypeScript.

### Shared packages

`@packages/eslint-config` exports three configs:

- `base` — JS + TS + Prettier compat + Turbo env vars
- `react` — base + React + React Hooks
- `next` — react + Next.js plugin + CJS globals override (for `.js` config files)

Apps import the appropriate config in their `eslint.config.mjs`.

## Git hooks (Husky)

**pre-commit** (`lint-staged`):

- `apps/web` + `packages/*` `.ts/.tsx/.js/…` → `eslint --fix` + `prettier --write`
- `apps/api` `.ts/.js/…` → `prettier --write` only
- JSON / MD / YAML / CSS → `prettier --write`
- Fixes are automatically re-staged.

**pre-push**: `turbo run typecheck lint` (parallel, cache-enabled).

## Environment variables

`apps/web`:

- `MEDUSA_BACKEND_URL` — defaults to `http://localhost:9000`
- `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY`
- `NEXT_PUBLIC_DEFAULT_REGION` — defaults to `us`

`apps/api`: see `medusa-config.ts` for the full list.

## apps/web — Coding conventions

### React components

- Always declare a `type Props = { ... }` above the component instead of inlining types in the function signature.
- When props include `children`, use `PropsWithChildren<{ ... }>` instead of `children: React.ReactNode`.
- Use `<Fragment>` (imported from React) instead of the `<>` shorthand.
- Always add a blank line between the last line of logic and the `return (` statement.
