import { filterComments } from "../filters/filterComments";
import { scanProject } from "../scanner/scanProject";
import type { Comment, MetadataAfterFilters, ScanFlags, ScanProjectOptions } from "../types";

const buildPath = (path: string, cwd: string) => {
	const pathWithoutFirstSlash = path.startsWith("/") ? path.slice(1) : path;
	const cwdWithoutLastSlash = cwd.endsWith("/") ? cwd.slice(0, -1) : cwd;

	return `${cwdWithoutLastSlash}/${pathWithoutFirstSlash}`;
};

type Response = {
	comments: Comment[];
	metadata: MetadataAfterFilters;
};

const getTagsFrequency = (comments: Comment[]) =>
	comments.reduce<Record<string, number>>((acc, c) => {
		for (const tag of c.tags || []) {
			acc[tag] = (acc[tag] || 0) + 1;
		}
		return acc;
	}, {});

const getCommentsPerFile = (comments: Comment[]) =>
	comments.reduce<Record<string, number>>((acc, c) => {
		acc[c.path] = (acc[c.path] || 0) + 1;
		return acc;
	}, {});

export const listAndFilter = async (
	options: ScanFlags, scanOptions?: ScanProjectOptions 
): Promise<Response> => {
	const initTime = Date.now();

	const fullPath = buildPath(options.path, options.cwd);
	const comments = await scanProject(fullPath, scanOptions);
	const filtered = filterComments(comments, options);

	const time = Date.now() - initTime;

	const metadata: MetadataAfterFilters = {
		hasComments: comments.length > 0,
		total: filtered.length,
		totalBeforeFilters: comments.length,
		filteredOut: comments.length - filtered.length,
		time: {
			seconds: time / 1000,
			milliseconds: time,
		},
		project: {
			path: options.path,
			cwd: options.cwd,
			fullPath,
		},
		stats: {
			tagsFrequency: getTagsFrequency(filtered),
			commentsPerFile: getCommentsPerFile(filtered),
		},
	};

	return {
		comments: filtered,
		metadata,
	};
};
