import { defineConfig } from "tsup";

export default defineConfig({
	entry: ["bin.ts"],
	outDir: "dist",
	format: ["esm"],
	target: "node18",
	splitting: false,
	shims: false,
	clean: true,
	dts: false,
	minify: false,
	sourcemap: true,
	bundle: true,
	platform: "node",
	banner: {
		js: "#!/usr/bin/env node",
	},
});
