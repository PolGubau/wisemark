import { cac } from "cac";
import { scanProject } from "./scan";
import { printResults } from "./printer";
import type { wisemarkComment } from "@wisemark/core";

const cli = cac("wisemark");

cli
	.option("--type <type>", "Filtra por tipo (@todo, @note...)")
	.option("--severity <severity>", "Filtra por severidad (low, medium, high)")
	.option("--json", "Devuelve la salida en formato JSON")
	.option("--tags <tags>", "Filtra por tags separados por coma (bug,refactor)")
	.option("--cwd <path>", "Path base para escanear", {
		default: process.cwd(),
	});

cli.help();
type CLIOptions = {
	type?: string;
	severity?: "low" | "medium" | "high";
	json?: boolean;
	cwd: string;
};

cli.command("").action(async (options: CLIOptions) => {
	const comments = await scanProject(options.cwd);
	const filtered = applyFilters(comments, options);

	if (options.json) {
		console.log(JSON.stringify(filtered, null, 2));
	} else {
		printResults(filtered);
	}
});

cli.parse();

function applyFilters(
	comments: wisemarkComment[],
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	options: any,
): wisemarkComment[] {
	return comments.filter((c) => {
		if (options.type && c.type !== options.type) return false;
		if (options.severity && c.severity !== options.severity) return false;
		if (options.tags) {
			const tags = options.tags.split(",");
			if (!c.tags?.some((t: string) => tags.includes(t))) return false;
		}
		return true;
	});
}
