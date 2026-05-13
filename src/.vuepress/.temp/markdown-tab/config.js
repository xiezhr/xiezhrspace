import { CodeTabs } from "/home/runner/work/xiezhrspace/xiezhrspace/docs/node_modules/.pnpm/@vuepress+plugin-markdown-tab@2.0.0-rc.128_@vuepress+bundler-vite@2.0.0-rc.28_@types+node@25._2nvnus7wh45asm3ljqhujbjyvy/node_modules/@vuepress/plugin-markdown-tab/dist/client/components/CodeTabs.js";
import { Tabs } from "/home/runner/work/xiezhrspace/xiezhrspace/docs/node_modules/.pnpm/@vuepress+plugin-markdown-tab@2.0.0-rc.128_@vuepress+bundler-vite@2.0.0-rc.28_@types+node@25._2nvnus7wh45asm3ljqhujbjyvy/node_modules/@vuepress/plugin-markdown-tab/dist/client/components/Tabs.js";

export default {
  enhance: ({ app }) => {
    app.component("CodeTabs", CodeTabs);
    app.component("Tabs", Tabs);
  },
};
