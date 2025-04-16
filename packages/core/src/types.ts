export const types = ["todo", "fixme", "note", "question"] as const;
export type Type = (typeof types)[number];

export const severities = ["low", "medium", "high"] as const;
export type Severity = (typeof severities)[number];

export const statuses = ["open", "closed", "in-progress"] as const;
export type Status = (typeof statuses)[number];

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
	status?: Status;
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
