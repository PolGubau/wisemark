import fg from "fast-glob";
import { readFile } from "node:fs/promises";
import { scanFile } from "./scanFile";
import type { Comment, ScanProjectOptions } from "../types";
 
const defaultExtensions = ["ts", "tsx", "js", "jsx", "mjs", "cjs"];
const defaultIgnore = ["node_modules", "dist", "build", "**/*.d.ts"];


const defaultOptions: ScanProjectOptions = {
	extensions:  defaultExtensions,
	ignore: defaultIgnore,
};


/**
 * Scans a project directory for comments in files with specified extensions.
 * 
 * @param basePath - The root directory path to scan
 * @param options - Configuration options for the scan
 * @param options.extensions - File extensions to include in the scan
 * @param options.ignore - Patterns to ignore during scanning
 * @returns A Promise that resolves to an array of Comment objects found in the project
 * 
 * @example
 * ```ts
 * const comments = await scanProject('./src', { 
 *   extensions: ['ts', 'js'], 
 *   ignore: ['node_modules/**'] 
 * });
 * ```
 */
export async function scanProject(basePath: string, options: ScanProjectOptions = defaultOptions): Promise<Comment[]> {

const extensionsToSearch = options.extensions ?? defaultExtensions;
	const ignorePatterns = options.ignore ?? defaultIgnore; 

 	const files = await fg(`**/*.{${extensionsToSearch.join(",")}}`, {
		cwd: basePath,
		ignore: ignorePatterns,
		absolute: true,
	});

	const allComments = await Promise.all(
		files.map(async (file) => {
			const content = await readFile(file, "utf-8");
			return scanFile(content, file);
		}),
	);

	return allComments.flat();
}
