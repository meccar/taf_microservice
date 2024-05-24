// import globals from "globals";

import path from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import pluginJs from "@eslint/js";
import prettierPlugin from "eslint-plugin-prettier";

// mimic CommonJS variables -- not needed if using CommonJS
const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const compat = new FlatCompat({
  baseDirectory: dirname,
  recommendedConfig: pluginJs.configs.recommended,
});

export default [
  { files: ["**/*.js"], languageOptions: { sourceType: "script" } },
  {
    languageOptions: {
      sourceType: "module",
      parserOptions: {
        ecmaVersion: 2024,
      },
    },
  },
  {
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      "prettier/prettier": "warn",
      "spaced-comment": "off",
      "no-console": "off",
      "consistent-return": "off",
      "func-names": "off",
      "object-shorthand": "off",
      "no-process-exit": "off",
      "no-param-reassign": "off",
      "no-return-await": "off",
      "no-underscore-dangle": "off",
      "class-methods-use-this": "off",
      "prefer-destructuring": ["error", { object: true, array: false }],
      "no-unused-vars": ["warn", { argsIgnorePattern: "req|res|next|val" }],
    },
  },
  ...compat.extends("airbnb-base"),
  ...compat.extends("prettier"),
  ...compat.extends("plugin:node/recommended"),
];
