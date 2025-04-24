// src/utils/scanProject.ts
import { readdir, readFile } from "node:fs/promises";
import { join, extname } from "node:path";
import { scanFile } from "./scanFile";
import type { Comment, ScanProjectOptions } from "../types";

const defaultExtensions = ["ts", "tsx", "js", "jsx", "mjs", "cjs"];
const defaultIgnore = ["node_modules", "dist", "build"];
const defaultOptions: ScanProjectOptions = {
	extensions: defaultExtensions,
	ignore: defaultIgnore,
};

/**
 * Recursively reads directory and returns files matching the extensions and not ignored.
 */
async function getFiles(
	dir: string,
	extensions: string[],
	ignore: string[],
): Promise<string[]> {
	const entries = await readdir(dir, { withFileTypes: true });

	const files: string[] = [];

	for (const entry of entries) {
		const fullPath = join(dir, entry.name);
		if (ignore.some((pattern) => fullPath.includes(pattern))) continue;

		if (entry.isDirectory()) {
			files.push(...(await getFiles(fullPath, extensions, ignore)));
		} else if (extensions.includes(extname(entry.name).slice(1))) {
			files.push(fullPath);
		}
	}

	return files;
}

/**
 * Scans a project directory for comments in files with specified extensions.
 *
 * @param basePath - The root directory path to scan
 * @param options - Configuration options for the scan
 * @returns A Promise that resolves to an array of Comment objects found in the project
 */
export async function scanProject(
	basePath: string,
	options: ScanProjectOptions = defaultOptions,
): Promise<Comment[]> {
	const extensionsToSearch = options.extensions ?? defaultExtensions;
	const ignorePatterns = options.ignore ?? defaultIgnore;

	const files = await getFiles(basePath, extensionsToSearch, ignorePatterns);

	const allComments = await Promise.all(
		files.map(async (file) => {
			const content = await readFile(file, "utf-8");
			return scanFile(content, file);
		}),
	);

	return allComments.flat();
}
