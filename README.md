# Tab Follow-Up Extension

[English](./README.md) | [中文](./README.zh.md)

This pi package changes `Tab` in the main input editor:

- If the cursor is at the end of the input, `Tab` sends the current text as a follow-up message.
- Otherwise, `Tab` keeps the default editor behavior, including autocomplete.

## Difference From Keybinding Configuration

You can bind follow-up directly to `Tab` in `~/.pi/agent/keybindings.json`, but that is an unconditional keybinding override. It makes `Tab` always mean follow-up for `app.message.followUp`, so the main editor no longer gets the normal `tui.input.tab` autocomplete behavior on that key.

This extension is conditional. It checks the current editor state first:

- At the end of the main input: `Tab` sends the current input as a follow-up message.
- Anywhere else, or while autocomplete is open: `Tab` is passed through to the normal editor behavior.

Use direct keybinding configuration if you want a simple global remap. Use this extension if you want end-of-input follow-up while keeping `Tab` autocomplete.

Run locally:

```bash
pi -e ./packages/coding-agent/examples/extensions/tab-follow-up
```

## Disable Alt+Enter Follow-Up

The built-in follow-up keybinding remains active unless you override it. To make `Tab` the only follow-up shortcut, add this to `~/.pi/agent/keybindings.json`:

```json
{
  "app.message.followUp": []
}
```

Then run `/reload` in pi, or restart pi.
