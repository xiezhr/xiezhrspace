import { defineUserConfig } from "vuepress";

import theme from "./theme.js";

export default defineUserConfig({
  base: "/xiezhrspace/",

  lang: "zh-CN",
  title: "程序员晓凡",
  description: "PB开发者的AI转型指南",

  theme,

  // SEO: 关键词
  head: [
    ["meta", { name: "keywords", content: "PowerBuilder,PB,AI编程,Vibe Coding,Cursor,PB迁移Java,PB转型,Spring Boot,Vue3" }],
    ["meta", { name: "author", content: "程序员晓凡" }],
    ["link", { rel: "icon", href: "/logo.png" }],
  ],

  // 和 PWA 一起启用
  // shouldPrefetch: false,
});
