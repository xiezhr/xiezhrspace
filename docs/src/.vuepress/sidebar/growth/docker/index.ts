import { arraySidebar } from "vuepress-theme-hope";
import { dockerBasics } from "./basics.js";
import { dockerImagesContainers } from "./images-containers.js";
import { dockerDockerfile } from "./dockerfile.js";
import { dockerCompose } from "./compose.js";
import { dockerNetworkStorage } from "./network-storage.js";
import { dockerDeploy } from "./deploy.js";

export const docker = arraySidebar([
  "",
  dockerBasics,
  dockerImagesContainers,
  dockerDockerfile,
  dockerCompose,
  dockerNetworkStorage,
  dockerDeploy,
]);
