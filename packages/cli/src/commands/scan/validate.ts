import { severities, types } from "@wisemark/core";
import type { CLIScanOptions } from "../../types";
import fs from "node:fs";
import pc from "picocolors";

export function validateParams(options: CLIScanOptions) {
	let shouldExit = false;
	// Validating 'type'
	if (options.type && !types.includes(options.type)) {
		console.error(
			`\n${pc.red("🔴 Error:")} ${pc.bold(`Invalid type "${pc.red(options.type)}"`)}\n` +
				`${pc.dim("→")} Valid types are: ${pc.cyan(types.join(", "))}\n`,
		);
		shouldExit = true;
	}
	if (options.severity && !severities.includes(options.severity)) {
		console.error(
			`\n${pc.red("🔴 Error:")} ${pc.bold(`Invalid severity "${pc.red(options.severity)}"`)}\n` +
				`${pc.dim("→")} Valid severities are: ${pc.cyan(severities.join(", "))}\n`,
		);
		shouldExit = true;
	}

	// Validar 'tags'
	if (options.tags) {
		const tags = options.tags.split(",");
		for (const tag of tags) {
			if (tag.trim().length === 0) {
				console.error("Error: Las etiquetas no pueden estar vacías.");
				process.exit(1);
			}
		}
	}

	// Validar 'cwd' (si existe la ruta)
	if (!fs.existsSync(options.cwd)) {
		console.error(`Error: El directorio ${options.cwd} no existe.`);
		process.exit(1);
	}

	// if shouldExit is true, exit the process
	if (shouldExit) {
		process.exit(1);
	}
}
