import { defineConfig } from "eslint/config";
import { configs as tseslintConfigs } from "typescript-eslint";

const typescriptConfig = defineConfig([
  {
    name: "project/typescript",
    files: ["**/*.{ts,tsx,mjs}"],
    extends: [
      ...tseslintConfigs.strictTypeChecked,
      ...tseslintConfigs.stylisticTypeChecked,
    ],
    languageOptions: {
      parserOptions: {
        projectService: true,
        ecmaFeatures: { jsx: true },
        warnOnUnsupportedTypeScriptVersion: true,
      },
    },
    rules: {
      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/triple-slash-reference": "off",
      "@typescript-eslint/no-unsafe-argument": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/consistent-type-definitions": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }
      ],
      "arrow-body-style": "off",
    },
  },
  {
    name: "project/javascript-disable-type-check",
    files: ["**/*.{js,mjs,cjs}"],
    ...tseslintConfigs.disableTypeChecked,
  },
]);

export { typescriptConfig };
