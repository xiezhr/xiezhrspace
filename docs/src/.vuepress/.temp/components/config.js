import { hasGlobalComponent } from "E:/xiezhrspace/docs/node_modules/.pnpm/@vuepress+helper@2.0.0-rc.1_123bc4d10ee3d13a72f8341eb354d53e/node_modules/@vuepress/helper/dist/client/index.js";
import Badge from "E:/xiezhrspace/docs/node_modules/.pnpm/vuepress-plugin-components@_a69b7b91fc10c6ac748fff2935fbdca4/node_modules/vuepress-plugin-components/dist/client/components/Badge.js";
import VPCard from "E:/xiezhrspace/docs/node_modules/.pnpm/vuepress-plugin-components@_a69b7b91fc10c6ac748fff2935fbdca4/node_modules/vuepress-plugin-components/dist/client/components/VPCard.js";

import "E:/xiezhrspace/docs/node_modules/.pnpm/@vuepress+helper@2.0.0-rc.1_123bc4d10ee3d13a72f8341eb354d53e/node_modules/@vuepress/helper/dist/client/styles/sr-only.css";

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
