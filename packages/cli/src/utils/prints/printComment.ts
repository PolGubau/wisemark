import type { Comment } from "@wisemark/core";
import pc from "picocolors";


type Options = {
	showDate: boolean;
};
export const printComment = (c: Comment, color: (c: string) => string, options?: Options) => {
	// days to due date
	const dueDate = c.due ? new Date(c.due) : null;
	const today = new Date();

	const daysToDueDate = dueDate
		? Math.ceil((dueDate.getTime() - today.getTime()) / (1000 * 3600 * 24))
		: null;


	const type = color(`[${c.type.toUpperCase()}]`)
	const message = pc.bold(c.message.trim());
	const path = c.path ? pc.gray(c.path) : pc.gray("File not found");
	const line = pc.yellow(c.line.toString());
	const id = c.id ? pc.magenta(`#${c.id}`) : '';
	const severity = c.severity ? pc.red(`(${c.severity})`) : '';
	const tags = c.tags?.length ? ` ${pc.gray(`[${c.tags.join(", ")}]`)}` : "";
	const dueDateString = dueDate ? `Due: ${dueDate.toLocaleDateString()}` : "";
	const daysRemaining = daysToDueDate !== null ? `${daysToDueDate} days left ` : "";
	const daysLeft = daysToDueDate !== null ? (daysToDueDate < 0 ? pc.red("Overdue") : pc.green("On time")) : pc.gray("No due date");

	const dateInfo = options?.showDate ? ` ${dueDateString} (${daysRemaining} - ${daysLeft})` : "";


	console.log(
		`${type} ${message}\n ↪ ${path}:${line}${c.id ? ` ${id}` : ""}${severity} ${tags}\n ${dateInfo}`,
	);
};
