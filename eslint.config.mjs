import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: { globals: globals.browser }
  },
  tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  // React 17+ / automatic JSX runtime — no `import React` required
  pluginReact.configs.flat["jsx-runtime"],
  {
    settings: {
      // Explicit version avoids flaky `detect` with some ESLint 10 + plugin-react combos
      react: { version: "19.2.4" }
    }
  }
]);
