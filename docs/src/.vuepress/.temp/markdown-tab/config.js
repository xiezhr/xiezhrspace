import { CodeTabs } from "E:/xiezhrspace/docs/node_modules/.pnpm/@vuepress+plugin-markdown-t_a6ed372083d0558f5ff4d9d56a4f8f6a/node_modules/@vuepress/plugin-markdown-tab/dist/client/components/CodeTabs.js";
import { Tabs } from "E:/xiezhrspace/docs/node_modules/.pnpm/@vuepress+plugin-markdown-t_a6ed372083d0558f5ff4d9d56a4f8f6a/node_modules/@vuepress/plugin-markdown-tab/dist/client/components/Tabs.js";

export default {
  enhance: ({ app }) => {
    app.component("CodeTabs", CodeTabs);
    app.component("Tabs", Tabs);
  },
};
