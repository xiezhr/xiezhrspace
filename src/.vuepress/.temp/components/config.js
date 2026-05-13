import { hasGlobalComponent } from "/home/runner/work/xiezhrspace/xiezhrspace/docs/node_modules/.pnpm/@vuepress+helper@2.0.0-rc.128_@vuepress+bundler-vite@2.0.0-rc.28_@types+node@25.6.0_@vue+comp_5ttgedcl2yxk3ksleo6uooqp4y/node_modules/@vuepress/helper/dist/client/index.js";
import Badge from "/home/runner/work/xiezhrspace/xiezhrspace/docs/node_modules/.pnpm/vuepress-plugin-components@2.0.0-rc.106_@vuepress+bundler-vite@2.0.0-rc.28_@types+node@25.6.0_pq7wvb6k5gvhai4k5g2vwkvxi4/node_modules/vuepress-plugin-components/dist/client/components/Badge.js";
import VPCard from "/home/runner/work/xiezhrspace/xiezhrspace/docs/node_modules/.pnpm/vuepress-plugin-components@2.0.0-rc.106_@vuepress+bundler-vite@2.0.0-rc.28_@types+node@25.6.0_pq7wvb6k5gvhai4k5g2vwkvxi4/node_modules/vuepress-plugin-components/dist/client/components/VPCard.js";

import "/home/runner/work/xiezhrspace/xiezhrspace/docs/node_modules/.pnpm/@vuepress+helper@2.0.0-rc.128_@vuepress+bundler-vite@2.0.0-rc.28_@types+node@25.6.0_@vue+comp_5ttgedcl2yxk3ksleo6uooqp4y/node_modules/@vuepress/helper/dist/client/styles/sr-only.css";

export default {
  enhance: ({ app }) => {
    if(!hasGlobalComponent("Badge")) app.component("Badge", Badge);
    if(!hasGlobalComponent("VPCard")) app.component("VPCard", VPCard);
    
  },
  setup: () => {

  },
  rootComponents: [

  ],
};
