import { arraySidebar } from "vuepress-theme-hope";
import { ideaBasics } from "./basics.js";
import { ideaEditing } from "./editing.js";
import { ideaDebugging } from "./debugging.js";
import { ideaVersionControl } from "./version-control.js";
import { ideaPlugins } from "./plugins.js";
import { ideaAdvanced } from "./advanced.js";

export const idea = arraySidebar([
  "",
  ideaBasics,
  ideaEditing,
  ideaDebugging,
  ideaVersionControl,
  ideaPlugins,
  ideaAdvanced,
]);
