import type { Comment, FilterOptions } from "../types";

export function filterComments(
	comments: Comment[],
	options: FilterOptions,
): Comment[] {
	const tagSet = options.tags?.split(",") ?? null;

	return comments.filter((c) => {
		if (options.hasDueDate && !c.due) return false;
		if (options.due && c.due !== options.due) return false;
		if (options.type && c.type !== options.type) return false;
		if (options.severity && c.severity !== options.severity) return false;
		if (tagSet && !c.tags?.some((tag) => tagSet.includes(tag))) return false;
		return true;
	});
}
