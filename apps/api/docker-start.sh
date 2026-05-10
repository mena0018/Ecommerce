#!/bin/sh
set -e

echo "Creating .env.production with runtime environment variables..."
cat > .env.production << EOF
NODE_ENV=production
DATABASE_URL=${DATABASE_URL:-}
REDIS_URL=${REDIS_URL:-}
JWT_SECRET=${JWT_SECRET:-supersecret}
COOKIE_SECRET=${COOKIE_SECRET:-supersecret}
STORE_CORS=${STORE_CORS:-}
ADMIN_CORS=${ADMIN_CORS:-}
AUTH_CORS=${AUTH_CORS:-}
MEDUSA_BACKEND_URL=${MEDUSA_BACKEND_URL:-}
MEDUSA_WORKER_MODE=${MEDUSA_WORKER_MODE:-shared}
DISABLE_MEDUSA_ADMIN=${DISABLE_MEDUSA_ADMIN:-false}
EOF

echo "Running migrations..."
pnpm run migrate
echo "Migrations completed"

echo "Starting Medusa server..."
exec pnpm run start
