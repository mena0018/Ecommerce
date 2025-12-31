export default {
  "**/*.{json,md,css}": "prettier --write",
  "**/*.{ts,tsx,js}": ["eslint --fix", "prettier --write"]
}
