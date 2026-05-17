import { sidebar, arraySidebar } from "vuepress-theme-hope";
import { pbBasis } from "./basis.js";
import { pbCases } from "./cases.js";

export const pbSidebar = sidebar({
  "/pb/basis/": arraySidebar([pbBasis]),
  "/pb/cases/": arraySidebar([pbCases]),
});