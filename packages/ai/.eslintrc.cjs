module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/strict-type-checked',
    'plugin:@typescript-eslint/stylistic-type-checked',
    'plugin:import-x/recommended',
    'plugin:import-x/typescript',
    'eslint-config-prettier',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', '.wrangler'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  rules: {
    'import-x/no-unresolved': [
      'error',
      {
        ignore: ['@/*', 'hono/*', 'web-auth-library/*'],
      },
    ],
  },
};
