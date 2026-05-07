import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const env = createEnv({
  shared: {
    NODE_ENV: z.enum(["development", "production", "test"]).default("development")
  },

  server: {
    MEDUSA_BACKEND_URL: z.url().default("http://localhost:9000"),
    REVALIDATE_SECRET: z.string().min(1).default("supersecret"),
    MEDUSA_CLOUD_S3_HOSTNAME: z.string().optional(),
    MEDUSA_CLOUD_S3_PATHNAME: z.string().optional()
  },
  client: {
    NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY: z.string().min(1),
    NEXT_PUBLIC_BASE_URL: z.url().default("http://localhost:3000"),
    NEXT_PUBLIC_DEFAULT_REGION: z.string().length(2).default("eu"),
    NEXT_PUBLIC_STRIPE_KEY: z.string().optional(),
    NEXT_PUBLIC_MEDUSA_PAYMENTS_PUBLISHABLE_KEY: z.string().optional(),
    NEXT_PUBLIC_MEDUSA_PAYMENTS_ACCOUNT_ID: z.string().optional()
  },

  /**
   * Reference the client & shared environment variables.
   */
  experimental__runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY,
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    NEXT_PUBLIC_DEFAULT_REGION: process.env.NEXT_PUBLIC_DEFAULT_REGION,
    NEXT_PUBLIC_STRIPE_KEY: process.env.NEXT_PUBLIC_STRIPE_KEY,
    NEXT_PUBLIC_MEDUSA_PAYMENTS_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_MEDUSA_PAYMENTS_PUBLISHABLE_KEY,
    NEXT_PUBLIC_MEDUSA_PAYMENTS_ACCOUNT_ID: process.env.NEXT_PUBLIC_MEDUSA_PAYMENTS_ACCOUNT_ID
  },

  /**
   * Called when environment variables are invalid.
   */
  onValidationError: (issues) => {
    console.error("❌ Invalid environment variables:", issues)
    process.exit(1)
  },

  /**
   * Called when a server-side environment variable is accessed on the client.
   */
  onInvalidAccess: (variable: string) => {
    throw new Error(
      `❌ Attempted to access a server-side environment variable on the client: ${variable}`
    )
  }
})
