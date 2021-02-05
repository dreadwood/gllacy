module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2020: true,
  },
  extends: [
    'htmlacademy/es6',
  ],
  parserOptions: {
    ecmaVersion: 8,
  },
  rules: {
    'quotes': ['error', 'single', {allowTemplateLiterals: true}],
  }
};
