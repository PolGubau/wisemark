import type { Comment } from "@wisemark/core";
import type { CLIScanOptions } from "../../types";

export function filterComments(
	comments: Comment[],
	options: CLIScanOptions,
): Comment[] {
	const tagSet = options.tags?.split(",") ?? null;

	return comments.filter((c) => {
		if (options.type && c.type !== options.type) return false;
		if (options.severity && c.severity !== options.severity) return false;
		if (tagSet && !c.tags?.some((tag) => tagSet.includes(tag))) return false;
		return true;
	});
}
