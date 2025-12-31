import eslintPlugin from "@eslint/js";
import turboPlugin from "eslint-plugin-turbo";
import eslintConfigPrettier from "eslint-config-prettier";

import { defineConfig } from "eslint/config";

const baseConfig = defineConfig([
  {
    name: "project/base",
    files: ["**/*.{js,mjs,ts,tsx}"],
    ignores: ["node_modules/", "dist/", "build/"],
    ...eslintPlugin.configs.recommended,
    ...eslintConfigPrettier,
    plugins: {
      turbo: turboPlugin,
    },
  },
]);

export { baseConfig };
