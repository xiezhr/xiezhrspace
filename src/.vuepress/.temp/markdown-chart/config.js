import { defineClientConfig } from "vuepress/client";
import ChartJS from "/home/runner/work/xiezhrspace/xiezhrspace/docs/node_modules/.pnpm/@vuepress+plugin-markdown-chart@2.0.0-rc.128_@vuepress+bundler-vite@2.0.0-rc.28_@types+node@2_prwdx6j3vjwj66e3j55alvymyi/node_modules/@vuepress/plugin-markdown-chart/dist/client/components/ChartJS.js";
import ECharts from "/home/runner/work/xiezhrspace/xiezhrspace/docs/node_modules/.pnpm/@vuepress+plugin-markdown-chart@2.0.0-rc.128_@vuepress+bundler-vite@2.0.0-rc.28_@types+node@2_prwdx6j3vjwj66e3j55alvymyi/node_modules/@vuepress/plugin-markdown-chart/dist/client/components/ECharts.js";
import FlowChart from "/home/runner/work/xiezhrspace/xiezhrspace/docs/node_modules/.pnpm/@vuepress+plugin-markdown-chart@2.0.0-rc.128_@vuepress+bundler-vite@2.0.0-rc.28_@types+node@2_prwdx6j3vjwj66e3j55alvymyi/node_modules/@vuepress/plugin-markdown-chart/dist/client/components/FlowChart.js";
import MarkMap from "/home/runner/work/xiezhrspace/xiezhrspace/docs/node_modules/.pnpm/@vuepress+plugin-markdown-chart@2.0.0-rc.128_@vuepress+bundler-vite@2.0.0-rc.28_@types+node@2_prwdx6j3vjwj66e3j55alvymyi/node_modules/@vuepress/plugin-markdown-chart/dist/client/components/MarkMap.js";
import Mermaid from "/home/runner/work/xiezhrspace/xiezhrspace/docs/node_modules/.pnpm/@vuepress+plugin-markdown-chart@2.0.0-rc.128_@vuepress+bundler-vite@2.0.0-rc.28_@types+node@2_prwdx6j3vjwj66e3j55alvymyi/node_modules/@vuepress/plugin-markdown-chart/dist/client/components/Mermaid.js";

export default defineClientConfig({
  enhance: ({ app }) => {
    app.component("ChartJS", ChartJS)
    app.component("ECharts", ECharts);
    app.component("FlowChart", FlowChart);
    app.component("MarkMap", MarkMap);
    app.component("Mermaid", Mermaid);
  },
});
