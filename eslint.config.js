import eslint from "@eslint/js";
import { defineConfig } from "eslint/config";
import eslintConfigPrettier from "eslint-config-prettier";
import eslintPluginAstro from "eslint-plugin-astro";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import tseslint from "typescript-eslint";

export default defineConfig(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,

  // add more generic rule sets here, such as:
  // js.configs.recommended,
  ...eslintPluginAstro.configs.recommended,
  eslintConfigPrettier,
  {
    plugins: {
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      "simple-import-sort/imports": "warn",
      "simple-import-sort/exports": "warn",
    },
  },
  {
    rules: {
      "@typescript-eslint/triple-slash-reference": "off",
      "@typescript-eslint/consistent-type-imports": "error",
    },
  },
);
