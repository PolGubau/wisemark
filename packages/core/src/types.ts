export const types = ["todo", "fixme", "note", "question"] as const;
export type Type = (typeof types)[number];

export const severities = ["low", "medium", "high"] as const;
export type Severity = (typeof severities)[number];

 

export type Comment = {
	id: string;
	message: string;
	path: string;
	type: Type;
	line: number;
	severity?: Severity;
	tags?: string[];
	author?: string;
	due?: string;
};

export const typesRegex: Record<Type, RegExp> = {
	note: /@note\s+(.+)/,
	todo: /@todo\s+(.+)/,
	fixme: /@fixme\s+(.+)/,
	question: /@question\s+(.+)/,
};

export type Metadata = {
	hasComments: boolean;
	total: number;
	time: {
		seconds: number;
		milliseconds: number;
	};
	project: {
		path: string;
		cwd: string;
		fullPath: string;
	};
		stats: {
			tagsFrequency: Record<string, number>;
			commentsPerFile: Record<string, number>;
		};
	
};
export type MetadataAfterFilters = Metadata & {
		totalBeforeFilters: number;
		filteredOut: number;
	}
	

export type ScanFlags = {
	type?: Type;
	severity?: Severity;
	json?: boolean;
	due?: string;
	hasDueDate?: boolean;
	cwd: string;
	path: string;
	tags?: string; table?: boolean;
	showDate?: boolean;
};

export type FilterOptions = Pick<ScanFlags, "type" | "severity" | "due" | "hasDueDate" | "tags">;

export type LintOptions = Omit<ScanFlags, "hasDueDate">;
export type ScanProjectOptions = {
	extensions?: string[];
	ignore?: string[];
};