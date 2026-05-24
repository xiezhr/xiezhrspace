---
title: 安装：官方路线和国内路线
---

# 安装：官方路线和国内路线

> 上一篇把准备工作交代清楚了，这篇直接动手。安装本身就一条命令，麻烦的是后面怎么配 API——根据你选的路线，后半段走法不一样。

## 第一步：装 Claude Code（人人一样）

Claude Code 是一个 npm 全局包，装法固定：

```bash
npm install -g @anthropic-ai/claude-code
```

装完验证一下：

```bash
claude --version
```

能打印出版本号就说明装好了。如果提示 `command not found`，通常是 npm 全局 bin 目录没有加进 `PATH`，把下面这行加进 `~/.bashrc` 或 `~/.zshrc` 再重开终端：

```bash
export PATH="$(npm prefix -g)/bin:$PATH"
```

> Windows 用户如果在 WSL 里操作，和上面完全一样。如果在 PowerShell 里操作，npm 全局路径通常已经自动加进系统 PATH，装完直接试 `claude --version` 就行。

---

## 第二步：配 API——根据路线分道走

### 官方路线：用 Anthropic API Key

把 API Key 设为环境变量，然后直接启动：

```bash
export ANTHROPIC_API_KEY="sk-ant-api03-xxxxxxxxxx"
claude
```

想要永久生效，把这行加进 `~/.bashrc` 或 `~/.zshrc`：

```bash
echo 'export ANTHROPIC_API_KEY="sk-ant-api03-xxxxxxxxxx"' >> ~/.zshrc
source ~/.zshrc
```

启动后 Claude Code 会显示欢迎界面，输入任意一句话测试一下能不能得到回复。

**如果网络连不上**，先配代理再启动：

```bash
export HTTPS_PROXY=http://127.0.0.1:7890
export HTTP_PROXY=http://127.0.0.1:7890
export ANTHROPIC_API_KEY="sk-ant-api03-xxxxxxxxxx"
claude
```

同样可以把这几行写进 shell 配置文件，省去每次手动设置。

---

### 官方路线：用 Claude Pro / Max 订阅

不需要手动设置 API Key。直接运行：

```bash
claude
```

首次启动会引导你登录 Anthropic 账号，用浏览器完成授权即可。登录成功后，Claude Code 会自动使用你的订阅额度。

---

### 国内路线：第三方中转服务

以 OpenRouter 为例（其他中转服务类似）：

1. 去 [openrouter.ai](https://openrouter.ai) 注册并获取 API Key
2. 配置环境变量，把 API 地址指向中转端点：

```bash
export ANTHROPIC_BASE_URL="https://openrouter.ai/api/v1"
export ANTHROPIC_API_KEY="sk-or-xxxxxxxxxx"   # OpenRouter 的 Key
claude
```

`ANTHROPIC_BASE_URL` 这个变量让 Claude Code 把请求发到你指定的地址，而不是默认的 Anthropic 官方地址。只要中转服务兼容 Anthropic API 格式，就能直接用。

---

### 国内路线：国产大模型（DeepSeek / Qwen 等）

国产模型通常暴露的是 OpenAI 兼容格式的接口，而 Claude Code 原生对接的是 Anthropic 格式。要连起来，需要一个中间层做格式转换。

推荐用 **LiteLLM Proxy**，它支持把大量模型统一转成 Anthropic 格式：

```bash
# 安装 LiteLLM
pip install litellm[proxy]

# 启动代理，以 DeepSeek 为例
litellm --model deepseek/deepseek-chat --api_key "你的DeepSeek Key"
```

LiteLLM 默认监听 `http://localhost:4000`，然后让 Claude Code 指向它：

```bash
export ANTHROPIC_BASE_URL="http://localhost:4000"
export ANTHROPIC_API_KEY="任意字符串"   # LiteLLM 不校验这个值，随便填
claude
```

> 除了 LiteLLM，也可以用 [one-api](https://github.com/songquanpeng/one-api) 等其他转换工具，原理相同。

---

## 验证：装对了没有

不管走哪条路线，启动后在提示符里输入：

```
你好，说一句话测试一下
```

- 能得到回复 → 配置成功
- 卡住不动 → 网络或 API Key 有问题，回去检查环境变量
- 报 `401 Unauthorized` → API Key 不对或额度为零
- 报 `Connection refused` → 中转服务没启动，或端口不对

---

## 小结

| 路线 | 关键环境变量 | 备注 |
|------|-------------|------|
| 官方 API Key | `ANTHROPIC_API_KEY` | 国内需配代理 |
| Claude 订阅 | 无需变量 | 首次启动走浏览器授权 |
| 第三方中转 | `ANTHROPIC_BASE_URL` + `ANTHROPIC_API_KEY` | Key 填中转服务的 Key |
| 国产模型 | `ANTHROPIC_BASE_URL`（指向本地转换层）+ `ANTHROPIC_API_KEY` | 需先启动 LiteLLM 等转换工具 |

装好之后，下一篇讲怎么把 Claude Code 接进 VSCode 和 Cursor。

