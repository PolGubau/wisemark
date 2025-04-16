import type { CLIScanOptions } from "../scan/types";

export type CLILintOptions = Omit<CLIScanOptions, "withDueDate">;
