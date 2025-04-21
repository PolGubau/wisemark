import * as vscode from "vscode";
import { listAndFilter, type Type } from "@wisemark/core";
import type { TreeItemData } from "./tree/types";
import { CommentProvider } from "./tree/CommentProvider";
import { CommentTreeItem } from "./tree/CommentTreeItem";




export function activate(context: vscode.ExtensionContext) {
  const commentProvider = new CommentProvider();
  vscode.window.registerTreeDataProvider("commentExplorer", commentProvider);

  // Ejecutar el escaneo automáticamente al iniciar la extensión
  const scanComments = async () => {
    const wsPath = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;
    if (!wsPath) return;
const defaultIgnore = ["node_modules", "dist", "build", "**/*.d.ts", "**/*.map", "**/coverage", "**/test", "**/tests", "**/__tests__", "**/__mocks__", "**/__snapshots__", "**/public", "**/lib", "**/out", "**/coverage", "**/docs", "**/.vscode-test", "**/.vscode-test/**", "**/.git", "**/.git/**", "**/.github", "**/.github/**", "**/.idea", "**/.idea/**", "**/.history", "**/.history/**", "**/package-lock.json", "**/yarn.lock", "**/pnpm-lock.yaml", "**/npm-debug.log", "**/yarn-error.log", "**/pnpm-debug.log", "**/lerna-debug.log", "**/lerna-debug.log.*", "**/lerna-debug.log.*.*", "README.md", "LICENSE", "LICENSE.txt", "LICENSE.md", "**/CHANGELOG.md", "**/CHANGELOG.txt", "**/CHANGELOG", "**/CHANGELOG.txt.*", "**/CHANGELOG.md.*", "**/CHANGELOG.*", "**/CHANGELOG.*.*", "**/CHANGELOG.*.*.*", "**/CHANGELOG.*.txt", "**/CHANGELOG.*.md",".npmrc", ".yarnrc", ".pnpmfile.cjs", ".npmignore", ".yarnclean", ".yarnrc.yml", ".yarnrc.json", ".yarn-integrity", ".yarn-error.log", "package.json", "package-lock.json", "yarn.lock", "pnpm-lock.yaml"];

    const result = await listAndFilter({ cwd: wsPath, path: "." },{ignore: defaultIgnore});
    const mapped: TreeItemData[] = result.comments.map((c) => ({
      label: c.message,
      filePath: c.path,
      line: c.line,
      type: c.type,
      severity: c.severity ?? "low",
    }));
    commentProvider.refresh(mapped);
  };

  // Llamar al escaneo de comentarios al activarse la extensión
  scanComments();

  // Monitorizar cambios en los archivos y volver a escanear

  let scanTimeout: NodeJS.Timeout | undefined;
  vscode.workspace.onDidSaveTextDocument(() => {
    clearTimeout(scanTimeout);
    scanTimeout = setTimeout(scanComments, 300);
  });

  const openCommentOnClick = async (item: TreeItemData) => {
    if (item) {
      const uri = vscode.Uri.file(item.filePath);
      const doc = await vscode.workspace.openTextDocument(uri);
      const editor = await vscode.window.showTextDocument(doc);

      // Obtener la última posición de la línea
      const line = doc.lineAt(Math.max(item.line - 1, 0)); // Obtiene la línea especificada (index 0)
      const pos = line.range.end; // La posición final de esa línea

      // Establecer la selección y hacer que se enfoque en la última posición de la línea
      editor.selection = new vscode.Selection(pos, pos);

      editor.revealRange(new vscode.Range(pos, pos));
     }
  };  
function isCommentTreeItem(item: vscode.TreeItem): item is CommentTreeItem {
  return item instanceof CommentTreeItem;
}
function openCommentQuickPick(provider: CommentProvider) {
  return async () => {
  const items = (await provider.getChildren())
  .filter(isCommentTreeItem)
  .map(item => ({
    label: item.data.label,
    description: `${item.data.filePath.split('/').pop()}:${item.data.line}`,
    item,
  }));

    const selected = await vscode.window.showQuickPick(items, {
      placeHolder: 'Select a comment to open',
    });

    if (selected) {
      vscode.commands.executeCommand('wisemark.openCommentOnClick', selected.item.data);
    }
  };
}
const insertNoteComment= async (type:Type) => {
  const editor = vscode.window.activeTextEditor;
  if (!editor) return;

  const snippet = new vscode.SnippetString(`// @${type} $1\n`);
  editor.insertSnippet(snippet);
}



  context.subscriptions.push(
    vscode.commands.registerCommand(
      "wisemark.openCommentOnClick",
      async (item: TreeItemData) => await openCommentOnClick(item)
    ),
    vscode.commands.registerCommand(
      "wisemark.openCommentQuickPick",
      openCommentQuickPick(commentProvider)
    ),
    vscode.commands.registerCommand(
      "wisemark.scan", scanComments
    ),
    vscode.commands.registerCommand(
      "wisemark.insertTodoComment", ()=>insertNoteComment("todo")
    ),
    vscode.commands.registerCommand(
      "wisemark.insertNoteComment", ()=>insertNoteComment("note")
    ),
    vscode.commands.registerCommand(
      "wisemark.insertFixmeComment", ()=>insertNoteComment("fixme")
    ),
    vscode.commands.registerCommand(
      "wisemark.insertQuestionComment", ()=>insertNoteComment("question")
    ),
     vscode.commands.registerCommand(
      "wisemark.insertRefactorComment", ()=>insertNoteComment("refactor")
    ),
   
  );
}



// SHORT TAGS
type CommentTag = {
  label: Type;
  detail: string;
  severity: string;
};
const COMMENT_TAGS:CommentTag[] = [
  { label: "todo", detail: "Pending task", severity: "low" },
  { label: "fixme", detail: "Fix this code", severity: "medium" },
  { label: "note", detail: "Important note", severity: "low" },
  { label: "question", detail: "Question or clarification needed", severity: "low" },
  { label: "refactor", detail: "Code needs refactoring", severity: "medium" },
];

vscode.languages.registerCompletionItemProvider(
[{ language: "typescript", scheme: "file" }, { language: "javascript", scheme: "file" }],
  {
    provideCompletionItems(document, position) {
      const line = document.lineAt(position);
      const text = line.text.substring(0, position.character);

      // Activar solo si es un comentario que empieza por //
      if (!text.trim().startsWith("//")) return;

      // Activar solo si se ha escrito `@` o `// @`
      const triggerMatch = /\/\/\s*@\w*$/.test(text);
      if (!triggerMatch) return;

      return COMMENT_TAGS.map(tag => {
        const item = new vscode.CompletionItem(tag.label, vscode.CompletionItemKind.Keyword);
        item.detail = `Wisemark: ${tag.detail}`;
        item.insertText = `${tag.label} `; // Espacio después del tag  
        item.documentation = `Suggested severity: \`${tag.severity}\``;
        return item;
      });
    },
  },
  "@" // Trigger character
);

 
