---
date: 2026-05-26
title: 配置系统
---

# 配置系统

> 装好 Claude Code 之后，你会发现它开箱即用——但"将就能用"和"用得顺手"之间，差的就是这篇配置。从给项目写说明书，到控制 Claude 的行为边界，把这几个地方设好，每次开对话都能少打一半字。

---

## 配置分三层，优先级从低到高

Claude Code 的配置不是只有一个地方，而是分层叠加的：

| 层级 | 位置 | 作用范围 |
|------|------|----------|
| **全局配置** | `~/.claude/settings.json` | 所有项目、所有会话 |
| **项目配置** | `.claude/settings.json`（项目根目录） | 只影响当前项目 |
| **项目说明** | `CLAUDE.md`（项目根目录） | 给 Claude 读的上下文说明 |
| **环境变量** | 终端里 `export` 或 shell 配置文件 | 运行时覆盖，优先级最高 |

规则很简单：**优先级越高的配置，会覆盖低级的同名设置**。项目配置会覆盖全局，环境变量覆盖一切。

---

## CLAUDE.md：最重要的配置，没有之一

如果整篇文章你只记一个东西，记这个。

`CLAUDE.md` 是放在项目根目录的一个普通 Markdown 文件。每次 Claude Code 启动时，它会自动把这个文件读进来，当成"项目背景知识"。你在里面写什么，Claude 就知道什么。

**它能做什么**：

- 告诉 Claude 这个项目用的什么技术栈
- 规定代码风格和规范
- 列出常用命令（测试、启动、部署）
- 交代注意事项（"不要动 legacy 目录"）
- 描述业务背景，让 Claude 理解你的场景

**一个真实的例子**：

```markdown
# 项目：电商后台管理系统

## 技术栈
- 后端：Spring Boot 3.2 + MyBatis Plus
- 前端：Vue 3 + TypeScript + Element Plus
- 数据库：MySQL 8.0

## 开发规范
- Java 代码用 4 空格缩进
- 新功能必须写单元测试
- 接口注释用中文，commit message 用英文

## 常用命令
- `mvn test` — 跑单元测试
- `docker-compose up -d` — 启动本地开发环境
- `mvn spring-boot:run` — 启动后端服务

## 注意事项
- `src/legacy/` 目录是历史遗留代码，不要动，也不要参考
- 数据库连接配置在 `application-local.yml`，不要提交到 git
```

有了这个文件，你每次开会话不需要先解释一遍"这个项目是干什么的"，Claude 上来就能在正确的上下文里工作。

### CLAUDE.md 放在哪里？

| 位置 | 适用范围 |
|------|----------|
| 项目根目录 `CLAUDE.md` | 只影响当前项目 |
| `~/.claude/CLAUDE.md` | 全局生效，所有项目都能读到 |

全局那个适合写你个人的编程习惯，比如"我偏好函数式写法"、"注释用中文"——这些对所有项目都适用的偏好，放全局一次搞定。

---

## settings.json：用命令管理行为设置

Claude Code 提供了 `claude config` 命令，不用手动编辑 JSON 文件：

```bash
# 查看所有当前配置
claude config list

# 查询某一项
claude config get model

# 修改某一项
claude config set model claude-opus-4-5

# 删除某一项（恢复默认）
claude config delete model
```

默认修改的是**全局配置**，加 `--local` 参数就只改当前项目：

```bash
# 只给当前项目设置模型
claude config set --local model claude-haiku-3-5
```

### 常用配置项速查

| 配置项 | 说明 | 示例值 |
|--------|------|--------|
| `model` | 默认使用的模型 | `claude-sonnet-4-5` |
| `theme` | 终端配色主题 | `dark` / `light` |
| `autoUpdates` | 是否自动更新 Claude Code | `true` / `false` |
| `preferredNotifChannel` | 长任务完成后的通知方式 | `terminal_bell` |

---

## 权限控制：让 Claude 只能做你允许的事

Claude Code 在帮你执行任务时，默认会弹出确认框让你审批每个操作（读文件、写文件、执行命令等）。这个行为可以通过权限配置调整。

### 放行特定操作

如果你信任某类操作，可以设成"总是允许"，省去每次确认：

```bash
# 允许执行 npm test（不再弹确认框）
claude config set --local allowedTools '["Bash(npm test:*)", "Bash(npm run:*)"]'
```

### settings.json 的结构

如果你更习惯直接编辑文件，全局配置文件在 `~/.claude/settings.json`，项目配置在 `.claude/settings.json`，格式如下：

```json
{
  "model": "claude-sonnet-4-5",
  "theme": "dark",
  "permissions": {
    "allow": [
      "Bash(npm test:*)",
      "Bash(git diff:*)",
      "Bash(git log:*)"
    ],
    "deny": [
      "Bash(rm -rf:*)"
    ]
  }
}
```

`allow` 里的操作直接放行，`deny` 里的操作永远拒绝，两者都不在的操作每次弹确认框。

---

## 环境变量速查表

环境变量优先级最高，临时覆盖任何配置都可以用这个方式。

| 变量名 | 作用 |
|--------|------|
| `ANTHROPIC_API_KEY` | Anthropic 官方 API Key |
| `ANTHROPIC_BASE_URL` | 自定义 API 地址（中转服务填这里） |
| `ANTHROPIC_MODEL` | 覆盖默认模型 |
| `HTTPS_PROXY` / `HTTP_PROXY` | 代理地址 |
| `CLAUDE_CONFIG_DIR` | 指定配置目录（非默认路径时用） |

**临时用一次**（只在当前终端会话生效）：

```bash
export ANTHROPIC_MODEL="claude-opus-4-5"
claude
```

**永久生效**（写进 shell 配置文件）：

```bash
echo 'export ANTHROPIC_API_KEY="sk-ant-api03-xxxxxxxxxx"' >> ~/.zshrc
source ~/.zshrc
```

---

## 推荐的配置结构

一个用起来顺手的完整配置，一般长这样：

```
~/.claude/
├── settings.json       # 全局行为设置（主题、模型默认值等）
└── CLAUDE.md           # 个人编程习惯（对所有项目生效）

my-project/
├── CLAUDE.md           # 项目说明（技术栈、规范、常用命令）
└── .claude/
    └── settings.json   # 项目级覆盖（比如给这个项目用不同模型）
```

**从哪里开始？**

1. 先在项目根目录写一个 `CLAUDE.md`，把技术栈和代码规范写进去
2. 全局配置不动，用默认值就行
3. 遇到需要覆盖的场景，再用 `claude config set` 或环境变量临时处理

---

## 小结

- **CLAUDE.md** 是最重要的配置，给项目写说明书，Claude 上来就知道背景
- **`claude config` 命令**管理行为设置，全局 or 项目级都支持
- **权限配置**控制哪些操作自动放行、哪些永远拒绝
- **环境变量**优先级最高，临时覆盖用这个
- 配置层次：全局 → 项目 → 环境变量，后者覆盖前者
