import { arraySidebar } from "vuepress-theme-hope";
import { pbBasis } from "./pb/basis.js";
import { pbCases } from "./pb/cases.js";

export const pb = arraySidebar([
  "",
  {
    text: "PB学习路线图",
    icon: "mdi:map-marker-path",
    link: "roadmap",
  },
  {
    text: "简单介绍",
    icon: "mdi:information-outline",
    link: "intro/",
  },
  {
    text: "PB资源汇总",
    icon: "mdi:package-variant-closed",
    link: "tools",
  },
  pbBasis,
  pbCases,
]);