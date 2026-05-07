import pluginReactHooks from "eslint-plugin-react-hooks"
import pluginReact from "eslint-plugin-react"
import globals from "globals"

import { baseConfig } from "./base.js"

/**
 * ESLint configuration for React applications.
 *
 * @type {import("eslint").Linter.Config[]}
 */
export const reactConfig = [
  ...baseConfig,
  {
    ...pluginReact.configs.flat.recommended,
    languageOptions: {
      ...pluginReact.configs.flat.recommended.languageOptions,
      globals: {
        ...globals.browser
      }
    }
  },
  {
    plugins: {
      "react-hooks": pluginReactHooks
    },
    settings: { react: { version: "detect" } },
    rules: {
      ...pluginReactHooks.configs.recommended.rules,
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",
      "react/self-closing-comp": "warn",
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }]
    }
  }
]
