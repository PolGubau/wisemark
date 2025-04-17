import { severities, types } from "@wisemark/core";
import type { CLIScanOptions } from "./types";
import fs from "node:fs";
import pc from "picocolors";

export function validateParams(options: CLIScanOptions) {
	let shouldExit = false;

	// if table and json are true, warn (the table will be ignored)
	if (options.json && options.table) {
		console.warn(
			`\n ⚠️ ${pc.yellow("Warning:")} ${pc.bold(
				`The ${pc.cyan("--table")} option will be ignored because ${pc.cyan("--json")} is also set.`,
			)}\n`,
		);
	}


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
				console.error(
					`\n${pc.red("🔴 Error:")} ${pc.bold(`Invalid tag "${pc.red(tag)}"`)}\n` +
					`${pc.dim("→")} Tags cannot be empty.\n` +
					`${pc.dim("→")} Use ${pc.cyan("--tags")} to specify valid tags.\n`,
				);
				process.exit(1);
			}
		}
	}

	// Validate 'cwd' (si existe la ruta)
	if (!fs.existsSync(options.cwd)) {
		console.error(
			`\n${pc.red("🔴 Error:")} The directory ${pc.bold(pc.yellow(options.cwd))} does not exist.\n` +
			`${pc.dim("→")} Use ${pc.cyan("--cwd")} to specify a valid path.\n`,
		);
		shouldExit = true;
	}
	// Validate 'path' (si existe la ruta)
	if (!fs.existsSync(options.path)) {
		console.error(
			`\n${pc.red("🔴 Error:")} The path ${pc.bold(pc.yellow(options.path))} does not exist.\n` +
			`${pc.dim("→")} Use ${pc.cyan("--path")} to specify a valid path.\n`,
		);
		shouldExit = true;
	}

	// if shouldExit is true, exit the process
	if (shouldExit) {
		process.exit(1);
	}
}
