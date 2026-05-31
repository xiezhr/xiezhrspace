---
title: 在 VSCode 和 Cursor 中使用
---

# 在 VSCode 和 Cursor 中使用

> Claude Code 是终端工具，但大多数人的代码还是在编辑器里看、在编辑器里改。这篇讲怎么让 Claude Code 和 VSCode / Cursor 配合得更顺手，让"终端 AI"和"编辑器"之间的切换摩擦降到最低。

## VSCode：两种接入方式

### 方式一：集成终端（推荐新手）

最简单的方式——直接在 VSCode 内置终端里跑 Claude Code，不需要任何额外配置。

打开终端：菜单栏 → **Terminal → New Terminal**，或快捷键 `` Ctrl+` ``。

![VSCode 集成终端运行 Claude Code](https://example.com/assets/vscode-terminal.png)
<!-- 截图说明：VSCode 窗口，底部集成终端中运行 `claude` 命令后的欢迎界面，左侧资源管理器显示项目目录 -->

在终端里输入 `claude`，就可以开始对话。Claude Code 修改文件时，编辑器左侧会自动出现文件变更标记（绿色/蓝色竖线），点开可以直接看 diff。

![VSCode 文件变更标记](https://example.com/assets/vscode-diff.png)
<!-- 截图说明：VSCode 编辑器中，左侧 gutter 区域出现蓝色变更线，右上角显示 "Accept / Discard changes" 按钮 -->

### 方式二：VSCode 扩展（官方支持）

Anthropic 推出了官方 VSCode 扩展 **Claude Code**，可以在编辑器侧边栏直接启动对话，不用切换到终端。

**安装方法**：

1. 打开扩展面板（`Ctrl+Shift+X`）
2. 搜索 `Claude Code`，找到 Anthropic 官方发布的扩展
3. 点击安装

![VSCode 扩展安装](https://example.com/assets/vscode-extension-install.png)
<!-- 截图说明：VSCode 扩展面板，搜索结果显示 "Claude Code" 扩展，publisher 为 Anthropic，点击 Install 按钮 -->

安装完成后，侧边栏会出现 Claude Code 图标，点击即可打开对话面板。

![VSCode 侧边栏 Claude Code 面板](https://example.com/assets/vscode-extension-panel.png)
<!-- 截图说明：VSCode 左侧侧边栏出现 Claude Code 图标，点击后右侧展开对话界面，显示输入框和对话历史 -->

**两种方式对比**：

| | 集成终端 | 官方扩展 |
|--|--------|--------|
| 配置成本 | 零配置 | 需要安装扩展 |
| 对话体验 | 纯文本终端 | 图形化面板，更直观 |
| 适合场景 | 习惯终端、需要完整命令行控制 | 不喜欢在终端里看长段文字 |

---

## Cursor：和内置 AI 的分工

Cursor 本身内置了 AI 功能（也是 Claude 驱动），很多人会疑惑：**既然 Cursor 自带 AI，为什么还要在 Cursor 里跑 Claude Code？**

两者定位不同：

| | Cursor 内置 AI | Claude Code（在 Cursor 终端里）|
|--|--------------|-------------------------------|
| 触发方式 | `Tab` 补全、`Ctrl+K` 行内编辑、`Ctrl+L` 对话 | 在集成终端里运行 `claude` |
| 感知范围 | 当前打开的文件 / 光标附近代码 | 整个项目目录，可主动读写任意文件 |
| 适合任务 | 快速补全、当前函数修改 | 跨文件重构、批量替换、复杂工程任务 |
| 执行能力 | 仅建议，需要手动接受 | 可直接修改文件、运行命令 |

**简单记法**：写代码的时候用 Cursor 内置 AI；需要它主动"干活"（读多个文件、跑命令、批量改动）的时候，切到终端用 Claude Code。

### 在 Cursor 中启动 Claude Code

和 VSCode 一样，打开 Cursor 内置终端（`` Ctrl+` ``），直接运行：

```bash
claude
```

![Cursor 终端运行 Claude Code](https://example.com/assets/cursor-terminal.png)
<!-- 截图说明：Cursor 编辑器窗口，底部集成终端中输入 `claude` 并显示启动成功的欢迎界面 -->

Cursor 的终端和 VSCode 的行为完全一样，Claude Code 修改文件后，编辑器里也会实时出现 diff 标记。

---

## 让 Claude Code 用 VSCode / Cursor 打开文件

Claude Code 在需要你审阅变更时，可以调用你的编辑器来展示 diff。配置方法：

**VSCode**：

```bash
git config --global core.editor "code --wait"
```

**Cursor**：

```bash
git config --global core.editor "cursor --wait"
```

配置后，Claude Code 在需要你确认大段修改时，会自动打开编辑器展示 diff，比在终端里滚动查看方便得多。

---

## 实用技巧

**1. 把 Claude Code 固定在分屏终端**

在 VSCode / Cursor 里可以把终端拖到编辑器右侧，形成"左边看代码、右边聊 Claude Code"的双屏布局。

**2. 跳转文件快捷键配合使用**

Claude Code 告诉你改了哪个文件后，用 `Ctrl+P` 快速跳转到对应文件验证修改结果，比切换到文件管理器快得多。

**3. 多终端并排**

Claude Code 跑一个长任务时，可以另开一个终端继续干其他事。VSCode / Cursor 的终端面板支持多标签，不会互相干扰。

---

## 小结

| 场景 | 推荐做法 |
|------|----------|
| VSCode 用户、习惯终端 | 集成终端里跑 `claude`，零配置 |
| VSCode 用户、不喜欢终端 | 安装 Claude Code 官方扩展 |
| Cursor 用户 | 集成终端里跑 `claude`，和内置 AI 互补使用 |
| 需要审阅大段变更 | 配置 `core.editor`，让 Claude Code 在编辑器里展示 diff |

下一篇讲模型选择与切换——根据任务复杂度选对模型，既省钱又快。


> 待补充内容...
