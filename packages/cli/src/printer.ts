import type { Comment, Type } from "@wisemark/core";
import pc from "picocolors";

const typeColor: Record<Type, (x: string) => string> = {
	note: pc.blue,
	todo: pc.yellow,
	fixme: pc.red,
	question: pc.cyan,
};

export function printResults(comments: Comment[]) {
	if (comments.length === 0) {
		console.log(pc.green("✅ No wisemark comments found"));
		return;
	}

	for (const c of comments) {
		const color = typeColor[c.type] ?? ((x: string) => x);
		console.log(
			`${color(`[${c.type.toUpperCase()}]`)} ${pc.bold(c.message)}\n  ↪ ${pc.gray(c.filePath)}:${pc.yellow(c.line.toString())}${c.id ? ` ${pc.magenta(`#${c.id}`)}` : ""}${c.severity ? ` ${pc.red(`(${c.severity})`)}` : ""}${c.tags?.length ? ` ${pc.gray(`[${c.tags.join(", ")}]`)}` : ""}`,
		);
	}
}
