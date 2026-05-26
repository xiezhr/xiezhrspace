---
date: 2026-05-26
title: 接上大模型：官方连不上怎么办
---

# 接上大模型：官方连不上怎么办

> 安装篇给了几条路线，这篇把每条路的细节补全——尤其是国内用户最头疼的"官方连不上"怎么绕过去，以及国产模型怎么接进来跑起来。

## 先搞清楚为什么"连不上"

Claude Code 默认把请求发往 `api.anthropic.com`。国内访问这个地址，要么超时，要么断断续续，根本原因是 GFW 对 Anthropic 域名的干扰。

有三种绕法，按麻烦程度从低到高排：

| 方案 | 麻烦程度 | 模型质量 | 价格 |
|------|----------|----------|------|
| 本地代理（透传官方 API） | ⭐ 最省事 | ✅ 原版 Claude | 按官方 API 计费 |
| 第三方中转服务（OpenRouter 等） | ⭐⭐ 注册即用 | ✅ 原版 Claude（加价） | 略高于官方 |
| 国产模型（DeepSeek / Qwen 等） | ⭐⭐⭐ 需转换层 | 🔶 效果略逊 | 极低 |

---

## 方案一：本地代理透传官方 API

如果你本地已经有代理工具（Clash、Surge、sing-box 等），只需要让 Claude Code 走这个代理就行，模型还是官方 Claude，体验无损。

**配置方式**：

```bash
export HTTPS_PROXY=http://127.0.0.1:7890
export HTTP_PROXY=http://127.0.0.1:7890
export ANTHROPIC_API_KEY="sk-ant-api03-xxxxxxxxxx"
claude
```

端口 `7890` 换成你代理工具实际监听的端口。

**写进 shell 配置文件**，以后打开终端自动生效：

```bash
# 加进 ~/.zshrc 或 ~/.bashrc
export HTTPS_PROXY=http://127.0.0.1:7890
export HTTP_PROXY=http://127.0.0.1:7890
export ANTHROPIC_API_KEY="sk-ant-api03-xxxxxxxxxx"
```

加完执行 `source ~/.zshrc` 使其生效。

**验证是否走通**：

```bash
curl -x http://127.0.0.1:7890 https://api.anthropic.com
```

返回任何 JSON 响应即表示代理配置正常。

---

## 方案二：第三方中转服务

不想折腾本地代理，可以直接用中转服务。它们把 Anthropic 的 API 搭在海外，你访问它们的国内/香港节点，它们帮你转发到 Anthropic。

### OpenRouter

[openrouter.ai](https://openrouter.ai) 是目前最常用的中转聚合平台，支持 Claude、GPT-4、Gemini 等众多模型，统一接口。

1. 注册账号，充值（支持信用卡，有免费额度）
2. 进入 Keys 页面创建 API Key
3. 配置 Claude Code：

```bash
export ANTHROPIC_BASE_URL="https://openrouter.ai/api/v1"
export ANTHROPIC_API_KEY="sk-or-xxxxxxxxxx"
claude
```

> OpenRouter 对 Claude 模型的调用价格通常比官方高 10–20%，但省去了代理麻烦，对国内用户很实用。

### 其他中转服务

除了 OpenRouter，还有一些国内团队搭建的 Anthropic 中转节点，格式兼容 Anthropic API，配置方式相同，只是把 `ANTHROPIC_BASE_URL` 换成对应地址：

```bash
export ANTHROPIC_BASE_URL="https://你的中转服务地址/v1"
export ANTHROPIC_API_KEY="中转服务给你的 Key"
claude
```

**注意**：使用第三方中转要留意数据安全——你的代码内容会经过对方服务器，选择时优先考虑口碑好、有隐私承诺的服务商。

---

## 方案三：接国产大模型

国产模型（DeepSeek、Qwen、Kimi 等）暴露的是 **OpenAI 兼容格式**的接口，而 Claude Code 原生对接 Anthropic 格式，两者不能直接连。需要一个中间层做格式转换。

### 用 LiteLLM Proxy 转换格式

LiteLLM 是一个开源工具，能把各种模型的接口统一转成 Anthropic 格式。

**安装**：

```bash
pip install 'litellm[proxy]'
```

**以 DeepSeek 为例启动**：

```bash
litellm \
  --model deepseek/deepseek-chat \
  --api_key "你的 DeepSeek API Key" \
  --port 4000
```

DeepSeek API Key 在 [platform.deepseek.com](https://platform.deepseek.com) 注册后获取，价格极低（约 $0.001/千 Token）。

**让 Claude Code 指向本地转换层**：

```bash
export ANTHROPIC_BASE_URL="http://localhost:4000"
export ANTHROPIC_API_KEY="placeholder"   # LiteLLM 不校验此值，随便填
claude
```

**其他国产模型的 LiteLLM 写法**：

```bash
# Qwen（通义千问）
litellm --model openai/qwen-plus --api_base https://dashscope.aliyuncs.com/compatible-mode/v1 --api_key "你的阿里云 Key"

# Kimi（Moonshot）
litellm --model openai/moonshot-v1-8k --api_base https://api.moonshot.cn/v1 --api_key "你的 Moonshot Key"
```

> 国产模型的代码理解能力相比 Claude 3.7 Sonnet 有差距，适合日常轻量任务；复杂重构或大型项目分析建议还是用官方 Claude。

### 用配置文件管理 LiteLLM

频繁启动命令行麻烦，可以把配置写成文件：

```yaml
# litellm_config.yaml
model_list:
  - model_name: my-claude   # 这里是你自己起的别名，随便写
    litellm_params:
      model: deepseek/deepseek-chat
      api_key: "你的 DeepSeek Key"
```

> LiteLLM 里的 `model_name` 是你自己定义的别名，和 Claude Code 的 `--model` 参数没有关系。Claude Code 把请求发给本地代理，代理再映射到实际模型，两边名字不需要一致。

启动时指定配置文件：

```bash
litellm --config litellm_config.yaml --port 4000
```

---

## 快速排查：连不上时怎么定位问题

| 现象 | 可能原因 | 解法 |
|------|----------|------|
| 启动后卡住，无任何输出 | 网络不通，请求超时 | 检查代理是否开启，或切换中转服务 |
| `401 Unauthorized` | API Key 错误或过期 | 确认 Key 是否复制正确、账户是否有余额 |
| `Connection refused` | 本地转换层未启动 | 先启动 LiteLLM，再启动 Claude Code |
| `Model not found` | 模型名称不对 | 检查 LiteLLM 配置里的 model_name |
| 回复乱码或格式异常 | 中转服务兼容性问题 | 换一个中转服务或换模型 |

---

## 小结

| 方案 | 核心变量 | 适合场景 |
|------|---------|----------|
| 本地代理 | `HTTPS_PROXY` + `ANTHROPIC_API_KEY` | 有代理工具、追求原版体验 |
| OpenRouter 中转 | `ANTHROPIC_BASE_URL` + `ANTHROPIC_API_KEY` | 没有代理、不想自己维护 |
| 国产模型（LiteLLM） | `ANTHROPIC_BASE_URL`（本地端口）+ 任意 Key | 纯国内环境、极低成本 |

> **嫌手动改环境变量麻烦？** [CC Switch](https://www.ccswitch.io/zh/) 是一个开源桌面应用，在 GUI 界面里管理多个 Provider，点一下就切换，同时显示用量和费用，不需要手动改任何配置文件。下一篇「模型选择与切换」里有详细介绍。

连上之后，下一篇讲模型选择与切换——不同任务用不同模型，省钱又高效。

