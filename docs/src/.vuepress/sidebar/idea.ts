import { arraySidebar } from "vuepress-theme-hope";
import { ideaBasics } from "./growth/idea/basics.js";
import { ideaEditing } from "./growth/idea/editing.js";
import { ideaDebugging } from "./growth/idea/debugging.js";
import { ideaVersionControl } from "./growth/idea/version-control.js";
import { ideaPlugins } from "./growth/idea/plugins.js";
import { ideaAdvanced } from "./growth/idea/advanced.js";

export const idea = arraySidebar([
  "",
  ideaBasics,
  ideaEditing,
  ideaDebugging,
  ideaVersionControl,
  ideaPlugins,
  ideaAdvanced,
]);
