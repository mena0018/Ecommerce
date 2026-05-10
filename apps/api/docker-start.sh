#!/bin/sh
set -e

echo "Building Medusa..."
pnpm run build

echo "Running database migrations..."
pnpm run migrate

echo "Starting Medusa server..."
pnpm run start
