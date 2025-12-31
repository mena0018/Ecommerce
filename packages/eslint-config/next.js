import nextPlugin from "@next/eslint-plugin-next"

import { defineConfig } from "eslint/config"
import { baseConfig } from "./base.js"
import { typescriptConfig } from "./typescript.js"

const nextIgnoresConfig = defineConfig([
  {
    name: "project/next-ignores",
    ignores: [".next/", "next-env.d.ts"]
  }
])

const nextConfig = defineConfig([
  {
    name: "project/next",
    files: ["**/*.{jsx,tsx}"],
    plugins: {
      "@next/next": nextPlugin
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules
    }
  }
])

export default defineConfig([
  ...baseConfig,
  ...nextIgnoresConfig,
  ...typescriptConfig,
  ...nextConfig
])
