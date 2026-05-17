import { arraySidebar } from "vuepress-theme-hope";
import { linuxBasics } from "./basics.js";
import { linuxFileOperations } from "./file-operations.js";
import { linuxSystemNetwork } from "./system-network.js";
import { linuxProcessService } from "./process-service.js";
import { linuxDevEnvironment } from "./dev-environment.js";
import { linuxTroubleshooting } from "./troubleshooting.js";

export const linux = arraySidebar([
  "",
  linuxBasics,
  linuxFileOperations,
  linuxSystemNetwork,
  linuxProcessService,
  linuxDevEnvironment,
  linuxTroubleshooting,
]);
