import CodeDemo from "/home/runner/work/xiezhrspace/xiezhrspace/docs/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-rc.106_@vuepress+bundler-vite@2.0.0-rc.28_@types+node@25.6.0_awxi3wa5or5ozyluawtrkyprbi/node_modules/vuepress-plugin-md-enhance/dist/client/components/CodeDemo.js";
import MdDemo from "/home/runner/work/xiezhrspace/xiezhrspace/docs/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-rc.106_@vuepress+bundler-vite@2.0.0-rc.28_@types+node@25.6.0_awxi3wa5or5ozyluawtrkyprbi/node_modules/vuepress-plugin-md-enhance/dist/client/components/MdDemo.js";

export default {
  enhance: ({ app }) => {
    app.component("CodeDemo", CodeDemo);
    app.component("MdDemo", MdDemo);
  },
};
