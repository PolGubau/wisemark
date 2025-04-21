import type { Type } from "@wisemark/core";
import * as vscode from "vscode";
import type { TreeItemData } from "./types";

export const typeIcons: Record<Type, vscode.ThemeIcon> = {
  todo: new vscode.ThemeIcon('lightbulb'),
  fixme: new vscode.ThemeIcon('warning'),
  question: new vscode.ThemeIcon('question'),
  note: new vscode.ThemeIcon('note'),
  refactor: new vscode.ThemeIcon('gear'),
}

const getIcon = (type: Type) => {
  return typeIcons[type] || new vscode.ThemeIcon('comment');
}

export class CommentTreeItem extends vscode.TreeItem {
  
 

  constructor(public readonly data: TreeItemData) {

    super(`${data.label}`, vscode.TreeItemCollapsibleState.None);
        this.iconPath = getIcon(data.type);
        
    this.tooltip = `${data.label} (${data.severity}) in ${data.filePath}:${data.line}`;
    this.command = {
      command: "wisemark.openCommentOnClick",
      title: "Open Comment",
      arguments: [data],
    };
    this.description = `${data.filePath.split("/").pop()}:${data.line}`;
  }
}
