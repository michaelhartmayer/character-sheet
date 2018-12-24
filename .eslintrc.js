module.exports = {
  env: {
    commonjs: true,
    browser: true,
    es6: true
  },
  extends: 'eslint:recommended',
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      modules: true
    }
  },
  rules: {
    'linebreak-style': ['error', 'windows'],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    indent: ['error', 2],
    'babel/semi': 1,
    'no-unused-vars': 'off',
    'no-unreacheable': 'off'
  },
  plugins: ['babel', 'jest']
};
