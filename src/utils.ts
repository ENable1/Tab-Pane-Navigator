import { WorkspaceLeaf, Workspace } from "obsidian";
import { WorkspaceTabsInternal, WorkspaceSplitInternal } from "./types";

export function isTabGroup(
	node: WorkspaceSplitInternal | WorkspaceTabsInternal
): node is WorkspaceTabsInternal {
	const children = node.children;
	return (
		Array.isArray(children) &&
		children.length > 0 &&
		children[0] instanceof WorkspaceLeaf
	);
}

export function getFirstTabGroup(
	node: WorkspaceSplitInternal | WorkspaceTabsInternal
): WorkspaceTabsInternal | null {
	if (isTabGroup(node)) return node;
	for (const child of node.children) {
		const found = getFirstTabGroup(child);
		if (found) return found;
	}
	return null;
}

export function getLastTabGroup(
	node: WorkspaceSplitInternal | WorkspaceTabsInternal
): WorkspaceTabsInternal | null {
	if (isTabGroup(node)) return node;
	for (let i = node.children.length - 1; i >= 0; i--) {
		const found = getLastTabGroup(node.children[i]);
		if (found) return found;
	}
	return null;
}

export function getAllTabGroups(
	node: WorkspaceSplitInternal | WorkspaceTabsInternal
): WorkspaceTabsInternal[] {
	if (isTabGroup(node)) return [node];
	const result: WorkspaceTabsInternal[] = [];
	for (const child of node.children) {
		result.push(...getAllTabGroups(child));
	}
	return result;
}

export function getAdjacentTabGroup(
	activeLeaf: WorkspaceLeaf,
	direction: "left" | "right" | "up" | "down"
): WorkspaceTabsInternal | null {
	const neededDirection: "vertical" | "horizontal" =
		direction === "left" || direction === "right" ? "vertical" : "horizontal";

	const activeTabGroup = (activeLeaf as unknown as { parent: WorkspaceTabsInternal }).parent;
	if (!activeTabGroup) return null;

	let currentNode: WorkspaceSplitInternal | WorkspaceTabsInternal = activeTabGroup;
	let parentSplit: WorkspaceSplitInternal | null = activeTabGroup.parent ?? null;

	while (parentSplit && parentSplit.direction !== neededDirection) {
		currentNode = parentSplit;
		parentSplit = parentSplit.parent ?? null;
	}

	if (!parentSplit || parentSplit.direction !== neededDirection) return null;

	const siblings = parentSplit.children;
	const currentIndex = siblings.indexOf(currentNode);
	if (currentIndex === -1) return null;

	const targetIndex =
		direction === "right" || direction === "down" ? currentIndex + 1 : currentIndex - 1;

	if (targetIndex < 0 || targetIndex >= siblings.length) return null;

	const targetNode = siblings[targetIndex];
	return direction === "right" || direction === "down"
		? getFirstTabGroup(targetNode)
		: getLastTabGroup(targetNode);
}

export async function moveLeafToTabGroup(
	workspace: Workspace,
	leaf: WorkspaceLeaf,
	targetGroup: WorkspaceTabsInternal
): Promise<WorkspaceLeaf> {
	const ws = workspace as unknown as {
		createLeafInTabGroup(group: WorkspaceTabsInternal): WorkspaceLeaf;
	};
	const viewState = leaf.getViewState();
	const ephemeralState = leaf.getEphemeralState() as Record<string, unknown>;
	const newLeaf = ws.createLeafInTabGroup(targetGroup);
	leaf.detach();
	await newLeaf.setViewState(viewState);
	newLeaf.setEphemeralState(ephemeralState);
	return newLeaf;
}