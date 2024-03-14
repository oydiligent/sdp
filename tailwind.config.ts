import { defineConfig } from "windicss/helpers";
import colors from "windicss/colors";
import formsPlugin from "windicss/plugin/forms";

export default defineConfig({
	darkMode: "class",
	safelist: "p-3 p-4 p-5",
	theme: {
		extend: {
			colors: {
				...colors,
				dark: "#000",
			},
			backgroundColor: {
				...colors,
				login: "#2d3a4b",
			},
		},
	},
	plugins: [formsPlugin],
});
