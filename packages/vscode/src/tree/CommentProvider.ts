import * as vscode from "vscode";
import type { TreeItemData } from "./types";
import { CommentTreeItem, getIcon } from "./CommentTreeItem";
import type { Type } from "@wisemark/core";

export enum Grouping {
	None = "none",
	Type = "type",
	File = "file",
}

export class CommentProvider
	implements vscode.TreeDataProvider<vscode.TreeItem>
{
	private readonly _onDidChangeTreeData = new vscode.EventEmitter<
		vscode.TreeItem | undefined
	>();
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

	nextGrouping() {
		const next = {
			[Grouping.None]: Grouping.Type,
			[Grouping.Type]: Grouping.File,
			[Grouping.File]: Grouping.None,
		};
		this.grouping = next[this.grouping];
		this._onDidChangeTreeData.fire(undefined);
	}

	getTreeItem(element: vscode.TreeItem): vscode.TreeItem {
		return element;
	}
	private getGroupedItems(): vscode.TreeItem[] {
		if (this.grouping === Grouping.Type || this.grouping === Grouping.File) {
			const map = this.getGroupedMap();
			return Array.from(map.keys()).map((key) => {
				const item = new vscode.TreeItem(
					key,
					vscode.TreeItemCollapsibleState.Collapsed,
				);

				if (this.grouping === Grouping.Type) {
					item.iconPath = getIcon(key as Type);
				}
				item.contextValue = "group";
				return item;
			});
		}

		return this.comments.map((c) => new CommentTreeItem(c));
	}

	private getGroupedMap(): Map<string, TreeItemData[]> {
		const map = new Map<string, TreeItemData[]>();

		const key =
			this.grouping === Grouping.Type
				? "type"
				: this.grouping === Grouping.File
					? "filePath"
					: null;

		if (!key) return map;

		for (const comment of this.comments) {
			const k = comment[key]?.toString() || "Other";
			const arr = map.get(k) || [];
			arr.push(comment);
			map.set(k, arr);
		}

		return map;
	}
	async getChildren(element?: vscode.TreeItem): Promise<vscode.TreeItem[]> {
		if (this.isLoading) return [new vscode.TreeItem("Loading comments...")];
		if (!this.comments.length)
			return [new vscode.TreeItem("No comments found.")];

		if (!element) {
			const commentItems = this.getGroupedItems();
			return [...commentItems];
		}

		// hijos de un grupo
		const grouped = this.getGroupedMap();
		const label = element.label?.toString() ?? "";
		const children = grouped.get(label) || [];
		return children.map((c) => new CommentTreeItem(c));
	}
}
