import fg from "fast-glob";
import { readFile } from "node:fs/promises";
import { scanFile } from "./scanFile";
import type { Comment } from "@wisemark/core";

const extensions = ["ts", "tsx", "js", "jsx", "mjs", "cjs"];

export async function scanProject(basePath: string): Promise<Comment[]> {
	const files = await fg(`**/*.{${extensions.join(",")}}`, {
		cwd: basePath,
		ignore: ["node_modules", "dist", "build", "**/*.d.ts"],
		absolute: true,
	});

	const allComments = await Promise.all(
		files.map(async (file) => {
			const content = await readFile(file, "utf-8");
			return scanFile(content, file);
		}),
	);

	return allComments.flat();
}
