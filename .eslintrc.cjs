module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true,
	},
	extends: [
		"standard-with-typescript",
		"plugin:vue/vue3-essential",
		"plugin:prettier/recommended",
	],
	overrides: [
		{
			env: {
				node: true,
			},
			files: [".eslintrc.{js,cjs}"],
			parserOptions: {
				sourceType: "script",
			},
		},
	],
	parser: "vue-eslint-parser",
	parserOptions: {
		project: ["./tsconfig.json", "./tsconfig.node.json"],
		ecmaVersion: "latest",
		parser: "@typescript-eslint/parser",
		sourceType: "module",
		extraFileExtensions: [".vue"],
	},
	plugins: ["vue"],
	// plugins: ["vue", "@typescript-eslint"],
	rules: {
		"@typescript-eslint/restrict-template-expressions": "off",
		"vue/multi-word-component-names": "off", // vue组件模板名称
		"@typescript-eslint/strict-boolean-expressions": 0,
	},
};
