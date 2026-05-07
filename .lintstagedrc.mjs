/** @type {import('lint-staged').Configuration} */
export default {
  "apps/web/**/*.{js,jsx,mjs,cjs,ts,tsx}": (files) => [
    `pnpm --filter @repo/web exec eslint --fix ${files.join(" ")}`,
    `prettier --write ${files.join(" ")}`
  ],
  "packages/**/*.{js,jsx,mjs,cjs,ts,tsx}": (files) => [
    `eslint --fix --flag v10_config_lookup_from_file ${files.join(" ")}`,
    `prettier --write ${files.join(" ")}`
  ],
  "apps/api/**/*.{js,jsx,mjs,cjs,ts,tsx}": (files) => `prettier --write ${files.join(" ")}`,
  "**/*.{json,md,mdx,yml,yaml,css,scss,html}": (files) => `prettier --write ${files.join(" ")}`,
  "*.{js,mjs,cjs,ts}": (files) => `prettier --write ${files.join(" ")}`
}
