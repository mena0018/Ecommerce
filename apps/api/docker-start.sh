#!/bin/sh
set -e

echo "Running database migrations..."
pnpm run migrate

echo "Starting Medusa server..."
pnpm run start
