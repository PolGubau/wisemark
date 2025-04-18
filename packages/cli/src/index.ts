import { cac } from "cac";
import { version } from "../package.json";
import { scanAll } from "./commands/scan/scanAll.action";
import { addScanFilters } from "./commands/scan/params";
import { lint } from "./commands/lint/lint.action";

const cli = cac("wisemark");

cli
	.command("", "Scan the project for comments")
	.alias("s")
	.action(async (o) => scanAll(o));
addScanFilters(cli.commands[0]);

cli
	.command("lint", "Lints and checks for comments with a passed due date")
	.alias("l")
	.action(async (o) => lint(o));
addScanFilters(cli.commands[1]);

cli.help();
cli.version(version, "Wisemark version");
cli.usage("wisemark [options] [command]");

cli.example("wisemark scan --type todo --severity low");
cli.parse();
