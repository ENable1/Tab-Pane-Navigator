# Tab Pane Navigator

An [Obsidian](https://obsidian.md) plugin that adds keyboard commands for managing and navigating between panes (splits) in your workspace.

## Features

### Focus Pane
Move keyboard focus to an adjacent pane without disturbing any tabs.

| Command | Description |
|---|---|
| Focus right pane | Move focus to the pane on the right |
| Focus left pane | Move focus to the pane on the left |
| Focus top pane | Move focus to the pane above |
| Focus bottom pane | Move focus to the pane below |
| Focus next pane | Cycle focus forward through all panes |
| Focus previous pane | Cycle focus backward through all panes |

### Move Active Tab
Detach the active tab from its current pane and open it in a **new** split pane in the given direction.

| Command | Description |
|---|---|
| Move active tab to new right pane | Split right and move tab there |
| Move active tab to new left pane | Split left and move tab there |
| Move active tab to new top pane | Split up and move tab there |
| Move active tab to new bottom pane | Split down and move tab there |

### Send Active Tab
Send the active tab to an **existing** adjacent pane (no new split is created).

| Command | Description |
|---|---|
| Send active tab to right pane | Move tab into the existing right pane |
| Send active tab to left pane | Move tab into the existing left pane |
| Send active tab to top pane | Move tab into the existing top pane |
| Send active tab to bottom pane | Move tab into the existing bottom pane |

### Merge Pane
Move **all tabs** from the active pane into an adjacent pane, collapsing the split.

| Command | Description |
|---|---|
| Merge active pane into right pane | Move all tabs to the right pane |
| Merge active pane into left pane | Move all tabs to the left pane |
| Merge active pane into top pane | Move all tabs to the top pane |
| Merge active pane into bottom pane | Move all tabs to the bottom pane |

## Installation

This plugin is not yet listed in the Obsidian community plugin directory. To install it manually:

1. Download or clone this repository into your vault's plugin folder: `<vault>/.obsidian/plugins/tab-pane-navigator/`
2. Ensure `main.js` and `manifest.json` are present in that folder.
3. Open Obsidian → **Settings → Community plugins** and enable **Tab Pane Navigator**.

### Building from source

```bash
npm install
npm run build
```

The compiled `main.js` will be placed in the project root, ready to copy into your vault.

## Usage

All commands are available via the **Command Palette** (`Ctrl/Cmd + P`). Search for "top pane" to see the full list. Assign hotkeys to any command under **Settings → Hotkeys** for the fastest workflow.

## Compatibility

- Requires Obsidian **0.15.0** or later.
- Desktop only (not supported on mobile).

## License

[0-BSD](https://opensource.org/licenses/0BSD) — do whatever you want with it.
