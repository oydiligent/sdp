import { defineConfig, loadEnv } from "vite";
import { resolve } from "path";
import vue from "@vitejs/plugin-vue";
import eslint from "vite-plugin-eslint";
import vueJsx from "@vitejs/plugin-vue-jsx";
import legacy from "@vitejs/plugin-legacy";
import Inspect from "vite-plugin-inspect";
import viteCompression from "vite-plugin-compression";
import WindiCSS from "vite-plugin-windicss";
import {
	createSvgIconsPlugin,
	type ViteSvgIconsPlugin,
} from "vite-plugin-svg-icons";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import AutoImport from "unplugin-auto-import/vite";
import { type Options } from "unplugin-auto-import/types";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
	const defaultPlugins = [
		vue(),
		eslint(),
		WindiCSS(),
		vueJsx(),
		legacy(),
		Inspect(),
	];
	const { VITE_APP_BASE_URL } = loadEnv(mode, "./env");

	// icon配置
	const createSvgIconsPluginConfig: ViteSvgIconsPlugin = {
		iconDirs: [resolve(process.cwd(), "src/assets/icon")],
		symbolId: "icon-[name]",
		inject: "body-first",
		customDomId: "__svg__icons__dom__",
	};

	// 自动导入 import xx from xx
	const AutoImportConfig: Options = {
		imports: ["vue", "vue-router", "pinia"],
		dts: "types/auto-imports.d.ts",
		// 注意，一旦生成配置文件之后，最好把enable关掉，即改成false。否则这个文件每次会在重新加载的时候重新生成，
		// 这会导致eslint有时会找不到这个文件。当需要更新配置文件的时候，再重新打开。
		eslintrc: {
			enabled: true,
			filepath: "./types/.eslintrc-auto-import.json",
		},
		resolvers: [
			ElementPlusResolver({
				importStyle: "sass",
			}),
		],
	};

	const ComponentsConfig = {
		dirs: ["src/components"],
		extensions: ["vue"],
		types: [],
		// 配置文件生成位置
		dts: "types/components.d.ts",
		resolvers: [
			ElementPlusResolver({
				importStyle: "sass",
			}),
		],
	};

	const plugins = [
		...defaultPlugins,
		createSvgIconsPlugin(createSvgIconsPluginConfig),
		AutoImport(AutoImportConfig),
		Components(ComponentsConfig),
		viteCompression({
			algorithm: "gzip",
			threshold: 1024 * 200, // 对大于 200k 的文件进行压缩
			disable: mode !== "prod",
			ext: ".gz",
			deleteOriginFile: true, // 源文件压缩后是否删除
		}), // 打包压缩,默认gzip
	];

	const timestamp = new Date().getTime();
	return {
		base: "/",
		envDir: "./env",
		plugins,
		resolve: {
			alias: [
				{ find: "@", replacement: resolve(__dirname, "./src") },
				{ find: "~", replacement: resolve(__dirname, "./types") },
			],
		},
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: `@use "@/styles/element.scss" as *;`,
				},
			},
		},
		server: {
			headers: {
				"Access-Control-Allow-Origin": "*", // NOSONAR
			},
			open: false,
			host: "localhost",
			port: 8001,
			proxy: {
				"/api": {
					target: VITE_APP_BASE_URL,
					changeOrigin: true,
					pathRewrite: {
						"^/api/": "/api/",
					},
				},
			},
		},
		build: {
			minify: "terser",
			reportCompressedSize: false,
			chunkSizeWarningLimit: 1200,
			outDir: "./dist",
			assetsDir: "static/img/",
			terserOptions: {
				compress: {
					// warnings: false,
					drop_console: mode === "prod", // 打包时删除console
					drop_debugger: mode === "prod", // 打包时删除 debugger
					pure_funcs: mode === "prod" ? ["console.log"] : [],
				},
				output: {
					comments: true, // 去掉注释内容
				},
			},
			rollupOptions: {
				output: {
					chunkFileNames: `static/js/[name]-[hash]-${timestamp}.js`,
					entryFileNames: `static/js/[name]-[hash]-${timestamp}.js`,
					assetFileNames: "static/[ext]/[name]-[hash].[ext]",
				},
			},
		},
	};
});
