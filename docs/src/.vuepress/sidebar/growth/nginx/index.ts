import { arraySidebar } from "vuepress-theme-hope";
import { nginxBasics } from "./basics.js";
import { nginxConfig } from "./config.js";
import { nginxReverseProxy } from "./reverse-proxy.js";
import { nginxLoadBalance } from "./load-balance.js";
import { nginxHttpsSecurity } from "./https-security.js";
import { nginxHaOptimization } from "./ha-optimization.js";

export const nginx = arraySidebar([
  "",
  nginxBasics,
  nginxConfig,
  nginxReverseProxy,
  nginxLoadBalance,
  nginxHttpsSecurity,
  nginxHaOptimization,
]);
