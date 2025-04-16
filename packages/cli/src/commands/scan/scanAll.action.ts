import type { CLIScanOptions } from "../../types";
import { filterComments } from "../../utils/filter";
import { printResults } from "../../utils/printer";
import { scanProject } from "../../utils/scan-all";
import { validateParams } from "./validate";

export async function scanAll(options: CLIScanOptions) {
	validateParams(options);
	const initTime = Date.now();
	const comments = await scanProject(options.cwd);
	const filtered = filterComments(comments, options);

	const time = Date.now() - initTime;

	if (options.json) {
		// delete the fields that are undefined
		const parsedMessages = filtered.map((comment) => {
			return Object.fromEntries(
				Object.entries(comment).filter(([_, value]) => value !== undefined),
			);
		});

		const res = {
			comments: parsedMessages,
			metadata: {
				time: {
					seconds: time / 1000,
					milliseconds: time,
				},
			},
		};
		console.log(res);
	} else {
		printResults(filtered, time);
	}
}
