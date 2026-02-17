import { WorkspaceLeaf } from "obsidian";

export interface WorkspaceTabsInternal {
	children: WorkspaceLeaf[];
	parent: WorkspaceSplitInternal;
}

export interface WorkspaceSplitInternal {
	children: (WorkspaceSplitInternal | WorkspaceTabsInternal)[];
	parent?: WorkspaceSplitInternal;
	direction?: "vertical" | "horizontal";
}