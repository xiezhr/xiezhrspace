import { arraySidebar } from "vuepress-theme-hope";

export const growth = arraySidebar([
  "",
  {
    text: "IDEA使用",
    icon: "mdi:language-java",
    link: "idea/",
    prefix: "idea/",
    collapsible: true,
    children: [
      "install",
      "shortcuts",
      "debug",
      "plugins",
    ],
  },
  {
    text: "Git/GitHub",
    icon: "mdi:git",
    link: "git/",
  },
  {
    text: "Linux",
    icon: "mdi:linux",
    link: "linux/",
  },
  {
    text: "SpringBoot+Vue",
    icon: "mdi:vuejs",
    link: "springboot-vue/",
    prefix: "springboot-vue/",
    collapsible: true,
    children: [
      "java-basic",
      "springboot",
      "vue",
      "project",
    ],
  },
]);
