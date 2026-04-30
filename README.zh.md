# Tab Follow-Up Extension

[English](./README.md) | 中文

```bash
pi install npm:pi-tab-follow-up
```

这个 pi package 会修改主输入编辑器里的 `Tab` 行为：

- 如果光标位于输入内容末尾，`Tab` 会把当前文本作为 follow-up 消息发送。
- 否则，`Tab` 保留默认编辑器行为，包括 autocomplete。

## 与 Keybinding 配置的差异

也可以直接在 `~/.pi/agent/keybindings.json` 里把 follow-up 绑定到 `Tab`，但这是无条件的 keybinding 覆盖。它会让 `Tab` 始终表示 `app.message.followUp`，主编辑器就无法再用这个按键触发正常的 `tui.input.tab` autocomplete 行为。

这个扩展是条件触发的。它会先检查当前编辑器状态：

- 光标位于主输入末尾：`Tab` 发送当前输入作为 follow-up 消息。
- 光标不在末尾，或 autocomplete 已打开：`Tab` 继续交给默认编辑器处理。

## 取消 Alt+Enter Follow-Up

内置 follow-up 快捷键仍会生效，除非显式覆盖。要让 `Tab` 成为唯一的 follow-up 快捷键，把下面内容加入 `~/.pi/agent/keybindings.json`：

```json
{
  "app.message.followUp": []
}
```

然后在 pi 里执行 `/reload`，或重启 pi。

## 更多插件

- [models-metadata](https://github.com/lollipopkit/pi-models-metadata/blob/main/README.zh.md): 自动同步远端的模型列表+模型的元数据(上下文大小/多模态等等)
