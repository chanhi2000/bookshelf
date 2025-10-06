import { defineUserConfig } from "vuepress";
import { getDirname, path } from 'vuepress/utils'
import { viteBundler } from '@vuepress/bundler-vite'
import { visualizer } from "rollup-plugin-visualizer"

/* plugins V2 */
import { registerComponentsPlugin } from '@vuepress/plugin-register-components';
import { markdownImagePlugin } from '@vuepress/plugin-markdown-image';

/* plugins 3rd-party */
import MdDefinePlugin from 'vuepress-plugin-markdown-define2';

import theme from "./theme.js";

const __dirname = getDirname(import.meta.url)
// const { description, version } = require('../../package.json')
import { description, version } from '../../package.json';
const CONSTS = {
  __VERSION__: version
}

const imgLogoPath = '/bookshelf/assets/icon/favicon.svg'

export default defineUserConfig({
  clientConfigFile: path.resolve(__dirname, './client.ts'),
  define: {
    __BLOG_VERSION__: version, // reveal.js에서 같은 변수를 사용함으로 이름이 겹치지 않도록 정의
    __IS_DEBUG__: process.env.IS_DEBUG ?? false,
  },
  lang: "en-US",
  base: "/bookshelf/",
  title: "📚Bookshelf",
  description: description,
  head: [['link', { rel: 'icon', href: imgLogoPath }]],
  cache: 'docs/freecodecamp-org/src/.vuepress/.cache',
  bundler: viteBundler({
    viteOptions: {
      build: {
        // minify: false,
        // sourcemap: false,
        chunkSizeWarningLimit: 1500,
        rollupOptions: {
          output: {
            manualChunks(id) {
              // Core VuePress and Theme Framework (keep these together if possible, but minimal)
              /* 
              if (
                id.includes('node_modules/vue/') ||
                id.includes('node_modules/vue-router/') ||
                id.includes('node_modules/vuepress/') || // Core VuePress
                id.includes('node_modules/@vuepress/') || // All @vuepress/* packages
                id.includes('node_modules/vuepress-theme-hope/') ||
                id.includes('node_modules/vuepress-shared/') || // vuepress-theme-hope dependency
                id.includes('node_modules/vuepress-plugin-components/') || // vuepress-theme-hope dependency
                id.includes('node_modules/vuepress-plugin-md-enhance/') // vuepress-theme-hope dependency
              ) {
                return 'vuepress-core-framework'; // A robust chunk for the essential framework
              }

              // === Highly interactive / Large Libraries - Give them their OWN dedicated chunks ===
              // These are known to be large and often come with their own environments
              if (id.includes('node_modules/sandpack-vue3/')) {
                return 'sandpack-vue3-lib';
              }
              if (id.includes('node_modules/@vue/repl/')) {
                return 'vue-repl-lib';
              }
              if (id.includes('node_modules/kotlin-playground/')) {
                return 'kotlin-playground-lib';
              }

              // === Diagramming Libraries - Often heavy ===
              if (id.includes('node_modules/mermaid/')) {
                return 'mermaid-lib';
              }
              if (id.includes('node_modules/flowchart.ts/')) {
                return 'flowchart-lib';
              }

              // === Charting Libraries - Can be very large ===
              if (id.includes('node_modules/chart.js/')) { // Chart.js itself
                return 'chartjs-lib';
              }
              if (id.includes('node_modules/echarts/')) { // Echarts itself
                return 'echarts-lib';
              }

              // === Video Streaming Libraries - Definitely large ===
              if (id.includes('node_modules/dashjs/')) {
                return 'dashjs-lib';
              }
              if (id.includes('node_modules/hls.js/')) {
                return 'hlsjs-lib';
              }
              if (id.includes('node_modules/vidstack/')) {
                return 'vidstack-lib';
              }

              // === Other potential large generic utilities ===
              // axios and @vueuse/core are not typically huge, but if your stats.html shows them as significant,
              // you could chunk them. For now, let's leave them in a general vendor.
              // if (id.includes('node_modules/axios/')) {
              //   return 'axios-lib';
              // }
              // if (id.includes('node_modules/@vueuse/core/')) {
              //   return 'vueuse-lib';
              // }

              // === General Vendor Fallback ===
              // All other node_modules that aren't specifically chunked above
              if (id.includes('node_modules')) {
                return 'vendor'; // This should now be significantly smaller
              }

              // VuePress theme specific styles and assets (if they end up in JS chunks)
              if (id.includes(path.resolve(__dirname, './styles/'))) {
                return 'theme-styles';
              } */

            }
          }
        }
      },
      plugins: [ 
        visualizer({ 
          emitFile: true, // Automatically open the report in the browser
          filename: 'stats.html', // Output filename
          open: true,
        })
      ],
    }
  }),
  theme,
  plugins: [
    registerComponentsPlugin({
      componentsDir: path.resolve(__dirname, '../../shared/src/components'),
    }),
    MdDefinePlugin(CONSTS),
  ],
  // Enable it with pwa
  shouldPrefetch: false,
  shouldPreload: false,
  extendsPage: (page) => {
  
  },
});
