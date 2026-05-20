import {
	CustomEditor,
	type ExtensionAPI,
	type ExtensionContext,
	type KeybindingsManager,
} from "@earendil-works/pi-coding-agent";
import { type EditorTheme, matchesKey, type TUI } from "@earendil-works/pi-tui";

class TabFollowUpEditor extends CustomEditor {
	private readonly getContext: () => ExtensionContext;
	private readonly sendUserMessage: ExtensionAPI["sendUserMessage"];

	constructor(
		tui: TUI,
		theme: EditorTheme,
		keybindings: KeybindingsManager,
		getContext: () => ExtensionContext,
		sendUserMessage: ExtensionAPI["sendUserMessage"],
	) {
		super(tui, theme, keybindings);
		this.getContext = getContext;
		this.sendUserMessage = sendUserMessage;
	}

	handleInput(data: string): void {
		if (
			matchesKey(data, "tab") &&
			!this.isShowingAutocomplete() &&
			this.isCursorAtInputEnd()
		) {
			const message = this.getExpandedText().trim();
			if (message.length === 0) {
				super.handleInput(data);
				return;
			}

			const ctx = this.getContext();
			this.addToHistory(message);
			this.setText("");
			this.sendUserMessage(
				message,
				ctx.isIdle() ? undefined : { deliverAs: "followUp" },
			);
			return;
		}

		super.handleInput(data);
	}

	private isCursorAtInputEnd(): boolean {
		const cursor = this.getCursor();
		const lines = this.getText().split("\n");
		const lastLineIndex = lines.length - 1;
		return (
			cursor.line === lastLineIndex &&
			cursor.col === (lines[lastLineIndex]?.length ?? 0)
		);
	}
}

export default function (pi: ExtensionAPI) {
	pi.on("session_start", (_event, ctx) => {
		ctx.ui.setEditorComponent(
			(tui, theme, keybindings) =>
				new TabFollowUpEditor(
					tui,
					theme,
					keybindings,
					() => ctx,
					pi.sendUserMessage.bind(pi),
				),
		);
	});
}
