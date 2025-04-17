import type { Command } from "cac";

export function addScanFilters(command: Command) {
	command
		.option("--type <type>", "Filter by type (todo, note, fixme)")
		.option("--path <path>", "Inner path of the project to scan", {
			default: ".",
		})
		.option("--severity <severity>", "Filter by severity (low, medium, high)")
		.option("--json", "Return output in JSON format")
		.option("--table", "Return output in table format")
		.option("--showDate", "Show the date of the comment")
		.option("--withDueDate", "Return only comments with a due date")
		.option("--due <date>", "Filter by due date (YYYY-MM-DD)")
		.option("--tags <tags>", "Filter by tags (comma separated)")
		.option("--cwd <path>", "Path to the project", {
			default: process.cwd(),
		});
}
