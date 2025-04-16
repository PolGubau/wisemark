import type { Command } from "cac";

export function addScanFilters(command: Command) {
	command
		.option("--type <type>", "Filtra por tipo (@todo, @note...)")

		.option("--severity <severity>", "Filtra por severidad (low, medium, high)")
		.option("--json", "Devuelve la salida en formato JSON")
		.option(
			"--tags <tags>",
			"Filtra por tags separados por coma (bug,refactor)",
		)
		.option("--cwd <path>", "Path base para escanear", {
			default: process.cwd(),
		});
}
