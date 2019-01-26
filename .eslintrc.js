module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/essential', '@vue/prettier'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'linebreak-style': 'off',
    'vue/max-attributes-per-line': [
      2,
      {
        singleline: 4,
        multiline: {
          max: 1,
          allowFirstLine: false,
        },
      },
    ],
    'prettier/prettier': [
      'error',
      {
        printWidth: 120, // 换行字符串阈值
        semi: true, // 句末加分号
        singleQuote: true, // 用单引号
        trailingComma: 'es5', // 最后一个对象元素加逗号
        bracketSpacing: true, // 对象，数组加空格
        jsxBracketSameLine: false, // jsx > 是否另起一行
        arrowParens: 'avoid', // (x) => {} 是否要有小括号
        // requirePragma: false, // 是否要注释来决定是否格式化代码
        proseWrap: 'preserve', // 是否要换行
      },
    ],
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
