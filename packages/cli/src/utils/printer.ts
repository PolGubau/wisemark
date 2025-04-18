import type { Comment, Type } from "@wisemark/core";
import pc from "picocolors";
import { printComment } from "./prints/printComment";
import { printCommentsAsTable } from "./prints/printCommentsAsTable";

export const typeColor: Record<Type, (x: string) => string> = {
	note: pc.blue,
	todo: pc.yellow,
	fixme: pc.red,
	question: pc.cyan,
};

type Options = {
	table?: boolean;
}
// @note PASSED DATE -- due:2023-10-01
// @note hello -- due:2025-04-16
// @note FUTURE -- due:2027-10-01
export function printResults(comments: Comment[], milliseconds: number, options?: Options) {
	if (comments.length === 0) {
		console.log(pc.green(`✅ No wisemark comments found in ${milliseconds}ms`));
		return;
	}
	if (options?.table) {
		printCommentsAsTable(comments);
	} else {
		for (const c of comments) {
			const color = typeColor[c.type] ?? ((x: string) => x);
			printComment(c, color);
		}
	}


	console.log(`\n
${pc.green(`✅ Found ${comments.length} wisemark comments in ${milliseconds}ms`)}
	
`);
}
