
import { DocSearch, injectDocSearchConfig } from "/home/runner/work/xiezhrspace/xiezhrspace/docs/node_modules/.pnpm/@vuepress+plugin-docsearch@2.0.0-rc.128_@vuepress+bundler-vite@2.0.0-rc.28_@types+node@25.6.0_cztfnq7fnnxletapl5sj3ms6di/node_modules/@vuepress/plugin-docsearch/dist/client/index.js"
import '/home/runner/work/xiezhrspace/xiezhrspace/docs/node_modules/.pnpm/@docsearch+css@4.6.3/node_modules/@docsearch/css/dist/style.css'
import '/home/runner/work/xiezhrspace/xiezhrspace/docs/node_modules/.pnpm/@vuepress+plugin-docsearch@2.0.0-rc.128_@vuepress+bundler-vite@2.0.0-rc.28_@types+node@25.6.0_cztfnq7fnnxletapl5sj3ms6di/node_modules/@vuepress/plugin-docsearch/dist/client/styles/docsearch.css'
import '/home/runner/work/xiezhrspace/xiezhrspace/docs/node_modules/.pnpm/@vuepress+plugin-docsearch@2.0.0-rc.128_@vuepress+bundler-vite@2.0.0-rc.28_@types+node@25.6.0_cztfnq7fnnxletapl5sj3ms6di/node_modules/@vuepress/plugin-docsearch/dist/client/styles/vars.css'

export default {
  enhance({ app }) {
    injectDocSearchConfig(app)
    app.component('SearchBox', DocSearch)
  },
}
