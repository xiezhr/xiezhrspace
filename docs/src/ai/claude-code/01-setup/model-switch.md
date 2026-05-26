---
date: 2026-05-26
title: 模型选择与切换
---

# 模型选择与切换

> 配好 API 之后，你迟早会碰到这两个问题：这个任务该用哪个模型？这个 Provider 挂了或者想换一个，怎么快速切过去？这篇介绍两条路：一条是用 CC Switch 这个 GUI 工具一站式搞定，一条是命令行精准控制。

---

## Claude 家族里有哪些模型？

目前 Claude Code 可以调用的主流模型分三档：

| 模型 | 外号 | 定位 | 适合做什么 |
|------|------|------|-----------|
| `claude-opus-4-5` | 旗舰款 | 最强推理，价格最高 | 复杂架构设计、啃硬骨头难题 |
| `claude-sonnet-4-5` | 主力款 | 能力均衡，性价比高 | 日常写代码、改 bug（**推荐首选**） |
| `claude-haiku-3-5` | 轻量款 | 极速响应，价格极低 | 简单问答、批量自动化任务 |

> 如果不知道选哪个，就用 **Sonnet**。它是 Anthropic 最力推的日常主力，速度和质量都在线，价格也不夸张。

不做任何设置直接运行 `claude`，使用的就是 Sonnet 系列的最新版本。

---

## 方案一：CC Switch——GUI 界面统一管理（推荐）

[CC Switch](https://www.ccswitch.io/zh/) 是一个开源的桌面应用，专门用来统一管理 Claude Code、Claude Desktop 等工具的 Provider 和模型配置。它在本地起一个代理服务，Claude Code 把请求发给它，它负责路由到你配好的 Provider。

对于经常需要切换 Provider 或想可视化管理用量和费用的人，CC Switch 是目前最顺手的方案。

**核心能力**：
- GUI 界面一键切换 Provider（Anthropic、OpenRouter、DeepSeek 等）
- 多 Provider 自动故障转移，一个挂了静默切备用
- 实时追踪 Token 用量、缓存命中和花费
- 支持 Claude Code、Claude Desktop、Codex、Gemini CLI 等 7 个工具
- 开源免费，MIT 协议，配置全部本地存储

### 第一步：下载安装

前往 GitHub Releases 下载对应系统的安装包：

👉 [CC Switch 下载页](https://github.com/farion1231/cc-switch/releases)

支持 macOS 12+、Windows 10+、Linux，下载安装包直接安装即可。

### 第二步：让 Claude Code 接入 CC Switch

CC Switch 的本地代理默认运行在 `http://127.0.0.1:15721`。只需在 `~/.claude/settings.json`（没有就新建）里加上这段配置，让 Claude Code 的请求走 CC Switch 转发：

```json
{
  "env": {
    "ANTHROPIC_AUTH_TOKEN": "PROXY_MANAGED",
    "ANTHROPIC_BASE_URL": "http://127.0.0.1:15721"
  }
}
```

> `PROXY_MANAGED` 是固定写法，告诉 Claude Code 这个 Key 由 CC Switch 代为管理，实际 API Key 填在 CC Switch 里。

### 第三步：在 CC Switch 里添加 Provider

打开 CC Switch，进入 Provider 管理页面，按照界面提示添加你要用的服务：

| Provider | 填写内容 |
|----------|----------|
| Anthropic 官方 | API Key（`sk-ant-api03-...`） |
| OpenRouter | API Key（`sk-or-...`） |
| DeepSeek | API Key + Base URL |
| 其他中转服务 | API Key + 对应 Base URL |

### 第四步：启动本地路由，一键切换

在 CC Switch 主界面开启"本地路由"，之后点击任意 Provider 旁的**启用**按钮，即可立刻切换。Claude Code 下一次请求就会走新的 Provider，无需重启，无需改配置文件。

> 📌 CC Switch 同时显示每个 Provider 的上次请求时间、用量和剩余额度，方便随时掌握开销。

---

## 方案二：会话中用 `/model` 临时切换

已经在 Claude Code 里对话了，想临时换个模型但不想退出重开，直接输入：

```
/model
```

Claude Code 会弹出可交互的模型列表，用 ↑ ↓ 方向键选，回车确认，**立刻生效，对话不中断**。

> 📌 注意：`/model` 切换的是当前 Provider 下可用的模型，如果 Provider 是 OpenRouter，列出的模型名会带 `anthropic/` 前缀，和直连 Anthropic 官方时略有不同。

---

## 方案三：启动时用 `--model` 指定

临时调用一次更强或更便宜的模型，不想动全局配置：

```bash
# 用旗舰款 Opus 开始对话
claude --model claude-opus-4-5

# 用轻量款 Haiku 开始对话
claude --model claude-haiku-3-5
```

> 📌 如果你用的是 OpenRouter 等中转服务，模型名需要带 Provider 前缀，例如 `anthropic/claude-opus-4-5`，具体格式以该服务的文档为准。

---

## 方案四：环境变量修改默认 Provider

想整体换掉后端服务（比如从官方切到 OpenRouter），用环境变量控制：

```bash
export ANTHROPIC_BASE_URL="https://openrouter.ai/api/v1"
export ANTHROPIC_API_KEY="sk-or-xxxxxxxxxx"
```

写进 `~/.zshrc` 或 `~/.bashrc` 就能永久生效。想恢复：

```bash
unset ANTHROPIC_BASE_URL
unset ANTHROPIC_API_KEY
```

---

## 当前用的是哪个模型，怎么确认？

在对话里直接问：

```
你现在用的是哪个版本的模型？
```

Claude Code 会在回复中告知。也可以在 CC Switch 的界面里直接看每个 Provider 的当前请求状态。

---

## 哪个场景该用哪个模型？

| 你要做什么 | 推荐模型 | 理由 |
|------------|----------|------|
| 日常写代码、改 bug、读文档 | Sonnet | 速度快、质量稳、性价比高 |
| 设计系统架构、做技术方案 | Opus | 推理更深，能看到更多细节 |
| 问几个简单的问题 | Haiku | 几乎秒回，花费极少 |
| 跑批量自动化、大量重复任务 | Haiku | 成本低，适合高频调用 |
| 处理超长代码库或超大文档 | Opus / Sonnet | 长上下文理解更稳定准确 |

一个实用原则：**用 Sonnet 打底，Haiku 省钱，Opus 攻坚**。

---

## 模型价格差多少？

不同模型的调用价格差距相当大，以下是大致比例参考：

| 模型 | 相对价格 | 说明 |
|------|----------|------|
| Opus | ⭐⭐⭐⭐⭐ 最贵 | 约是 Sonnet 的 3–5 倍 |
| Sonnet | ⭐⭐⭐ 中等 | 日常主力的合理定价 |
| Haiku | ⭐ 极低 | 比 Sonnet 便宜 10 倍以上 |

> 具体实时价格以 [Anthropic 官方定价页](https://www.anthropic.com/pricing) 为准，版本迭代后会更新。

**省钱技巧**：用 CC Switch 的用量统计功能，随时看到每个 Provider 的实际花费，哪里贵一眼就看出来。写代码用 Sonnet，只在遇到真正复杂的问题时才切 Opus，能节省一大半费用。

---

## 小结

| 场景 | 推荐方式 |
|------|----------|
| 多 Provider 管理、用量可视化 | CC Switch（GUI，一键切换） |
| 会话中临时换个模型 | `/model` 命令 |
| 启动时指定模型 | `claude --model <模型名>` |
| 整体换后端服务 | 环境变量 `ANTHROPIC_BASE_URL` |

