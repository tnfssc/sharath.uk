module.exports = {
  plugins: ['prettier-plugin-packagejson', 'prettier-plugin-organize-imports', '@trivago/prettier-plugin-sort-imports'],
  trailingComma: 'all',
  tabWidth: 2,
  semi: true,
  singleQuote: true,
  printWidth: 120,
  bracketSpacing: true,
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  importOrder: ['^react/(.*)$', '^@/(.*)$', '^[./]'],
};
