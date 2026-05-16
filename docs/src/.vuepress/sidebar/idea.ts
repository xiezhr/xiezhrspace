import { arraySidebar } from "vuepress-theme-hope";
import { ideaBasics } from "./idea/basics.js";
import { ideaEditing } from "./idea/editing.js";
import { ideaDebugging } from "./idea/debugging.js";
import { ideaVersionControl } from "./idea/version-control.js";
import { ideaPlugins } from "./idea/plugins.js";
import { ideaAdvanced } from "./idea/advanced.js";

export const idea = arraySidebar([
  "",
  ideaBasics,
  ideaEditing,
  ideaDebugging,
  ideaVersionControl,
  ideaPlugins,
  ideaAdvanced,
]);
