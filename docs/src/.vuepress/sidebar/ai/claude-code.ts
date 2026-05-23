import { arraySidebar } from "vuepress-theme-hope";

export const claudeCode = arraySidebar([
  {
    text: "序章",
    icon: "mdi:book-open-variant",
    prefix: "00-start/",
    children: [
      "what-is-it",
      "how-it-works",
    ],
  },
  {
    text: "第一篇：安装与配置",
    icon: "mdi:cog-outline",
    prefix: "01-setup/",
    children: [
      "preparation",
      "installation",
      "ide-integration",
      "connect-model",
      "model-switch",
      "config",
    ],
  },
  {
    text: "第二篇：开始对话",
    icon: "mdi:chat-outline",
    prefix: "02-first-talk/",
    children: [
      "opening",
      "onboard-project",
      "ask-well",
      "common-tasks",
      "interview-trick",
    ],
  },
  {
    text: "第三篇：工作模式",
    icon: "mdi:swap-horizontal",
    prefix: "03-modes/",
    children: [
      "overview",
      "plan-and-auto",
      "when-to-use-which",
    ],
  },
  {
    text: "第四篇：项目规矩与权限",
    icon: "mdi:shield-lock-outline",
    prefix: "04-rules/",
    children: [
      "claude-md",
      "rule-levels",
      "permissions",
    ],
  },
  {
    text: "第五篇：会话与上下文管理",
    icon: "mdi:history",
    prefix: "05-session/",
    children: [
      "context-window",
      "clear-and-rewind",
      "long-session-tricks",
    ],
  },
  {
    text: "第六篇：省钱",
    icon: "mdi:cash-multiple",
    prefix: "06-cost/",
    children: [
      "pricing",
      "model-compare",
      "save-token",
    ],
  },
  {
    text: "第七篇：扩展能力",
    icon: "mdi:puzzle-outline",
    prefix: "07-extend/",
    children: [
      "slash-commands",
      "skills",
      "task-skill",
      "ref-skill",
      "image-input",
      "hooks-and-mcp",
      "subagent",
      "headless",
      "plugin-market",
    ],
  },
  {
    text: "第八篇：团队协作",
    icon: "mdi:account-group-outline",
    prefix: "08-team/",
    children: [
      "git-and-worktree",
      "multi-agent",
      "ci-cd",
    ],
  },
  {
    text: "第九篇：实战——日报生成器",
    icon: "mdi:rocket-launch-outline",
    prefix: "09-autodaily/",
    children: [
      "00-intro",
      "01-plan-and-rules",
      "02-core-dev",
      "03-cli-and-skill",
      "04-auto-check",
      "05-connect-feishu",
      "06-publish",
    ],
  },
  {
    text: "附录",
    icon: "mdi:book-alphabet",
    prefix: "appendix/",
    children: [
      "cheatsheet",
      "troubleshooting",
      "security",
    ],
  },
]);

