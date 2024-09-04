import js from '@eslint/js';
import prettier from 'eslint-config-prettier';

export default [
  js.configs.recommended, // Using ESLint's recommended config
  {
    files: ['**/*.js'], // Apply to all JavaScript files
    languageOptions: {
      ecmaVersion: 2022, // ECMAScript 2022 features
      sourceType: 'module', // Enable ECMAScript modules
      globals: {
        // Browser globals
        window: 'readonly',
        document: 'readonly',
        localStorage: 'readonly',
        alert: 'readonly',
        // Node.js globals
        process: 'readonly',
        console: 'readonly',
        module: 'readonly',
        require: 'readonly',
        // Leaflet globals
        navigator: 'readonly',
        L: 'readonly'
      },
    },
    plugins: {
    },
    rules: {
      'semi': ['error', 'always'], // Custom rule
      ...prettier.rules // Import Prettier rules
    },
  },
];
