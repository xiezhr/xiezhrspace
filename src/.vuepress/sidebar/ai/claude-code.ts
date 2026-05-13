import { arraySidebar } from "vuepress-theme-hope";

export const claudeCode = arraySidebar([
  {
    text: "序章",
    prefix: "00-start/",
    children: [
      "what-is-it",
      "how-it-works",
    ],
  },
  {
    text: "第一篇：装起来",
    prefix: "01-setup/",
    children: [
      "preparation",
      "installation",
      "connect-model",
    ],
  },
  {
    text: "第二篇：第一次对话",
    prefix: "02-first-talk/",
    children: [
      "opening",
      "ask-well",
      "interview-trick",
    ],
  },
  {
    text: "第三篇：四种工作模式",
    prefix: "03-modes/",
    children: [
      "overview",
      "plan-and-auto",
      "when-to-use-which",
    ],
  },
  {
    text: "第四篇：给项目立规矩",
    prefix: "04-rules/",
    children: [
      "claude-md",
      "levels-and-growth",
    ],
  },
  {
    text: "第五篇：会话管理",
    prefix: "05-session/",
    children: [
      "clear-and-rewind",
      "long-session-tricks",
    ],
  },
  {
    text: "第六篇：省钱",
    prefix: "06-cost/",
    children: [
      "save-token",
    ],
  },
  {
    text: "第七篇：扩展能力",
    prefix: "07-extend/",
    children: [
      "skills",
      "hooks-and-mcp",
      "subagent",
    ],
  },
  {
    text: "第八篇：多人协作",
    prefix: "08-team/",
    children: [
      "git-and-worktree",
      "multi-agent",
    ],
  },
  {
    text: "第九篇：实战——日报生成器",
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
  "appendix/cheatsheet",
]);
