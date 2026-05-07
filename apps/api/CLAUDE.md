# apps/api — Medusa Backend

Standard Medusa v2 structure:

```
src/
  api/         — custom REST endpoints (admin + store)
  modules/     — custom Medusa modules
  workflows/   — Medusa workflows
  subscribers/ — event subscribers
  jobs/        — scheduled jobs
  links/       — module links
```

## Config

`medusa-config.ts`. Requires `DATABASE_URL`, `JWT_SECRET`, `COOKIE_SECRET`, `STORE_CORS`, `ADMIN_CORS`, `AUTH_CORS`.

## Commands

```bash
pnpm --filter @repo/api migrate     # run Medusa migrations
pnpm --filter @repo/api seed        # seed data
pnpm --filter @repo/api docker:up   # start PostgreSQL + Redis + Medusa
pnpm --filter @repo/api docker:down
```

## Tooling

No ESLint — only Prettier and TypeScript.
