 import { type Options, defineConfig } from "tsup";

// Inspired by https://github.com/immerjs/immer/pull/1032/files
export default defineConfig((options) => {
	const commonOptions: Partial<Options> = {
		entry: [
			"src/index.ts",
		],
		platform: "node",
		target: "node22",
		splitting: false,
		bundle: false,
		sourcemap: true,
		clean: true,
		...options,
	};
 
	return [
		{
			...commonOptions,
			format: ["esm"],
			clean: true,
			outDir: "./dist/esm/",
			outExtension: () => ({ js: ".mjs" }),
			bundle: true,
			dts: {
				compilerOptions: {
					resolveJsonModule: false,
					outDir: "./dist",
				},
			},
		},		
		// CJS
		{
			...commonOptions,
			clean: true,
			format: ["cjs"],
			outExtension: () => ({ js: ".cjs" }),
			outDir: "./dist/",
		},
	];
});
