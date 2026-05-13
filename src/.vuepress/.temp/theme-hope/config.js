import { Layout, NotFound, injectDarkMode, setupDarkMode, setupSidebarItems, scrollPromise } from "/home/runner/work/xiezhrspace/xiezhrspace/docs/node_modules/.pnpm/vuepress-theme-hope@2.0.0-rc.106_7e8f9d73bf0185363cd33327c850081e/node_modules/vuepress-theme-hope/dist/bundle/exports/base.js";

import { defineCatalogInfoGetter } from "/home/runner/work/xiezhrspace/xiezhrspace/docs/node_modules/.pnpm/@vuepress+plugin-catalog@2.0.0-rc.128_@vuepress+bundler-vite@2.0.0-rc.28_@types+node@25.6.0_@_kh7sf2lpuqeucmypovxxdhsgkq/node_modules/@vuepress/plugin-catalog/dist/client/index.js"
import { h } from "vue"
import { resolveComponent } from "vue"
import { Blog, BloggerInfo, SocialMedias, setupBlog } from "/home/runner/work/xiezhrspace/xiezhrspace/docs/node_modules/.pnpm/vuepress-theme-hope@2.0.0-rc.106_7e8f9d73bf0185363cd33327c850081e/node_modules/vuepress-theme-hope/dist/bundle/exports/blog.js";
import "/home/runner/work/xiezhrspace/xiezhrspace/docs/node_modules/.pnpm/vuepress-theme-hope@2.0.0-rc.106_7e8f9d73bf0185363cd33327c850081e/node_modules/vuepress-theme-hope/dist/client/styles/blog/layout.scss";
import { GlobalEncrypt, LocalEncrypt } from "/home/runner/work/xiezhrspace/xiezhrspace/docs/node_modules/.pnpm/vuepress-theme-hope@2.0.0-rc.106_7e8f9d73bf0185363cd33327c850081e/node_modules/vuepress-theme-hope/dist/bundle/exports/encrypt.js";

import "/home/runner/work/xiezhrspace/xiezhrspace/docs/node_modules/.pnpm/@vuepress+helper@2.0.0-rc.128_@vuepress+bundler-vite@2.0.0-rc.28_@types+node@25.6.0_@vue+comp_5ttgedcl2yxk3ksleo6uooqp4y/node_modules/@vuepress/helper/dist/client/styles/colors.css";
import "/home/runner/work/xiezhrspace/xiezhrspace/docs/node_modules/.pnpm/@vuepress+helper@2.0.0-rc.128_@vuepress+bundler-vite@2.0.0-rc.28_@types+node@25.6.0_@vue+comp_5ttgedcl2yxk3ksleo6uooqp4y/node_modules/@vuepress/helper/dist/client/styles/normalize.css";
import "/home/runner/work/xiezhrspace/xiezhrspace/docs/node_modules/.pnpm/@vuepress+helper@2.0.0-rc.128_@vuepress+bundler-vite@2.0.0-rc.28_@types+node@25.6.0_@vue+comp_5ttgedcl2yxk3ksleo6uooqp4y/node_modules/@vuepress/helper/dist/client/styles/sr-only.css";
import "/home/runner/work/xiezhrspace/xiezhrspace/docs/node_modules/.pnpm/vuepress-theme-hope@2.0.0-rc.106_7e8f9d73bf0185363cd33327c850081e/node_modules/vuepress-theme-hope/dist/client/styles/index.scss";

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
