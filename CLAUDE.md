# CLAUDE.md

E-commerce monorepo: Next.js 16 storefront + Medusa v2 backend.

## Commands

```bash
pnpm dev              # all apps
pnpm dev:web          # Next.js (port 3000)
pnpm dev:api          # Medusa (port 9000 + admin 5173)
pnpm build            # all apps
pnpm build:web
pnpm build:api
pnpm lint             # apps/web + packages only (apps/api has no ESLint)
pnpm format           # Prettier, all files
pnpm typecheck
```

Node.js >= 22.22.0 required (`engines` enforced by pnpm).

## Monorepo layout

```
apps/
  web/   — Next.js 16 storefront (React 19, App Router, Turbopack)
  api/   — Medusa v2 backend (REST API + admin dashboard)
packages/
  eslint-config/     — shared ESLint configs (base / react / next)
  typescript-config/ — shared tsconfig presets
```

## Git hooks (Husky)

- **pre-commit** (`lint-staged`): ESLint + Prettier on `apps/web` + `packages`, Prettier only on `apps/api`.
- **pre-push**: `turbo run typecheck lint` (parallel, cache-enabled).

## Environment variables

`apps/web`: `MEDUSA_BACKEND_URL`, `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY`, `NEXT_PUBLIC_DEFAULT_REGION`.

`apps/api`: see `medusa-config.ts`.
