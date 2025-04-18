import type { Comment, LintOptions, Metadata } from "../types";
import { listAndFilter } from "./listAndFilter";

export const divideByDate = (date: Date, comments: Comment[]) => {
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


type Response = {
	passed: Comment[];
	future: Comment[];
	metadata: Metadata & {
		passedCount: number;
		futureCount: number;
		hasFuture: boolean;
		hasPassed: boolean;
	};
}

/**
 * Lists all comments with a due date and divides them into passed and future based on the current date.
 *
 * @param options - The options for the linting process.
 * @returns An object containing the passed and future comments, along with metadata about the scan.
 */
export async function listAndDivideByDue(options: LintOptions): Promise<Response> {
	const today = new Date();
	const { comments, metadata: scanMetadata } = await listAndFilter({
		...options,
		hasDueDate: true,
	});

	const [passed, future] = divideByDate(today, comments);

  const metadata = {
    ...scanMetadata,
    passedCount: passed.length,
    futureCount: future.length,
    hasFuture: future.length > 0,
    hasPassed: passed.length > 0,
    totalCount: passed.length + future.length,
  };

  return {
    passed,
    future,
    metadata,
  };
}