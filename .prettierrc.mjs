// @ts-check
/** @type {import("prettier").Config} */
export default {
  semi: true,
  tabWidth: 2,
  printWidth: 120,
  singleQuote: false,
  trailingComma: "all",
  bracketSpacing: true,
  overrides: [{ files: "*.astro", options: { parser: "astro" } }],
  plugins: ["prettier-plugin-astro", "prettier-plugin-packagejson"],
};
