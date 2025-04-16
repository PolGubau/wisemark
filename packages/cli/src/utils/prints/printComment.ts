import type { Comment } from "@wisemark/core";
import pc from "picocolors";

export const printComment = (c: Comment, color: (c: string) => string) => {
	// days to due date
	const dueDate = c.due ? new Date(c.due) : null;
	const today = new Date();

	const daysToDueDate = dueDate
		? Math.ceil((dueDate.getTime() - today.getTime()) / (1000 * 3600 * 24))
		: null;
	const dueDateString = dueDate
		? `Due: ${dueDate.toLocaleDateString()}`
		: "No due date";

	console.log(
		`${color(`[${c.type.toUpperCase()}]`)} ${pc.bold(c.message)}\n  ↪ ${pc.gray(c.filePath)}:${pc.yellow(c.line.toString())}${c.id ? ` ${pc.magenta(`#${c.id}`)}` : ""}${c.severity ? ` ${pc.red(`(${c.severity})`)}` : ""}${c.tags?.length ? ` ${pc.gray(`[${c.tags.join(", ")}]`)}` : ""}\n  ${dueDateString} (${daysToDueDate !== null ? `${daysToDueDate} days left` : "No due date"})`,
	);
};
