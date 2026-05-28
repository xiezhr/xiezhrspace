import { arraySidebar } from "vuepress-theme-hope";
import { mavenBasics } from "./basics.js";
import { mavenDependency } from "./dependency.js";
import { mavenLifecyclePlugins } from "./lifecycle-plugins.js";
import { mavenMultiModule } from "./multi-module.js";
import { mavenNexusDeploy } from "./nexus-deploy.js";
import { mavenEnterprise } from "./enterprise.js";

export const maven = arraySidebar([
  "",
  mavenBasics,
  mavenDependency,
  mavenLifecyclePlugins,
  mavenMultiModule,
  mavenNexusDeploy,
  mavenEnterprise,
]);
