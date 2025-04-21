import type { Comment, Type } from "@wisemark/core";
import pc from "picocolors";
import { printComment } from "./prints/printComment";
import { printCommentsAsTable } from "./prints/printCommentsAsTable";

 
type Options = {
	table?: boolean;
}
// @note PASSED DATE -- due:2023-10-01 severity:high
// @todo hello -- due:2025-04-16 tags:a,b,c
// @refactor FUTURE -- due:2027-10-01
// @todo Implementar nueva funcionalidad
// @fixme Corregir el error de cálculo
// @note Recuerda revisar el código de esta parte
// @refactor Refactorizar la función

export function printResults(comments: Comment[], milliseconds: number, options?: Options) {
	if (comments.length === 0) {
		console.log(pc.green(`✅ No wisemark comments found in ${milliseconds}ms`));
		return;
	}
	if (options?.table) {
		printCommentsAsTable(comments);
	} else {
		for (const c of comments) {
 			printComment(c);
		}
	}


	console.log(`\n
${pc.green(`✅ Found ${comments.length} wisemark comments in ${milliseconds}ms`)}
	
`);
}
