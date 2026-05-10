import { loadEnv, defineConfig } from "@medusajs/framework/utils"

loadEnv(process.env.NODE_ENV ?? "development", process.cwd())

module.exports = defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    // SSL disabled: PostgreSQL and Medusa run on the same Docker network
    // (no traffic leaves the server, so SSL adds no security benefit)
    databaseDriverOptions: {
      ssl: false,
      sslmode: "disable"
    },
    redisUrl: process.env.REDIS_URL,
    workerMode: (process.env.MEDUSA_WORKER_MODE ?? "shared") as "shared" | "worker" | "server",

    http: {
      storeCors: process.env.STORE_CORS ?? "",
      adminCors: process.env.ADMIN_CORS ?? "",
      authCors: process.env.AUTH_CORS ?? "",
      jwtSecret: process.env.JWT_SECRET ?? "supersecret",
      cookieSecret: process.env.COOKIE_SECRET ?? "supersecret"
    }
  },

  admin: {
    disable: process.env.DISABLE_MEDUSA_ADMIN === "true",
    backendUrl: process.env.MEDUSA_BACKEND_URL
  },

  modules: [
    // Redis-based event bus — required for server ↔ worker communication
    {
      resolve: "@medusajs/medusa/event-bus-redis",
      options: {
        redisUrl: process.env.REDIS_URL
      }
    },
    // Redis-based workflow engine — workflows survive container restarts
    {
      resolve: "@medusajs/medusa/workflow-engine-redis",
      options: {
        redis: {
          url: process.env.REDIS_URL
        }
      }
    }
  ]
})
