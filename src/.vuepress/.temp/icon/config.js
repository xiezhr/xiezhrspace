import { hasGlobalComponent } from "/home/runner/work/xiezhrspace/xiezhrspace/docs/node_modules/.pnpm/@vuepress+helper@2.0.0-rc.128_@vuepress+bundler-vite@2.0.0-rc.28_@types+node@25.6.0_@vue+comp_5ttgedcl2yxk3ksleo6uooqp4y/node_modules/@vuepress/helper/dist/client/index.js";
import { useScriptTag } from "/home/runner/work/xiezhrspace/xiezhrspace/docs/node_modules/.pnpm/@vueuse+core@14.3.0_vue@3.5.33/node_modules/@vueuse/core/dist/index.js";
import { h } from "vue";
import { VPIcon } from "/home/runner/work/xiezhrspace/xiezhrspace/docs/node_modules/.pnpm/@vuepress+plugin-icon@2.0.0-rc.128_@vuepress+bundler-vite@2.0.0-rc.28_@types+node@25.6.0_@vue_hva6th7t3vcplkfloeapqggmom/node_modules/@vuepress/plugin-icon/dist/client/index.js"

export default {
  enhance: ({ app }) => {
    if(!hasGlobalComponent("VPIcon")) {
      app.component(
        "VPIcon",
        (props) =>
          h(VPIcon, {
            type: "iconify",
            prefix: "fa6-solid:",
            ...props,
          })
      )
    }
  },
  setup: () => {
    useScriptTag(`https://cdn.jsdelivr.net/npm/iconify-icon@2`);
  },
}
