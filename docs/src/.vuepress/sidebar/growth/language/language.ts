import { arraySidebar } from "vuepress-theme-hope";

export const language = arraySidebar([
  "learning",
  {
    text: "pb",
    icon: "powerbuilder",
    link: "pb/",
    prefix: "pb/",
    children: [
      "intro/",
      "guide/",
      "types/",
      "operators/",
      "function/",
      "object/",
      "browser/",
      "es6/",
    ],
  },
  {
    text: "Java",
    icon: "java",
    link: "java/",
    prefix: "java/",
    children: [
        "intro/", 
        "basics/", 
        "advanced/"
    ],
  },
  {
    text: "Python",
    icon: "python",
    link: "python/",
    prefix: "python/",
    children: [
      "intro/",
      "guide/",
      "function/",
      "advance/",
      "functional-programming/",
      "module/",
      "oop/",
    ],
  },
  "python/",
  "json/",
  "yaml/",
  {
    text: "Markdown",
    icon: "markdown",
    link: "markdown/",
    prefix: "markdown/",
    children: [
        "intro", 
        "block",
        "inline",
        "extend",
         "emoji/"
    ],
  },
  "linter/",
]);