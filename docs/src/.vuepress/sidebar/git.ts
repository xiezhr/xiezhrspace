import { arraySidebar } from "vuepress-theme-hope";
import { gitCore } from "./growth/git/core.js";
import { gitAdvanced } from "./growth/git/advanced.js";
import { gitGithub } from "./growth/git/github.js";
import { gitGitlab } from "./growth/git/gitlab.js";
import { gitWorkflow } from "./growth/git/workflow.js";
import { gitTools } from "./growth/git/tools.js";

export const git = arraySidebar([
  "",
  gitCore,
  gitAdvanced,
  gitGithub,
  gitGitlab,
  gitWorkflow,
  gitTools,
]);
