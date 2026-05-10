import { hasGlobalComponent } from "E:/xiezhrspace/docs/node_modules/.pnpm/@vuepress+helper@2.0.0-rc.1_123bc4d10ee3d13a72f8341eb354d53e/node_modules/@vuepress/helper/dist/client/index.js";
import { useScriptTag } from "E:/xiezhrspace/docs/node_modules/.pnpm/@vueuse+core@14.3.0_vue@3.5.33/node_modules/@vueuse/core/dist/index.js";
import { h } from "vue";
import { VPIcon } from "E:/xiezhrspace/docs/node_modules/.pnpm/@vuepress+plugin-icon@2.0.0_991d2f5cd93af5ec7ad20b151ed12bbf/node_modules/@vuepress/plugin-icon/dist/client/index.js"

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
