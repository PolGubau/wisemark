import type { Comment, Type } from "@wisemark/core";
import pc from "picocolors";
import path from "node:path";

export const typeEmoji: Record<Type, string> = {
	note: "📝",
	todo: "✅",
	fixme: "❌",
	question: "❓",
	refactor: "🔧",
	
};

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


	const type = typeEmoji[c.type];
	const message = pc.bold(c.message.trim());
	const relativePath = path.relative(process.cwd(), c.path);
const displayedPath = relativePath.split(path.sep).slice(-3).join(path.sep);  

	const parsedPath = displayedPath ? pc.gray(displayedPath) : pc.gray("File not found");
	const line = pc.yellow(c.line.toString());
	const severity = c.severity ? pc.red(`(${c.severity})`) : '';
	const tags = c.tags?.length ? ` ${pc.gray(`[${c.tags.join(", ")}]`)}` : "";
	const dueDateString = dueDate ? `Due: ${dueDate.toLocaleDateString()}` : "";
	const daysRemaining = daysToDueDate !== null ? `${daysToDueDate} days left ` : "";
	const daysLeft = daysToDueDate !== null ? (daysToDueDate < 0 ? pc.red("Overdue") : pc.green("On time")) : pc.gray("No due date");

	const dateInfo = options?.showDate ? ` ${dueDateString} (${daysRemaining} - ${daysLeft})` : "";


	console.log(
		`${type} ${message}\n ↪ ${parsedPath}:${line} ${severity} ${tags}\n ${dateInfo}`,
	);
};
