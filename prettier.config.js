// prettier.config.js
module.exports = {
  bracketSpacing: true,
  semi: true,
  trailingComma: 'all',
  printWidth: 80,
  tabWidth: 2,
  importOrder: [
    '^(next/(.*)$)|^(next$)',
    '^(react/(.*)$)|^(react$)',
    '<THIRD_PARTY_MODULES>',
    '^[./]',
    '.*/globals.css.*',
    '^@/components/(.*)$',
    '^@/(?!styles)(.*)$|^/(.*)$',
  ],
  plugins: ['@trivago/prettier-plugin-sort-imports'],

  importOrderSeparation: false,
  importOrderSortSpecifiers: true,
  singleQuote: true,
};
