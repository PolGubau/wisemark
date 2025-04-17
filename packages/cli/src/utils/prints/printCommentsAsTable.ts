import type { Comment } from "@wisemark/core";
import pc from "picocolors";



export const printCommentsAsTable = (comments: Comment[], color: (c: string) => string) => {


  const parsedComments = comments.map((c) => {
    return {
      type: color(`[${c.type.toUpperCase()}]`),
      message: pc.bold(c.message.trim()),
      filePath: c.filePath ? pc.gray(c.filePath) : pc.gray("File not found"),
      line: pc.yellow(c.line.toString()),
      id: c.id ? pc.magenta(`#${c.id}`) : "",
      severity: c.severity ? pc.red(`(${c.severity})`) : "",
      tags: c.tags?.length ? ` ${pc.gray(`[${c.tags.join(", ")}]`)}` : "",
    };
  })

  console.table(parsedComments, [
    "type",
    "message",
    "filePath",
    "line",
    "id",
    "severity",
    "tags",
  ])
};
