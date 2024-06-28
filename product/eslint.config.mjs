/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable node/no-unpublished-import */

import path from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import globals from "globals";
import pluginJs from "@eslint/js";
import prettierPlugin from "eslint-plugin-prettier";
import jestPlugin from "eslint-plugin-jest";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const compat = new FlatCompat({
  baseDirectory: dirname,
  recommendedConfig: pluginJs.configs.recommended,
});

export default [
  { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
  {
    languageOptions: {
      sourceType: "module",
      parserOptions: {
        ecmaVersion: 2024,
      },
      globals: { ...globals.browser, ...globals.node },
    },
  },
  pluginJs.configs.recommended,
  {
    plugins: {
      prettier: prettierPlugin,
      jest: jestPlugin,
    },
    rules: {
      "prettier/prettier": "warn",
      "spaced-comment": "off",
      "no-console": "off",
      "consistent-return": "off",
      "no-extraneous-dependencies": "off",
      "no-unpublished-require": "off",
      "func-names": "off",
      "object-shorthand": "off",
      "no-process-exit": "off",
      "no-param-reassign": "off",
      "no-return-await": "off",
      "no-underscore-dangle": "off",
      "class-methods-use-this": "off",
      "prefer-destructuring": ["error", { object: true, array: false }],
      "no-unused-vars": ["warn", { argsIgnorePattern: "req|res|next|val" }],
      camelcase: "off",
    },
  },
  ...compat.env({
    node: true,
    jest: true,
  }),
  ...compat.extends("airbnb-base"),
  ...compat.extends("prettier"),
  ...compat.extends("plugin:node/recommended"),
  ...compat.extends("plugin:jest/recommended"),
  ...compat.extends("eslint:recommended"),
];
