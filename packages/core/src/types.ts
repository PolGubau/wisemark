export type Type = "todo" | "fixme" | "note" | "question";
export type Severity = "low" | "medium" | "high";

export type Comment = {
	id: string;
	message: string;
	filePath: string;
	type: Type;
	line: number;
	severity?: Severity;
	tags?: string[];
	author?: string;
	due?: string;
	status?: "open" | "closed" | "in-progress";
	created?: string;
	related?: string;
	context?: string;
};

export const typesRegex: Record<Type, RegExp> = {
	note: /@note\s+(.+)/,
	todo: /@todo\s+(.+)/,
	fixme: /@fixme\s+(.+)/,
	question: /@question\s+(.+)/,
};
