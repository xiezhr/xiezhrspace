import { arraySidebar } from "vuepress-theme-hope";
import { mysql } from "./growth/mysql/index.js";


export const growth = arraySidebar([
  "",
  {
    text: "IDEA使用",
    icon: "mdi:language-java",
    link: "idea/",
  },
  {
    text: "Git/GitHub",
    icon: "mdi:git",
    link: "git/",
  },
  {
    text: "Docker",
    icon: "mdi:docker",
    link: "docker/",
  },
  {
    text: "Maven",
    icon: "mdi:apache",
    link: "maven/",
  },
  {
    text: "Nginx",
    icon: "mdi:server-network",
    link: "nginx/",
  },
  {
    text: "Linux",
    icon: "mdi:linux",
    link: "linux/",
  },
  mysql,
]);