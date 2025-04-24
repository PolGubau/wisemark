import { printResults } from "../../utils/printer";
 import { validateParams } from "./validate";
import { listAndFilter, type ScanFlags } from "@wisemark/core";
 

export async function scanAll(options: ScanFlags) {
	validateParams(options);

	const { comments, metadata } = await listAndFilter(options);

// @note test

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
		console.log(JSON.stringify(res, null, 2));
	} else {
		printResults(comments, metadata.time.milliseconds, {
			table: options.table,
		});
	}
}
