# -----------------------------
# Build stage
# -----------------------------
FROM node:22-alpine AS builder

RUN npm install -g pnpm

WORKDIR /app

COPY pnpm-workspace.yaml pnpm-lock.yaml package.json ./
COPY apps/api/package.json ./apps/api/

RUN pnpm install --frozen-lockfile --filter @repo/api...

# Copy source code (changes more often — kept after install for cache efficiency)
COPY packages/ ./packages/
COPY apps/api/ ./apps/api/

# Set the environment for the build
ENV NODE_ENV=production

# Build Medusa
RUN pnpm --filter @repo/api run build

# Verify that the admin has been compiled
RUN test -f apps/api/.medusa/server/public/admin/index.html || \
    (echo "Admin build failed - index.html not found" && exit 1)

# -----------------------------
# Production stage
# -----------------------------
FROM node:22-alpine

WORKDIR /app

# Copy only the final JS build
COPY --from=builder /app/apps/api/.medusa/server ./

# Copy node_modules + pnpm virtual store (symlinks in node_modules point into .pnpm)
COPY --from=builder /app/node_modules/.pnpm ./node_modules/.pnpm
COPY --from=builder /app/apps/api/node_modules ./node_modules

# Copy and make the entrypoint executable
COPY apps/api/docker-start.sh ./
RUN chmod +x ./docker-start.sh

EXPOSE 9000

CMD ["./docker-start.sh"]
