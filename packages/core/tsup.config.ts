import { defineConfig } from "tsup";

export default defineConfig([
	{
		entry: ["src/index.ts"],
		format: ["esm"],
		outDir: "dist/esm",
		outExtension: () => ({ js: ".mjs" }),
		sourcemap: true,
		dts: {
			entry: "src/index.ts",
			resolve: true,
		},
		clean: true,
		splitting: false,
	},
	{
		entry: ["src/index.ts"],
		format: ["cjs"],
		outDir: "dist",
		outExtension: () => ({ js: ".cjs" }),
		sourcemap: true,
		clean: false,
		splitting: false,
	},
]);
