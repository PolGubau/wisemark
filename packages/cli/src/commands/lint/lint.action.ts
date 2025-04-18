// action that lists all comments with a due date and triggers a error if the date is today or in the past

import { type LintOptions, listAndDivideByDue } from "@wisemark/core";
 import { printResults } from "../../utils/printer";

 

export async function lint(options: LintOptions) {
 

	const {passed, future, metadata} = await listAndDivideByDue(options);

	const {passedCount, futureCount, time:{milliseconds}} = metadata;
 
	// If some comments are passed, trigger an error
	if (passedCount > 0) {
		console.error(`Found ${passedCount} comments with a due date in the past:`);

		printResults(passed, milliseconds);
		process.exit(1);
	} else {
		console.log(`Found ${futureCount} comments with a future due date:`);
		printResults(future, milliseconds);
	}
}
