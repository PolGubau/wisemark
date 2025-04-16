// action that lists all comments with a due date and triggers a error if the date is today or in the past

import type { Comment } from "@wisemark/core";
import { listAndFilter } from "../scan/scanAll.action";
import type { CLILintOptions } from "./types";
import { printResults } from "../../utils/printer";

const divideByDate = (date: Date, comments: Comment[]) => {
	const passed: Comment[] = [];
	const future: Comment[] = [];

	for (const comment of comments) {
		if (comment.due) {
			const dueDate = new Date(comment.due);

			// today or the future
			if (dueDate >= date) {
				future.push(comment);
			} else {
				passed.push(comment);
			}
		}
	}

	return [passed, future];
};

export async function lint(options: CLILintOptions) {
	const today = new Date();
	const { comments, metadata } = await listAndFilter({
		...options,
		withDueDate: true,
	});

	const [passed, future] = divideByDate(today, comments);

	const passedCount = passed.length;
	const futureCount = future.length;

	const passedTime = metadata.time.milliseconds;

	// If some comments are passed, trigger an error
	if (passedCount > 0) {
		console.error(`Found ${passedCount} comments with a due date in the past:`);

		printResults(passed, passedTime);
		process.exit(1);
	} else {
		console.log(`Found ${futureCount} comments with a future due date:`);
		printResults(future, passedTime);
	}
}
