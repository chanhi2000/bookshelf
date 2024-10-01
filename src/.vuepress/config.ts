import { defineUserConfig } from "vuepress";
import { getDirname, path } from 'vuepress/utils'
import { viteBundler } from '@vuepress/bundler-vite'
import { visualizer } from "rollup-plugin-visualizer"

/* plugins 3rd-party */
import MdDefinePlugin from 'vuepress-plugin-markdown-define2';

import theme from "./theme.js";

const __dirname = getDirname(import.meta.url)
const { description, version } = require('../../package.json')
const CONSTS = {
  __VERSION__: version
}

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
  cache: '.vuepress/.cache',
  bundler: viteBundler({
    viteOptions: {
      plugins: [ 
        visualizer({ 
          emitFile: true, // Automatically open the report in the browser
          filename: 'stats.html' // Output filename
        })
      ],
      /* 
      optimizeDeps: {
        include: ['reveal.js']
      },
      */
      build: {
        // minify: false,
        // sourcemap: false,
        chunkSizeWarningLimit: 1200,
        /* 
        rollupOptions: {
          external: ['vue'],
          output: {
            manualChunks(id) {
              // Chunk for searchIndex.js related to @vuepress/plugin-search
              if (id.includes('useSearchIndex')) {
                return 'searchIndex'; // This will create a chunk named 'searchIndex.js'
              }
  
              // Example: Chunk for JSX components (from previous example)
              if (id.includes('jsx')) {
                return 'jsxComponents';
              }
  
              // Example: Chunk for charting libraries
              if (id.includes('chart.js') || id.includes('echarts')) {
                return 'chartLibs';
              }
  
              // Example: Chunk for video libraries
              if (id.includes('dashjs') || id.includes('hls.js')) {
                return 'videoLibs';
              }
  
              // Example: Chunk for mermaid library
              if (id.includes('mermaid')) {
                return 'mermaidLib';
              }
  
              // Default vendor chunk for any node_modules dependency
              if (id.includes('node_modules')) {
                return 'vendor';
              }
            }
          },
        },
        */
      },
    }
  }),
  theme,
  plugins: [
    MdDefinePlugin(CONSTS),
  ],
  // Enable it with pwa
  // shouldPrefetch: false,
  extendsPage: (page) => {
  
  },
});
