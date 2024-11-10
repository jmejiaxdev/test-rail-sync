import eslintPluginTypeScript from "@typescript-eslint/eslint-plugin";
import eslintParserTypeScript from "@typescript-eslint/parser";
import eslintPluginImport from "eslint-plugin-import";
import eslintPluginJestDom from "eslint-plugin-jest-dom";
import eslintPluginNoUnsanitized from "eslint-plugin-no-unsanitized";
import eslintPluginPrettier from "eslint-plugin-prettier";
import eslintPluginReact from "eslint-plugin-react";
import eslintPluginReactHooks from "eslint-plugin-react-hooks";
import eslintPluginSecurity from "eslint-plugin-security";
import eslintPluginTestingLibrary from "eslint-plugin-testing-library";
import eslintPluginUnusedImports from "eslint-plugin-unused-imports";

export default [
  {
    files: ["**/*.[jt]s?(x)"],
    ignores: [
      ".DS_Store",
      ".env",
      ".gitignore",
      ".prettierignore",
      ".vscode-test",
      "dist",
      "node_modules",
      "resources",
      "out",
    ],
    languageOptions: {
      parser: eslintParserTypeScript,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        ecmaVersion: 2019,
        sourceType: "module",
      },
    },
    plugins: {
      "import": eslintPluginImport,
      "@typescript-eslint": eslintPluginTypeScript,
      "jest-dom": eslintPluginJestDom,
      "no-unsanitized": eslintPluginNoUnsanitized,
      "prettier": eslintPluginPrettier,
      "react": eslintPluginReact,
      "react-hooks": eslintPluginReactHooks,
      "security": eslintPluginSecurity,
      "testing-library": eslintPluginTestingLibrary,
      "unused-imports": eslintPluginUnusedImports,
    },
    rules: {
      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/explicit-member-accessibility": "off",
      "@typescript-eslint/explicit-module-boundary-types": ["error"],
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-unused-vars": ["error", { ignoreRestSiblings: true }],
      "@typescript-eslint/no-use-before-define": ["error", { classes: false, functions: false }],
      "import/order": [
        "error",
        {
          "alphabetize": { order: "asc", caseInsensitive: false },
          "groups": ["builtin", "external", "internal", "index", "object", "parent", "sibling", "unknown"],
          "newlines-between": "never",
        },
      ],
      "import/namespace": [2, { allowComputed: true }],
      "import/newline-after-import": ["error", { count: 1 }],
      "import/no-duplicates": ["error", { considerQueryString: true }],
      "import/no-cycle": "error",
      "import/no-unresolved": ["error", { ignore: ["vscode"] }],
      "max-classes-per-file": "off",
      "no-debugger": "warn",
      "no-nested-ternary": ["error"],
      "no-unneeded-ternary": "error",
      "prefer-const": [
        "error",
        {
          destructuring: "any",
          ignoreReadBeforeAssign: false,
        },
      ],
      "prettier/prettier": ["error"],
      "quotes": ["error", "double", { avoidEscape: true, allowTemplateLiterals: false }],
      "react/prop-types": "warn",
      "react-hooks/exhaustive-deps": "warn",
      "react-hooks/rules-of-hooks": "error",
      "security/detect-non-literal-fs-filename": "off",
      "security/detect-object-injection": "off",
      "unused-imports/no-unused-imports": "error",
      "require-await": "error",
    },
    settings: {
      "import/extensions": [".ts", ".tsx"],
      "import/ignore": ["vscode"],
      "import/resolver": {
        typescript: {
          project: ["./tsconfig.extension.json", "./tsconfig.webview.json"],
        },
      },
      "react": { version: "detect" },
    },
  },
];
