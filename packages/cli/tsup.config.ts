import { defineConfig } from "tsup";

export default defineConfig({
	// entry: ["bin.ts"],
	entry: ["src/index.ts"],
	outDir: "dist",
	format: ["esm", "cjs"],
	target: "node18",
	splitting: false,
	shims: false,
	clean: true,
	minify: false,
	sourcemap: true,
	bundle: true,
	platform: "node",
	dts: true,
	banner: {
		js: "#!/usr/bin/env node",
	},
});
