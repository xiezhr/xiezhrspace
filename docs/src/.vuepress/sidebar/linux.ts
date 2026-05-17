import { arraySidebar } from "vuepress-theme-hope";
import { linuxBasics } from "./growth/linux/basics.js";
import { linuxFileOperations } from "./growth/linux/file-operations.js";
import { linuxSystemNetwork } from "./growth/linux/system-network.js";
import { linuxProcessService } from "./growth/linux/process-service.js";
import { linuxDevEnvironment } from "./growth/linux/dev-environment.js";
import { linuxTroubleshooting } from "./growth/linux/troubleshooting.js";

export const linux = arraySidebar([
  "",
  linuxBasics,
  linuxFileOperations,
  linuxSystemNetwork,
  linuxProcessService,
  linuxDevEnvironment,
  linuxTroubleshooting,
]);
