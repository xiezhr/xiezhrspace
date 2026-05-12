import { hopeTheme } from "vuepress-theme-hope";

import navbar from "./navbar.js";
import sidebar from "./sidebar/index.js";

export default hopeTheme({
  hostname: "https://vuepress-theme-hope-docs-demo.netlify.app",

  //全屏按钮
  fullscreen: true,

  author: {
    name: "程序员晓凡",
    url: "http://docs.xiezhrspace.cn/",
  },

  logo: "/logo.png",

  repo: "vuepress-theme-hope/vuepress-theme-hope",

  docsDir: "src",

  // 导航栏
  navbar,

  // 侧边栏
  sidebar,

  // 页脚
  footer: "",
  displayFooter: true,

  copyright: "基于 MIT 协议，© 2019-至今 xiezhr",

  blog: {
          description: "爱学习 爱生活 把分享变成一种习惯 即使再小的帆也能扬帆远航           每一个“1” 都是“∞”的开始 每一行代码，每一次创新，每一步前行，终将抵达最好的我们！",
          intro: "/about/",
          medias: {
            GitHub: "https://github.com/xiezhr",
            BiliBili: "https://space.bilibili.com/305330347",
            QQ: "http://wpa.qq.com/msgrd?v=3&uin=1666397814&site=qq&menu=yes",
            Zhihu: "https://www.zhihu.com/people/rong-xie-49-35",
            Gitee: "https://gitee.com/xiezhr",
            Wechat: "xiezhr", 
            CSDN: {
              // 图标地址
              icon: "https://blog.xiezhrspace.cn/blog-img/csdn.png",
              // 链接 
              link: "https://blog..net/rong09_13?type=blog",
            },
            CNBLOG: {
              // 图标地址
              icon: "https://blog.xiezhrspace.cn/blog-img/cnlob.png",
              // 链接 
              link: "https://www.cnblogs.com/xiezhr",
            },

          },
  },

  // 加密配置
  encrypt: {
    config: {
      "/demo/encrypt.html": {
        hint: "Password: 1234",
        password: "1234",
      },
    },
  },

  // 多语言配置
  metaLocales: {
    editLink: "在 GitHub 上编辑此页",
  },

  // 如果想要实时查看任何改变，启用它。注: 这对更新性能有很大负面影响
  // hotReload: true,

  // 此处开启了很多功能用于演示，你应仅保留用到的功能。
  markdown: {
    align: true,
    attrs: true,
    codeTabs: true,
    component: true,
    demo: true,
    figure: true,
    gfm: true,
    imgLazyload: true,
    imgSize: true,
    include: true,
    mark: true,
    plantuml: true,
    spoiler: true,
    stylize: [
      {
        matcher: "Recommended",
        replacer: ({ tag }) => {
          if (tag === "em") {
            return {
              tag: "Badge",
              attrs: { type: "tip" },
              content: "Recommended",
            };
          }
        },
      },
    ],
    sub: true,
    sup: true,
    tabs: true,
    tasklist: true,
    vPre: true,

    // 取消注释它们如果你需要 TeX 支持
    // math: {
    //   // 启用前安装 katex
    //   type: "katex",
    //   // 或者安装 @mathjax/src
    //   type: "mathjax",
    // },

    // 如果你需要幻灯片，安装 @vuepress/plugin-revealjs 并取消下方注释
    // revealjs: {
    //   plugins: ["highlight", "math", "search", "notes", "zoom"],
    // },

    // 在启用之前安装 chart.js
    // chartjs: true,

    // insert component easily

    // 在启用之前安装 echarts
    // echarts: true,

    // 在启用之前安装 flowchart.ts
    // flowchart: true,

    // 在启用之前安装 mermaid
    // mermaid: true,

    // playground: {
    //   presets: ["ts", "vue"],
    // },

    // 在启用之前安装 @vue/repl
    // vuePlayground: true,

    // 在启用之前安装 sandpack-vue3
    // sandpack: true,
  },

  // 在这里配置主题提供的插件
  plugins: {
    comment: {
      provider: "Giscus",
      repo: "xiezhr/xiezhrspace",
      repoId: "R_kgDOSZYCOg",
      category: "General",
      categoryId: "DIC_kwDOSZYCOs4C831k",
      mapping: "pathname",
      strict: false,
      reactionsEnabled: true,
      inputPosition: "bottom",
      lightTheme: "light",
      darkTheme: "dark",
      locales: {
        "/": {
          placeholder: "欢迎评论",
        },
      },
    },

    components: {
      components: ["Badge", "VPCard"],
    },
    //版权信息
     copyright: {
      author: "xiezhr",
      license: "MIT",

      // 当复制的内容长度不小于 40 时，追加版权信息
      triggerLength: 40,
      // 禁用复制
      disableCopy: true,
      // 禁用选择
      // disableSelection: true,
    },
    //水印
    watermark: {
      watermarkOptions: {
        content: "程序员晓凡",
        movable: false,
        // 其他选项
        width: 500,
        height: 500,
        opacity: 0.9,
      },
    },

    blog: true,

    icon: {
      prefix: "fa6-solid:",
    },

    // 如果你需要 PWA。安装 @vuepress/plugin-pwa 并取消下方注释
    // pwa: {
    //   favicon: "/favicon.ico",
    //   cacheHTML: true,
    //   cacheImage: true,
    //   appendBase: true,
    //   apple: {
    //     icon: "/assets/icon/apple-icon-152.png",
    //     statusBarColor: "black",
    //   },
    //   msTile: {
    //     image: "/assets/icon/ms-icon-144.png",
    //     color: "#ffffff",
    //   },
    //   manifest: {
    //     icons: [
    //       {
    //         src: "/assets/icon/chrome-mask-512.png",
    //         sizes: "512x512",
    //         purpose: "maskable",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-mask-192.png",
    //         sizes: "192x192",
    //         purpose: "maskable",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-512.png",
    //         sizes: "512x512",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-192.png",
    //         sizes: "192x192",
    //         type: "image/png",
    //       },
    //     ],
    //     shortcuts: [
    //       {
    //         name: "Demo",
    //         short_name: "Demo",
    //         url: "/demo/",
    //         icons: [
    //           {
    //             src: "/assets/icon/guide-maskable.png",
    //             sizes: "192x192",
    //             purpose: "maskable",
    //             type: "image/png",
    //           },
    //         ],
    //       },
    //     ],
    //   },
    // },
  },
});
