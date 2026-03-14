import eslint from "@eslint/js"
import tseslint from "@typescript-eslint/eslint-plugin"
import tsparser from "@typescript-eslint/parser"
import astroParser from "astro-eslint-parser"
import prettier from "eslint-config-prettier"
import astro from "eslint-plugin-astro"
import jsxA11y from "eslint-plugin-jsx-a11y"

export default [
	eslint.configs.recommended,
	{
		files: ["**/*.{js,jsx,ts,tsx}"],
		languageOptions: {
			parser: tsparser,
			parserOptions: {
				ecmaVersion: "latest",
				sourceType: "module",
				ecmaFeatures: {
					jsx: true,
				},
			},
			globals: {
				console: "readonly",
				process: "readonly",
			},
		},
		plugins: {
			"@typescript-eslint": tseslint,
			"jsx-a11y": jsxA11y,
		},
		rules: {
			...tseslint.configs.recommended.rules,
		},
	},
	{
		files: ["**/*.astro"],
		languageOptions: {
			parser: astroParser,
			parserOptions: {
				parser: tsparser,
				extraFileExtensions: [".astro"],
			},
			globals: {
				console: "readonly",
				process: "readonly",
				URL: "readonly",
			},
		},
		plugins: {
			astro,
		},
		rules: {
			...astro.configs.recommended.rules,
			"astro/no-set-html-directive": "off",
		},
	},
	{
		ignores: ["dist/**", ".astro/**", "node_modules/**"],
	},
	prettier,
]
