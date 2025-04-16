import { cac } from "cac";
import { version } from "../package.json";
import { scanAll } from "./commands/scan/scanAll.action";
import { addScanFilters } from "./commands/scan/params";

const cli = cac("wisemark");

cli
	.command("scan", "Scan the project for comments")
	.alias("s")
	.action(async (o) => scanAll(o));
addScanFilters(cli.commands[0]);

// cli.command("list").action(async (options: CLIOptions) => {

cli.help();
cli.version(version, "Wisemark version");
cli.usage("wisemark [options] [command]");

cli.example("wisemark scan --type todo --severity low");
cli.parse();
