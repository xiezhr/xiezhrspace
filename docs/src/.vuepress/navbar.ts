import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  {
    text: "PB学习",
    icon: "file-icons:powerbuilder",
    link: "/pb/",
  },
  {
    text: "AI编程",
    icon: "robot",
    link: "/ai/",
  },
  {
    text: "技术成长",
    icon: "mdi:chart-line",
    link: "/growth/",
  },
  "blog",
]);
