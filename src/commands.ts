import TabPaneNavigator from "./main";

export function registerCommands(plugin: TabPaneNavigator) {
    plugin.addCommand({
        id: "move-tab-to-right-pane",
        name: "Move active tab to new right pane",
        callback: () => plugin.moveActiveTab("right"),
    });

    plugin.addCommand({
        id: "move-tab-to-left-pane",
        name: "Move active tab to new left pane",
        callback: () => plugin.moveActiveTab("left"),
    });

    plugin.addCommand({
        id: "move-tab-to-up-pane",
        name: "Move active tab to new top pane",
        callback: () => plugin.moveActiveTab("up"),
    });

    plugin.addCommand({
        id: "move-tab-to-down-pane",
        name: "Move active tab to new bottom pane",
        callback: () => plugin.moveActiveTab("down"),
    });

    plugin.addCommand({
        id: "send-tab-to-right-pane",
        name: "Send active tab to right pane",
        callback: () => plugin.sendTabToAdjacentPane("right"),
    });

    plugin.addCommand({
        id: "send-tab-to-left-pane",
        name: "Send active tab to left pane",
        callback: () => plugin.sendTabToAdjacentPane("left"),
    });

    plugin.addCommand({
        id: "send-tab-to-up-pane",
        name: "Send active tab to top pane",
        callback: () => plugin.sendTabToAdjacentPane("up"),
    });

    plugin.addCommand({
        id: "send-tab-to-down-pane",
        name: "Send active tab to bottom pane",
        callback: () => plugin.sendTabToAdjacentPane("down"),
    });

    plugin.addCommand({
        id: "focus-right-pane",
        name: "Focus right pane",
        callback: () => plugin.focusAdjacentPane("right"),
    });

    plugin.addCommand({
        id: "focus-left-pane",
        name: "Focus left pane",
        callback: () => plugin.focusAdjacentPane("left"),
    });

    plugin.addCommand({
        id: "focus-up-pane",
        name: "Focus top pane",
        callback: () => plugin.focusAdjacentPane("up"),
    });

    plugin.addCommand({
        id: "focus-down-pane",
        name: "Focus bottom pane",
        callback: () => plugin.focusAdjacentPane("down"),
    });

    plugin.addCommand({
        id: "focus-next-pane",
        name: "Focus next pane",
        callback: () => plugin.cyclePaneFocus(1),
    });

    plugin.addCommand({
        id: "focus-prev-pane",
        name: "Focus previous pane",
        callback: () => plugin.cyclePaneFocus(-1),
    });

    plugin.addCommand({
        id: "merge-pane-with-right",
        name: "Merge active pane into right pane",
        callback: () => plugin.mergeActivePane("right"),
    });

    plugin.addCommand({
        id: "merge-pane-with-left",
        name: "Merge active pane into left pane",
        callback: () => plugin.mergeActivePane("left"),
    });

    plugin.addCommand({
        id: "merge-pane-with-up",
        name: "Merge active pane into top pane",
        callback: () => plugin.mergeActivePane("up"),
    });

    plugin.addCommand({
        id: "merge-pane-with-down",
        name: "Merge active pane into bottom pane",
        callback: () => plugin.mergeActivePane("down"),
    });
}
