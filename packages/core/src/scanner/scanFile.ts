import { type Comment, type Severity, type Type, typesRegex } from "./types";
const extractField = (raw: string, key: string): string | undefined => {
	const match = raw.match(new RegExp(`${key}:([^\\s]+)`));
	return match?.[1];
};

const extractTags = (raw: string): string[] =>
	extractField(raw, "tags")?.split(",") ?? [];

export function scanFile(
	fileContent: string,
	filePath = "unknown",
): Comment[] {
	const lines = fileContent.split("\n");
	const comments: Comment[] = [];

	lines.forEach((line, index) => {
		for (const [type, regex] of Object.entries(typesRegex) as [
			Type,
			RegExp,
		][]) {
			const match = line.match(regex);
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
				status: extractField(metaPart, "status") as
					| "open"
					| "closed"
					| "in-progress",
				created: extractField(metaPart, "created"),
				related: extractField(metaPart, "related"),
				context: extractField(metaPart, "context"),
				message: message.trim(),
				filePath,
				type,
				line: index + 1,
			});
		}
	});

	return comments;
}
