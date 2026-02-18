import { Plugin, WorkspaceLeaf, ItemView } from "obsidian";
import { WorkspaceTabsInternal, WorkspaceSplitInternal } from "./types";
import { getAllTabGroups, getAdjacentTabGroup, moveLeafToTabGroup } from "./utils";
import { registerCommands } from "./commands";

export default class TabPaneNavigator extends Plugin {

	onload() {
		registerCommands(this);
	}

	getActiveLeaf(): WorkspaceLeaf | null {
		return this.app.workspace.getActiveViewOfType(ItemView)?.leaf ?? null;
	}

	async moveActiveTab(direction: "left" | "right" | "up" | "down") {
		const activeLeaf = this.getActiveLeaf();
		if (!activeLeaf) {
			//console.warn("TabPaneNavigator: No active view found.");
			return;
		}

		const workspace = this.app.workspace;
		const viewState = activeLeaf.getViewState();
		const ephemeralState = activeLeaf.getEphemeralState() as Record<string, unknown>;

		// left/right → vertical split; up/down → horizontal split
		const orientation: "vertical" | "horizontal" =
			direction === "left" || direction === "right" ? "vertical" : "horizontal";
		const before = direction === "left" || direction === "up";

		// Split from the active leaf BEFORE detaching so the new pane is placed
		// directly adjacent, regardless of workspace layout.
		const newLeaf = workspace.createLeafBySplit(activeLeaf, orientation, before);

		// Detach the original leaf now that the new one is in position.
		activeLeaf.detach();

		await newLeaf.setViewState(viewState);
		newLeaf.setEphemeralState(ephemeralState);
		workspace.setActiveLeaf(newLeaf, { focus: true });
	}

	async mergeActivePane(direction: "left" | "right" | "up" | "down") {
		const activeLeaf = this.getActiveLeaf();
		if (!activeLeaf) {
			//console.warn("TabPaneNavigator: No active view found.");
			return;
		}

		const activeTabGroup = (activeLeaf as unknown as { parent: WorkspaceTabsInternal }).parent;
		if (!activeTabGroup) {
			//console.warn("TabPaneNavigator: Could not find active leaf's tab group.");
			return;
		}

		const targetTabGroup = getAdjacentTabGroup(activeLeaf, direction);
		if (!targetTabGroup) {
			//console.warn(`TabPaneNavigator: No ${direction} pane to merge into.`);
			return;
		}

		for (const leaf of [...activeTabGroup.children]) {
			await moveLeafToTabGroup(this.app.workspace, leaf, targetTabGroup);
		}
	}

	async sendTabToAdjacentPane(direction: "left" | "right" | "up" | "down") {
		const activeLeaf = this.getActiveLeaf();
		if (!activeLeaf) {
			//console.warn("TabPaneNavigator: No active view found.");
			return;
		}

		const targetTabGroup = getAdjacentTabGroup(activeLeaf, direction);
		if (!targetTabGroup) {
			//console.warn(`TabPaneNavigator: No ${direction} pane to send tab to.`);
			return;
		}

		const newLeaf = await moveLeafToTabGroup(this.app.workspace, activeLeaf, targetTabGroup);
		this.app.workspace.setActiveLeaf(newLeaf, { focus: true });
	}

	focusAdjacentPane(direction: "left" | "right" | "up" | "down") {
		const activeLeaf = this.getActiveLeaf();
		if (!activeLeaf) {
			//onsole.warn("TabPaneNavigator: No active view found.");
			return;
		}

		const targetTabGroup = getAdjacentTabGroup(activeLeaf, direction);
		if (!targetTabGroup) {
			//console.warn(`TabPaneNavigator: No ${direction} pane to focus.`);
			return;
		}

		const targetLeaf = targetTabGroup.children[0];
		if (targetLeaf) {
			this.app.workspace.setActiveLeaf(targetLeaf, { focus: true });
		}
	}

	cyclePaneFocus(delta: 1 | -1) {
		const activeLeaf = this.getActiveLeaf();
		if (!activeLeaf) {
			//console.warn("TabPaneNavigator: No active view found.");
			return;
		}

		const activeTabGroup = (activeLeaf as unknown as { parent: WorkspaceTabsInternal }).parent;
		if (!activeTabGroup) return;

		const rootSplit = this.app.workspace.rootSplit as unknown as WorkspaceSplitInternal;
		const allGroups = getAllTabGroups(rootSplit);

		if (allGroups.length <= 1) return;

		const currentIndex = allGroups.indexOf(activeTabGroup);
		if (currentIndex === -1) return;

		const nextIndex = (currentIndex + delta + allGroups.length) % allGroups.length;
		const targetLeaf = allGroups[nextIndex].children[0];
		if (targetLeaf) {
			this.app.workspace.setActiveLeaf(targetLeaf, { focus: true });
		}
	}
}