# -----------------------------
# Build stage
# -----------------------------
FROM node:22-alpine AS builder

RUN npm install -g pnpm

WORKDIR /app

COPY pnpm-workspace.yaml pnpm-lock.yaml package.json ./
COPY packages/ ./packages/
COPY apps/api/ ./apps/api/

RUN pnpm install --frozen-lockfile --filter @repo/api...

WORKDIR /app/apps/api

ENV NODE_ENV=production

RUN pnpm run build

# Verify that the admin has been compiled
RUN test -f .medusa/server/public/admin/index.html || \
    (echo "Admin build failed - index.html not found" && exit 1)

# -----------------------------
# Production stage
# -----------------------------
FROM node:22-alpine

WORKDIR /app

# Copy compiled server output
COPY --from=builder /app/apps/api/.medusa/server ./

# Reuse node_modules from builder instead of reinstalling
COPY --from=builder /app/apps/api/node_modules ./node_modules

COPY apps/api/docker-start.sh ./
RUN chmod +x ./docker-start.sh

EXPOSE 9000

CMD ["./docker-start.sh"]
