import { sidebar } from "vuepress-theme-hope";
import { claudeCode } from "./claude-code.js";
import { cursor } from "./cursor.js";
import { openclaw } from "./openclaw.js";
import { opencode } from "./opencode.js";
import { hermesAgent } from "./hermes-agent.js";
import { codex } from "./codex.js";

export const aiCodingSidebar = sidebar({
  "/ai/claude-code/": claudeCode,
  "/ai/cursor/": cursor,
  "/ai/openclaw/": openclaw,
  "/ai/opencode/": opencode,
  "/ai/hermes-agent/": hermesAgent,
  "/ai/codex/": codex,
});
