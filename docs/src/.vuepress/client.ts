import { defineClientConfig } from "vuepress/client";
import WechatFloat from "./components/WechatFloat.vue";
import WechatGroupBtn from "./components/WechatGroupBtn.vue";

export default defineClientConfig({
  enhance({ app }) {
    app.component("WechatFloat", WechatFloat);
    app.component("WechatGroupBtn", WechatGroupBtn);
  },
});
