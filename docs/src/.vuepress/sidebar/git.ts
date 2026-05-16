import { arraySidebar } from "vuepress-theme-hope";
import { gitCore } from "./git/core.js";
import { gitAdvanced } from "./git/advanced.js";
import { gitGithub } from "./git/github.js";
import { gitGitlab } from "./git/gitlab.js";
import { gitWorkflow } from "./git/workflow.js";
import { gitTools } from "./git/tools.js";

export const git = arraySidebar([
  "",
  gitCore,
  gitAdvanced,
  gitGithub,
  gitGitlab,
  gitWorkflow,
  gitTools,
]);
