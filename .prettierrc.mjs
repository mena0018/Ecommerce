/** @type {import('prettier').Config} */
export default {
  semi: false,
  printWidth: 100,
  singleQuote: false,
  trailingComma: "none",
  overrides: [
    {
      files: "apps/web/**/*.{ts,tsx,js,jsx,mjs,cjs}",
      options: {
        plugins: ["prettier-plugin-tailwindcss"],
        tailwindFunctions: ["cva"]
      }
    }
  ]
}
