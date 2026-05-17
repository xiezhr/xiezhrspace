import { arraySidebar } from "vuepress-theme-hope";
import { claudeCodeBasics } from "./basics.js";
import { claudeCodeSetup } from "./setup.js";
import { claudeCodeFirstTalk } from "./first-talk.js";
import { claudeCodeModes } from "./modes.js";
import { claudeCodeRules } from "./rules.js";
import { claudeCodeSession } from "./session.js";
import { claudeCodeCost } from "./cost.js";
import { claudeCodeExtend } from "./extend.js";
import { claudeCodeTeam } from "./team.js";
import { claudeCodeAutodaily } from "./autodaily.js";
import { claudeCodeAppendix } from "./appendix.js";

export const claudeCode = arraySidebar([
  "",
  claudeCodeBasics,
  claudeCodeSetup,
  claudeCodeFirstTalk,
  claudeCodeModes,
  claudeCodeRules,
  claudeCodeSession,
  claudeCodeCost,
  claudeCodeExtend,
  claudeCodeTeam,
  claudeCodeAutodaily,
  claudeCodeAppendix,
]);