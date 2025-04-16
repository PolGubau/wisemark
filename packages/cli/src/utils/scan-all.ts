import fg from "fast-glob";
import { readFile } from "node:fs/promises";
import { parseComments, type Comment } from "@wisemark/core";

const extensions = ["ts", "tsx", "js", "jsx", "mjs", "cjs"];

export async function scanProject(basePath: string): Promise<Comment[]> {
	const files = await fg(`**/*.{${extensions.join(",")}}`, {
		cwd: basePath,
		ignore: ["node_modules", "dist", "build", "**/*.d.ts"],
		absolute: true,
	});
	//  @note test
	const results: Comment[] = [];

	await Promise.all(
		files.map(async (file) => {
			const content = await readFile(file, "utf-8");
			//  @fixme change that to a function that will parse the content and return the comments -- severity:low
			const comments = parseComments(content, file);
			//  @question Should I use the file name as the id? -- severity:low tags:help
			results.push(...comments);
		}),
	);

	return results;
}
