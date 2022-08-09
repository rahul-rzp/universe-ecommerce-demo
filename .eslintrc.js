const universeEsLintConfig = require.resolve('@razorpay/universe-cli/eslintrc.typescript');

module.exports = {
  root: true,
  extends: [universeEsLintConfig],
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/naming-convention': 'off',
  },
};
