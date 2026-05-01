# Tab Follow-Up Extension

English | [中文](./README.zh.md)

```bash
pi install npm:pi-tab-follow-up
```

This pi package changes `Tab` in the main input editor:

- If the cursor is at the end of the input, `Tab` sends the current text as a follow-up message.
- Otherwise, `Tab` keeps the default editor behavior, including autocomplete.

## Difference From Keybinding Configuration

You can bind follow-up directly to `Tab` in `~/.pi/agent/keybindings.json`, but that is an unconditional keybinding override. It makes `Tab` always mean follow-up for `app.message.followUp`, so the main editor no longer gets the normal `tui.input.tab` autocomplete behavior on that key.

This extension is conditional. It checks the current editor state first:

- At the end of the main input: `Tab` sends the current input as a follow-up message.
- Anywhere else, or while autocomplete is open: `Tab` is passed through to the normal editor behavior.

## Disable Alt+Enter Follow-Up

The built-in follow-up keybinding remains active unless you override it. To make `Tab` the only follow-up shortcut, add this to `~/.pi/agent/keybindings.json`:

```json
{
  "app.message.followUp": []
}
```

Then run `/reload` in pi, or restart pi.

## More Extensions

- [models-metadata](https://github.com/lollipopkit/pi-models-metadata): Automatically sync remote models list and model metadata, including context size and multimodal support.
- [ui-finetune](https://github.com/lollipopkit/pi-ui-finetune/blob/main/README.md): UI fine-tuning, showing a more concise interface.
