FROM node:22-alpine

RUN npm install -g pnpm

WORKDIR /app

# Copy dependency manifests first to leverage Docker layer caching
COPY pnpm-workspace.yaml pnpm-lock.yaml package.json ./
COPY apps/api/package.json ./apps/api/

RUN pnpm install --frozen-lockfile --filter @repo/api...

# Copy source code
COPY packages/ ./packages/
COPY apps/api/ ./apps/api/

ENV NODE_ENV=production

RUN pnpm --filter @repo/api run build

# Verify that the admin has been compiled
RUN test -f apps/api/.medusa/server/public/admin/index.html || \
    (echo "Admin build failed - index.html not found" && exit 1)

# Install production dependencies inside .medusa/server so it is self-contained
# CI=true tells pnpm to skip TTY-only prompts; --ignore-workspace isolates this
# install from the parent monorepo so it only resolves .medusa/server's package.json
ENV CI=true
WORKDIR /app/apps/api/.medusa/server
RUN pnpm install --prod --ignore-workspace

# Move entrypoint into the production build directory
RUN cp /app/apps/api/docker-start.sh ./docker-start.sh

EXPOSE 9000

CMD ["./docker-start.sh"]
