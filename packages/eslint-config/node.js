import { defineConfig } from "eslint/config";
import { baseConfig } from "./base.js";
import { typescriptConfig } from "./typescript.js";

const nodeIgnoresConfig = defineConfig([
  {
    name: "project/node-ignores",
    ignores: [".medusa/"],
  },
]);

export default defineConfig([
  ...baseConfig,
  ...nodeIgnoresConfig,
  ...typescriptConfig,
]);
