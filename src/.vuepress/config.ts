import { defineUserConfig } from "vuepress";
import { addViteOptimizeDepsInclude } from "@vuepress/helper";
import { getDirname, path } from 'vuepress/utils'

import { registerComponentsPlugin } from '@vuepress/plugin-register-components';

/* plugins 3rd-party */
import MdDefinePlugin from 'vuepress-plugin-markdown-define2';

import theme from "./theme";

const __dirname = getDirname(import.meta.url)
// const { description, version } = require('../../package.json')
import { description, version } from '../../package.json';
const CONSTS = {
  __VERSION__: version
}

const imgLogoPath = '/bookshelf/assets/icon/favicon.svg'

export default defineUserConfig({
  base: "/bookshelf/",
  dest: "./dist",
  head: [['link', { rel: 'icon', href: imgLogoPath }]],
  lang: "en-US",
  define: {
    __BLOG_VERSION__: version, // reveal.js에서 같은 변수를 사용함으로 이름이 겹치지 않도록 정의
    __IS_DEBUG__: process.env.IS_DEBUG ?? false,
  },
  extendsBundlerOptions: (bundlerOptions: unknown, app): void => {
    addViteOptimizeDepsInclude(bundlerOptions, app, [
      "three",
      "three/examples/jsm/controls/OrbitControls",
      "three/examples/jsm/loaders/STLLoader",
    ]);
  },
  title: "📚Bookshelf",
  description: description,
  theme,
  plugins: [
    registerComponentsPlugin({
      componentsDir: path.resolve(__dirname, '../../shared/src/components'),
    }),
    MdDefinePlugin(CONSTS),
  ],
  shouldPrefetch: false,
  shouldPreload: false,
  clientConfigFile: path.resolve(__dirname, './client.ts'),
  extendsPage: (page) => {
  
  },
});
