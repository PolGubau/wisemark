import type { Comment } from "@wisemark/core";

 
export const printCommentsAsTable = (comments: Comment[]) => {
  const anyCommentHasTags = comments.some((c) => c.tags && c.tags.length > 0);

  const parsedComments = comments.map((c) => {
    const shortPath = c.path.split("/").slice(-2).join("/"); 
    const displayPath = (`${shortPath}:${c.line}`); 
    const fullPath = `${c.path}:${c.line}`; 
    const message = c.message.length > 40 ? `${c.message.slice(0, 40)}...` : c.message;


    // show the tag column if any comment has tags
    if (anyCommentHasTags) {
      return {
        type: c.type,
        message,
        location: displayPath, 
        fullLocation: fullPath, 
        id: c.id,
        severity: c.severity ?? "",
        tags: c.tags?.join(", ") ?? "",
      };
    }

    return {
      type: c.type,
      message,
       location: displayPath, 
      fullLocation: fullPath, 
      id: c.id,
      severity: c.severity ?? "",
    };
  });

  // Mostrar tabla sin la ruta completa
  console.table(parsedComments.map(({ fullLocation, ...rest }) => rest));
 
};
