import type { Severity, Type } from "@wisemark/core";

export type CLIScanOptions = {
	type?: Type;
	severity?: Severity;
	json?: boolean;
	cwd: string;
	path?: string;
	tags?: string;
};
