import { type Comment, type Severity, type Type, typesRegex } from "../types";

const extractField = (raw: string, key: string): string | undefined => {
	const match = RegExp(new RegExp(`${key}:([^\\s]+)`)).exec(raw);
	return match?.[1];
};

const extractTags = (raw: string): string[] =>
	extractField(raw, "tags")?.split(",") ?? [];

/**
 * Scans the provided file content for comments matching specific patterns and extracts structured comment data.
 *
 * @param content - The content of the file to scan.
 * @param path - The path of the file being scanned. Defaults to "unknown".
 * @returns An array of `Comment` objects representing the extracted comments.
 *
 * @remarks
 * This function splits the file content into lines and applies a set of regular expressions (defined in `typesRegex`)
 * to each line to identify and extract comments. For each matched comment, it parses metadata such as `id`, `severity`,
 * `tags`, `author`, and `due` using helper functions. The extracted comments are returned as an array of `Comment` objects.
 */
export function scanFile(content: string, path = "unknown"): Comment[] {
	const lines = content.split("\n");
	const comments: Comment[] = [];

	lines.forEach((line, index) => {
		for (const [type, regex] of Object.entries(typesRegex) as [
			Type,
			RegExp,
		][]) {
			const match = RegExp(regex).exec(line);
			if (!match) continue;

			const raw = match[1] ?? "";

			const [messagePart, metaPart] = raw.includes("--")
				? raw.split("--", 2).map((s) => s.trim())
				: ["", raw.trim()];

			const message =
				messagePart || metaPart.replace(/@[a-z]+:[^\s]+/g, "").trim();

			comments.push({
				id: extractField(metaPart, "id") ?? `line-${index + 1}`,
				severity: extractField(metaPart, "severity") as Severity,
				tags: extractTags(metaPart),
				author: extractField(metaPart, "author"),
				due: extractField(metaPart, "due"),
				message: message.trim(),
				path,
				type,
				line: index + 1,
			});
		}
	});

	return comments;
}
