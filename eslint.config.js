import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { globalIgnores } from 'eslint/config'
import reactPlugin from 'eslint-plugin-react';

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-debugger': 'warn',
      'eqeqeq': ['error', 'always'],
      // 缩进（2空格）
      // indent: ['error', 4],
  
      // 引号风格（单引号）
      quotes: ['error', 'single', { avoidEscape: true }],
  
      // 尾随逗号（多行时强制）
      'comma-dangle': ['error', 'always-multiline'],
  
      // 对象/数组括号换行
      'object-curly-newline': ['error', { multiline: true, consistent: true }],
      'array-bracket-newline': ['error', 'consistent'],
  
      // 函数参数括号换行
      'function-paren-newline': ['error', 'multiline-arguments'],
  
      // 链式调用换行
      'newline-per-chained-call': ['error', { ignoreChainWithDepth: 2 }],
    },
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2025,
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    settings: {
      react: {
        version: 'detect', // 自动检测 React 版本
      },
    },
    plugins: { react: reactPlugin }, // 关键：声明 react 插件
    rules: {
      // React 核心规则
      'react/jsx-uses-react': 'error',
      'react/react-in-jsx-scope': 'off', // React 17+ 不需要手动导入 React
      'react/jsx-key': 'error',
      'react/jsx-curly-brace-presence': ['warn', { props: 'never' }],
      'react/jsx-indent': ['error', 4],
      'react/jsx-indent-props': ['error', 4],
      'react/jsx-closing-bracket-location': ['error', 'line-aligned'],
      'react/jsx-tag-spacing': [
        'error',
        {
          closingSlash: 'never',
          beforeSelfClosing: 'always',
          afterOpening: 'never',
          beforeClosing: 'never',
        },
      ],
      'react/jsx-child-element-spacing': 'error',
      'react/self-closing-comp': ['error', { component: true, html: true }],
      'react/void-dom-elements-no-children': 'error',
      "react/jsx-max-props-per-line": ["error", { maximum: 1, when: "multiline" }],
      'react/jsx-wrap-multilines': [
        'error',
        {
          declaration: 'parens-new-line',
          assignment: 'parens-new-line',
          return: 'parens-new-line',
          arrow: 'parens-new-line',
          condition: 'parens-new-line',
          logical: 'parens-new-line',
          prop: 'parens-new-line',
        },
      ],
    },
  },
])
