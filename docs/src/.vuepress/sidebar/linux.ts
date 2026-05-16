import { arraySidebar } from "vuepress-theme-hope";
import { linuxBasics } from "./linux/basics.js";
import { linuxFileOperations } from "./linux/file-operations.js";
import { linuxSystemNetwork } from "./linux/system-network.js";
import { linuxProcessService } from "./linux/process-service.js";
import { linuxDevEnvironment } from "./linux/dev-environment.js";
import { linuxTroubleshooting } from "./linux/troubleshooting.js";

export const linux = arraySidebar([
  "",
  linuxBasics,
  linuxFileOperations,
  linuxSystemNetwork,
  linuxProcessService,
  linuxDevEnvironment,
  linuxTroubleshooting,
]);
