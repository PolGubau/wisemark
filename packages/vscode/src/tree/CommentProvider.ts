import * as vscode from 'vscode';
import type { TreeItemData } from './types';
import { CommentTreeItem } from './CommentTreeItem';
 
 

export enum Grouping {
  None = 'none',
  Type = 'type',
  File = 'file'
}

export class CommentProvider implements vscode.TreeDataProvider<vscode.TreeItem> {
  private readonly _onDidChangeTreeData = new vscode.EventEmitter<vscode.TreeItem | undefined>();
  readonly onDidChangeTreeData = this._onDidChangeTreeData.event;

  private comments: TreeItemData[] = [];
  private isLoading = true;
  private grouping: Grouping = Grouping.None;

  refresh(comments: TreeItemData[]) {
    this.comments = comments;
    this.isLoading = false;
    this._onDidChangeTreeData.fire(undefined);
  }

  resetGrouping() {
    this.grouping = Grouping.None;
    this._onDidChangeTreeData.fire(undefined);
  }

  setGrouping(group: Grouping) {
    this.grouping = group;
    this._onDidChangeTreeData.fire(undefined);
  }

  getTreeItem(element: vscode.TreeItem): vscode.TreeItem {
    return element;
  }
private getGroupedItems(): vscode.TreeItem[] {
  if (this.grouping === Grouping.Type || this.grouping === Grouping.File) {
    const map = this.getGroupedMap();
    return Array.from(map.keys()).map(key => {
      const item = new vscode.TreeItem(key, vscode.TreeItemCollapsibleState.Collapsed);
      item.contextValue = 'group'; // opcional para menú contextual
      return item;
    });
  }

  return this.comments.map(c => new CommentTreeItem(c));
}

private getGroupedMap(): Map<string, TreeItemData[]> {
  const map = new Map<string, TreeItemData[]>();

  const key = this.grouping === Grouping.Type ? 'type' :
              this.grouping === Grouping.File ? 'filePath' :
              null;

  if (!key) return map;

  for (const comment of this.comments) {
    const k = comment[key]?.toString() || 'Other';
    const arr = map.get(k) || [];
    arr.push(comment);
    map.set(k, arr);
  }

  return map;
}
async getChildren(element?: vscode.TreeItem): Promise<vscode.TreeItem[]> {
  if (this.isLoading) return [new vscode.TreeItem('Loading comments...')];
  if (!this.comments.length) return [new vscode.TreeItem('No comments found.')];

  if (!element) {
    // raíz
      const searchButton = new vscode.TreeItem('🔎 Search Comments');
  searchButton.command = { command: 'wisemark.openCommentQuickPick', title: 'Search Comments' };
  searchButton.iconPath = new vscode.ThemeIcon('search');
  searchButton.contextValue = 'searchButton';
 
    const groupOptions = new vscode.TreeItem('🔃 Change Grouping');
    groupOptions.command = { command: 'wisemark.toggleGrouping', title: 'Toggle Grouping' };
    groupOptions.iconPath = new vscode.ThemeIcon('list-flat');

    const resetButton = new vscode.TreeItem('🔄 Reset & Rescan');
    resetButton.command = { command: 'wisemark.scan', title: 'Rescan Comments' };
    resetButton.iconPath = new vscode.ThemeIcon('refresh');

    const commentItems = this.getGroupedItems();
    const footer = new vscode.TreeItem(`🧮 Total comments: ${this.comments.length}`);
    footer.collapsibleState = vscode.TreeItemCollapsibleState.None;

    return [searchButton, groupOptions, resetButton, ...commentItems, footer];
  }

  // hijos de un grupo
  const grouped = this.getGroupedMap();
  const label = element.label?.toString() ?? '';
  const children = grouped.get(label) || [];
  return children.map(c => new CommentTreeItem(c));
}
}