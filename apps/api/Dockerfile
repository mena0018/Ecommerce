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

# Symlink node_modules into .medusa/server so Medusa finds dependencies
# when running from its production build directory (avoids a costly re-install)
RUN ln -s ../../node_modules apps/api/.medusa/server/node_modules

# Move entrypoint into the production build directory
RUN cp apps/api/docker-start.sh apps/api/.medusa/server/docker-start.sh

WORKDIR /app/apps/api/.medusa/server

EXPOSE 9000

CMD ["./docker-start.sh"]
