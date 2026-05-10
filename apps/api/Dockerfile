FROM node:22-alpine

RUN npm install -g pnpm

WORKDIR /app

COPY pnpm-workspace.yaml pnpm-lock.yaml package.json ./
COPY packages/ ./packages/
COPY apps/api/ ./apps/api/

RUN pnpm install --frozen-lockfile --filter @repo/api...

WORKDIR /app/apps/api

RUN pnpm run build

EXPOSE 9000

CMD ["./docker-start.sh"]
