/** @type {import("prettier").Config} */
export default {
  semi: false,
  trailingComma: "none",
  endOfLine: "auto",
  plugins: ["prettier-plugin-tailwindcss"],
  tailwindFunctions: ["cva", "clx"]
}
