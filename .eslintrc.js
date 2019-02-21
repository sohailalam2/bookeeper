// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
  },
  env: {
    browser: true,
  },
  extends: ['airbnb-base'],
  // add your custom rules here
  rules: {
    // don't require .js extension when importing
    'import/extensions': [
      'error',
      'always',
      {
        js: 'never',
      },
    ],
    // allow optionalDependencies
    'import/no-extraneous-dependencies': [
      'error',
      {
        optionalDependencies: ['test/unit/index.js'],
      },
    ],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,

    'object-curly-newline': [
      'error',
      {
        ObjectExpression: { multiline: true, minProperties: 6 },
        ObjectPattern: { multiline: true, minProperties: 6 },
        ImportDeclaration: 'never',
        ExportDeclaration: { multiline: true, minProperties: 6 },
      },
    ],
  },
};
