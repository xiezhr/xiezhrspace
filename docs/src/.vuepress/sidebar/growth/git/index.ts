import { arraySidebar } from "vuepress-theme-hope";
import { gitCore } from "./core.js";
import { gitAdvanced } from "./advanced.js";
import { gitGithub } from "./github.js";
import { gitGitlab } from "./gitlab.js";
import { gitWorkflow } from "./workflow.js";
import { gitTools } from "./tools.js";

export const git = arraySidebar([
  "",
  gitCore,
  gitAdvanced,
  gitGithub,
  gitGitlab,
  gitWorkflow,
  gitTools,
]);
