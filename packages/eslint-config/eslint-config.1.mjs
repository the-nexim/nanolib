import { fixupConfigRules, fixupPluginRules } from "@eslint/compat";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import _import from "eslint-plugin-import";
import requireExtensions from "eslint-plugin-require-extensions";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [...fixupConfigRules(compat.extends(
    "eslint:recommended",
    "plugin:@typescript-eslint/strict",
    "plugin:@typescript-eslint/stylistic",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:require-extensions/recommended",
)), {
    plugins: {
        "@typescript-eslint": fixupPluginRules(typescriptEslint),
        import: fixupPluginRules(_import),
        "require-extensions": fixupPluginRules(requireExtensions),
    },

    languageOptions: {
        globals: {
            ...globals["shared-node-browser"],
        },

        parser: tsParser,
        ecmaVersion: 2023,
        sourceType: "module",

        parserOptions: {
            project: true,
        },
    },

    settings: {
        "import/resolver": {
            typescript: {
                alwaysTryTypes: true,
                ecmaVersion: 2023,
                project: ["**/tsconfig.json"],
                projectFolderIgnoreList: ["**/node_modules/**"],
            },

            node: true,
        },

        "import/extensions": [".js", ".mjs", ".ts", ".d.ts"],
    },

    rules: {
        "max-len": ["error", {
            code: 140,
        }],

        "no-eval": ["error", {
            allowIndirect: true,
        }],

        "no-floating-decimal": "error",
        "space-infix-ops": "error",

        "new-cap": ["error", {
            capIsNewExceptionPattern: "Mixin$",
        }],

        "brace-style": ["error", "stroustrup", {
            allowSingleLine: true,
        }],

        indent: "off",

        "@typescript-eslint/indent": ["error", 2, {
            SwitchCase: 1,
            VariableDeclarator: 1,
            outerIIFEBody: 1,
            MemberExpression: 1,

            FunctionDeclaration: {
                parameters: 1,
                body: 1,
            },

            FunctionExpression: {
                parameters: 1,
                body: 1,
            },

            CallExpression: {
                arguments: 1,
            },

            ArrayExpression: 1,
            ObjectExpression: 1,
            ImportDeclaration: 1,
            flatTernaryExpressions: false,
            ignoreComments: false,

            ignoredNodes: [
                "TemplateLiteral *",
                "TSTypeParameterInstantiation",
                "FunctionExpression > .params[decorators.length > 0]",
                "FunctionExpression > .params > :matches(Decorator, :not(:first-child))",
                "ClassBody.body > PropertyDefinition[decorators.length > 0] > .key",
            ],
        }],

        "operator-linebreak": ["error", "after", {
            overrides: {
                "?": "before",
                ":": "before",
            },
        }],

        "import/order": ["error", {
            groups: [
                "builtin",
                "external",
                "internal",
                ["parent", "sibling", "index"],
                "object",
                "unknown",
                "type",
            ],

            "newlines-between": "always",
            warnOnUnassignedImports: true,

            alphabetize: {
                order: "asc",
                caseInsensitive: true,
            },
        }],

        "@typescript-eslint/prefer-string-starts-ends-with": "off",
        "@typescript-eslint/no-dynamic-delete": "off",
        "@typescript-eslint/no-non-null-assertion": "off",
        "@typescript-eslint/consistent-type-definitions": "off",
        "no-throw-literal": "off",
        "no-unused-labels": "off",
        "require-jsdoc": "off",
        "valid-jsdoc": "off",
        "require-await": "error",
    },
}];