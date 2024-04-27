import globals from "globals";

import path from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import pluginJs from "@eslint/js";

import airbnbBaseConfig from "eslint-config-airbnb-base";
import prettierConfig from "eslint-config-prettier";
import nodeRecommendedConfig from "eslint-plugin-node/lib/configs/recommended.js";

// mimic CommonJS variables -- not needed if using CommonJS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: pluginJs.configs.recommended,
});

export default [
  { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
  { languageOptions: { globals: globals.browser } },
  airbnbBaseConfig,
  prettierConfig,
  nodeRecommendedConfig,
  {
    // extends: ["airbnb-base", "prettier", "plugin:node/recommended"],
    plugins: ["prettier"],
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
      "no-unused-vars": ["error", { argsIgnorePattern: "req|res|next|val" }],
    },
  },
  ...compat.extends("standard"),
];
