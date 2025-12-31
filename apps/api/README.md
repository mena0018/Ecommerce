# @apps/api

Medusa v2 backend — REST API + admin dashboard.

## Local development

### Prerequisites

- Node.js >= 22.22.0
- Docker (for PostgreSQL + Redis)

### Setup

```bash
# 1. Copy the env template
cp .env.template .env

# 2. Start PostgreSQL + Redis via Docker
pnpm --filter @apps/api docker:up

# 3. Run migrations (first time only)
pnpm --filter @apps/api migrate

# 4. Create admin user (first time only)
pnpm --filter @apps/api exec medusa user --email admin@example.com --password yourpassword

# 5. Start Medusa (from monorepo root)
pnpm dev:api
```

- API → http://localhost:9000
- Admin dashboard → http://localhost:9000/app

### Useful commands

```bash
pnpm --filter @apps/api docker:down   # stop PostgreSQL + Redis
pnpm --filter @apps/api migrate       # run pending migrations
pnpm --filter @apps/api seed          # seed demo data (run once manually)
pnpm --filter @apps/api typecheck     # TypeScript check
pnpm --filter @apps/api format        # format with Prettier
```

## Production deployment (Railway + Supabase)

### Architecture

| Service            | Provider         |
| ------------------ | ---------------- |
| Medusa API         | Railway (Docker) |
| PostgreSQL         | Supabase         |
| Redis              | Railway          |
| Next.js storefront | Vercel           |

### Steps

**1. Railway — create project**

- New project → Deploy from GitHub repo
- Root directory: `apps/api`
- Railway auto-detects the `Dockerfile`

**2. Railway — add Redis**

- In the same project: New service → Redis
- Copy the `REDIS_URL` from the Redis service variables

**3. Railway — set environment variables**

```env
NODE_ENV=production
DATABASE_URL=        # Supabase connection string
REDIS_URL=           # from Railway Redis service
JWT_SECRET=          # openssl rand -base64 32
COOKIE_SECRET=       # openssl rand -base64 32
STORE_CORS=          # https://your-storefront.vercel.app
ADMIN_CORS=          # https://your-api.railway.app
AUTH_CORS=           # https://your-api.railway.app,https://your-storefront.vercel.app
```

**4. Migrations**

Migrations run automatically on every deploy via `docker-start.sh`.

**5. Vercel — set environment variables**

In `apps/web`, set `MEDUSA_BACKEND_URL` to the Railway service URL.

## Structure

```
src/
  api/          # custom REST endpoints (admin + store)
  modules/      # custom Medusa modules
  workflows/    # Medusa workflows
  subscribers/  # event subscribers
  jobs/         # scheduled jobs
  links/        # module links
  scripts/      # one-off scripts (seed, etc.)
medusa-config.ts  # Medusa configuration
docker-compose.yml  # local infra (PostgreSQL + Redis)
Dockerfile          # production image
docker-start.sh     # container entrypoint (migrate + start)
```
