import { nextJsConfig } from "@packages/eslint-config/next"

export default [
  ...nextJsConfig,
  {
    ignores: [".agents/**", ".claude/**"]
  }
]
