import type { CLIScanOptions, PrintOptions } from "./types";
import { filterComments } from "./filter";
import { printResults } from "../../utils/printer";
import { scanProject } from "../../utils/scan-all";
import { validateParams } from "./validate";

const buildPath = (path: string, cwd: string) => {
	const pathWithoutFirstSlash = path.startsWith("/") ? path.slice(1) : path;
	const cwdWithoutLastSlash = cwd.endsWith("/") ? cwd.slice(0, -1) : cwd;

	return `${cwdWithoutLastSlash}/${pathWithoutFirstSlash}`;
};

export const listAndFilter = async (options: CLIScanOptions) => {
	const initTime = Date.now();

	const fullPath = buildPath(options.path, options.cwd);
	const comments = await scanProject(fullPath);
	const filtered = filterComments(comments, options);

	const time = Date.now() - initTime;

	return {
		comments: filtered,
		metadata: {
			time: {
				seconds: time / 1000,
				milliseconds: time,
			},
		},
	};
};

export async function scanAll(options: CLIScanOptions & PrintOptions) {
	validateParams(options);

	const { comments, metadata } = await listAndFilter(options);

	if (options.json && options.table) {
		console.error("You can't use --json and --table at the same time.");
		process.exit(1);
	}

	if (options.json) {
		// delete the fields that are undefined
		const parsedMessages: Partial<Comment>[] = comments.map((comment) => {
			return Object.fromEntries(
				Object.entries(comment).filter(([_, value]) => value !== undefined),
			);
		});
		const res = {
			comments: parsedMessages,
			metadata,
		};
		console.log(res);
	} else {
		printResults(comments, metadata.time.milliseconds);
	}
}
