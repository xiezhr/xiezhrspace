import CodeDemo from "E:/xiezhrspace/docs/node_modules/.pnpm/vuepress-plugin-md-enhance@_cad825f014f3e5f63c4aac777f0879ae/node_modules/vuepress-plugin-md-enhance/dist/client/components/CodeDemo.js";
import MdDemo from "E:/xiezhrspace/docs/node_modules/.pnpm/vuepress-plugin-md-enhance@_cad825f014f3e5f63c4aac777f0879ae/node_modules/vuepress-plugin-md-enhance/dist/client/components/MdDemo.js";

export default {
  enhance: ({ app }) => {
    app.component("CodeDemo", CodeDemo);
    app.component("MdDemo", MdDemo);
  },
};
