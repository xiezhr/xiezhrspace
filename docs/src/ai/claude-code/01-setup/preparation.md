---
title: 装之前准备啥
---

# 装之前准备啥

> 很多人第一次装 Claude Code 栽在同一个地方：Node.js 版本不对、API Key 没准备好、或者网络连不上。这篇把坑提前列出来，对照检查一遍，装的时候就省事多了。

## 一共要准备三件事

| 准备项 | 说明 | 是否必须 |
|--------|------|----------|
| Node.js 环境 | Claude Code 是 npm 包，依赖 Node.js 运行 | ✅ 必须 |
| 能调用到大模型的 API | 官方 Anthropic、中转服务、国产模型都行 | ✅ 必须 |
| 顺手的终端 | Windows 用户要注意 | ✅ 建议 |

---

## 1. Node.js：版本不能太老

Claude Code 要求 **Node.js 18 或以上**。低于这个版本会报错，甚至直接装不上。

检查当前版本：

```bash
node -v
```

如果输出是 `v18.x.x` 或更高，没问题。如果版本太低，或者压根没装过 Node.js，去官网下最新 LTS 版本就行：[nodejs.org](https://nodejs.org)

> 建议用 **nvm**（macOS/Linux）或 **nvm-windows** 管理 Node 版本，方便以后切换。

---

## 2. 大模型 API：三条路任选其一

Claude Code 本质上是个 AI 客户端，只要能给它一个可用的 API，它就能跑。不是非得连 Anthropic 官方不可。

| 路线 | 适合谁 | 网络要求 |
|------|--------|----------|
| Anthropic 官方 API | 想用最新 Claude 模型、体验最好 | 需要能访问 `api.anthropic.com`，国内需代理 |
| 第三方中转服务（如 OpenRouter） | 国内用户、想省去代理麻烦 | 访问国内或香港节点，通常没问题 |
| 国产大模型（DeepSeek、Qwen 等） | 纯国内环境、对价格敏感 | 直连国内 API，无网络障碍 |

三条路在后面的「接上大模型」那篇都会讲怎么配。这里只需要确定你打算走哪条，提前把 API Key 准备好。

**如果走官方路线**，要确认网络能通：

```bash
curl https://api.anthropic.com
```

超时或报错就需要配代理。常见本地代理写法：

```bash
export HTTPS_PROXY=http://127.0.0.1:7890
export HTTP_PROXY=http://127.0.0.1:7890
```

---

## 3. 账号与付费：选一条路就行

Claude Code 调用模型需要有 API Key，有三条路：

### 路线 A：Anthropic 官方 API Key（按量付费）

1. 去 [console.anthropic.com](https://console.anthropic.com) 注册账号
2. 进入 API Keys 页面，创建一个 Key
3. 绑定信用卡（Visa/Mastercard 为主，国内双币卡通常可以用）
4. 充值或开启自动充值

API Key 格式类似：`sk-ant-api03-xxxxxxxxxx`

**适合谁**：追求最好模型体验、偶尔使用或想精确控制花费的人。

### 路线 B：Claude Pro / Max 订阅

直接在 [claude.ai](https://claude.ai) 订阅 Pro（$20/月）或 Max（$100/月），订阅后 Claude Code 可以直接用订阅额度，不需要单独的 API Key。

**适合谁**：每天都在用、用量大的人，Max 订阅基本可以无限制跑。

### 路线 C：国产大模型 / 第三方中转

如果不想折腾代理，或者想控制成本，可以接 DeepSeek、Qwen、OpenRouter 等支持 OpenAI 兼容格式的服务。国内直连、价格低，部分任务效果也够用。

**适合谁**：纯国内网络环境、对成本敏感、愿意在效果上做一些取舍的人。

> 三条路可以随时切换，后面「接上大模型」和「省钱」两篇会具体讲怎么配置和选择。

---

## 4. 终端环境：Windows 用户多看一眼

Claude Code 在 **macOS 和 Linux** 上开箱即用。

**Windows 用户**有两个选择：

| 方式 | 推荐度 | 说明 |
|------|--------|------|
| WSL 2（Windows Subsystem for Linux） | ⭐⭐⭐ 推荐 | 完整的 Linux 环境，体验最接近原生 |
| PowerShell / Git Bash | ⭐⭐ 可用 | 直接在 Windows 上跑，部分功能可能受限 |

如果你没装过 WSL，在 PowerShell 里运行一行就能开始安装：

```powershell
wsl --install
```

重启后按提示完成 Ubuntu 初始化，然后在 WSL 终端里继续操作就行。

---

## 装前自查清单

对照检查一遍，全部打钩再去装：

- [ ] `node -v` 输出版本 ≥ 18
- [ ] 确定好走哪条模型路线（官方 API / Claude 订阅 / 国产模型），API Key 或账号已准备好
- [ ] 走官方路线的：`curl https://api.anthropic.com` 有响应（或已配好代理）
- [ ] Windows 用户：已装 WSL 2，或确认在 PowerShell 里可以正常用

准备好了，下一篇直接开始装。

