module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/strict-type-checked',
    'plugin:@typescript-eslint/stylistic-type-checked',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:import-x/recommended',
    'plugin:import-x/typescript',
    'plugin:jsx-a11y/recommended',
    'plugin:deprecation/recommended',
    '@unocss',
    'eslint-config-prettier',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', '*.config.ts', '*.fixture.tsx', 'cosmos.decorator.tsx'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    'import-x/no-unresolved': [
      'error',
      {
        ignore: ['.svg', 'virtual:*', '@/*', 'routeTree.gen', 'sonner', 'hono/*'],
      },
    ],
    'react/prop-types': 'off',
  },
  settings: {
    react: { version: 'detect' },
  },
};
