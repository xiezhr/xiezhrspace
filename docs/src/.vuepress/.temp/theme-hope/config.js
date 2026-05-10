import { Layout, NotFound, injectDarkMode, setupDarkMode, setupSidebarItems, scrollPromise } from "E:/xiezhrspace/docs/node_modules/.pnpm/vuepress-theme-hope@2.0.0-r_028960f14be4a7245b28b4a2cef5b73e/node_modules/vuepress-theme-hope/dist/bundle/exports/base.js";

import { defineCatalogInfoGetter } from "E:/xiezhrspace/docs/node_modules/.pnpm/@vuepress+plugin-catalog@2._ddcbb389ad28686563118ec7a0854df5/node_modules/@vuepress/plugin-catalog/dist/client/index.js"
import { h } from "vue"
import { resolveComponent } from "vue"
import { Blog, BloggerInfo, SocialMedias, setupBlog } from "E:/xiezhrspace/docs/node_modules/.pnpm/vuepress-theme-hope@2.0.0-r_028960f14be4a7245b28b4a2cef5b73e/node_modules/vuepress-theme-hope/dist/bundle/exports/blog.js";
import "E:/xiezhrspace/docs/node_modules/.pnpm/vuepress-theme-hope@2.0.0-r_028960f14be4a7245b28b4a2cef5b73e/node_modules/vuepress-theme-hope/dist/client/styles/blog/layout.scss";
import { GlobalEncrypt, LocalEncrypt } from "E:/xiezhrspace/docs/node_modules/.pnpm/vuepress-theme-hope@2.0.0-r_028960f14be4a7245b28b4a2cef5b73e/node_modules/vuepress-theme-hope/dist/bundle/exports/encrypt.js";

import "E:/xiezhrspace/docs/node_modules/.pnpm/@vuepress+helper@2.0.0-rc.1_123bc4d10ee3d13a72f8341eb354d53e/node_modules/@vuepress/helper/dist/client/styles/colors.css";
import "E:/xiezhrspace/docs/node_modules/.pnpm/@vuepress+helper@2.0.0-rc.1_123bc4d10ee3d13a72f8341eb354d53e/node_modules/@vuepress/helper/dist/client/styles/normalize.css";
import "E:/xiezhrspace/docs/node_modules/.pnpm/@vuepress+helper@2.0.0-rc.1_123bc4d10ee3d13a72f8341eb354d53e/node_modules/@vuepress/helper/dist/client/styles/sr-only.css";
import "E:/xiezhrspace/docs/node_modules/.pnpm/vuepress-theme-hope@2.0.0-r_028960f14be4a7245b28b4a2cef5b73e/node_modules/vuepress-theme-hope/dist/client/styles/index.scss";

defineCatalogInfoGetter((meta) => {
  const title = meta.title;
  const shouldIndex = meta.index ?? true;
  const icon = meta.icon;

  return shouldIndex ? {
    title,
    content: icon ? () =>[h(resolveComponent("VPIcon"), { icon, sizing: "both" }), title] : null,
    order: meta.order,
    index: meta.index,
  } : null;
});

export default {
  enhance: ({ app, router }) => {
    const { scrollBehavior } = router.options;

    router.options.scrollBehavior = async (...args) => {
      await scrollPromise.wait();

      return scrollBehavior(...args);
    };

    // inject global properties
    injectDarkMode(app);

    app.component("BloggerInfo", BloggerInfo);
    app.component("SocialMedias", SocialMedias);
    app.component("GlobalEncrypt", GlobalEncrypt);
    app.component("LocalEncrypt", LocalEncrypt);
  },
  setup: () => {
    setupDarkMode();
    setupSidebarItems();
    setupBlog();
  },
  layouts: {
    Layout,
    NotFound,
    Blog,
  }
};
