import { /* addViteSsrNoExternal, */ config } from "@bookshelf/shared-vuepress";
import { getDirname, path } from 'vuepress/utils'
const __dirname = getDirname(import.meta.url)

import { registerComponentsPlugin } from '@vuepress/plugin-register-components';
import MdDefinePlugin from 'vuepress-plugin-markdown-define2';
import { description, version } from '../../package.json';
// const { description, version } = require('../../package.json')
const CONSTS = {
  __VERSION__: version
}

import theme from "./theme";

export default config("tecmint.com", {
  define: {
    __BLOG_VERSION__: version, // reveal.js에서 같은 변수를 사용함으로 이름이 겹치지 않도록 정의
    __IS_DEBUG__: process.env.IS_DEBUG ?? false,
  },
  description: description,
  // cache: 'docs/freecodecamp-org/src/.vuepress/.cache',
  plugins: [
    registerComponentsPlugin({
      componentsDir: path.resolve(__dirname, '../../shared/src/components'),
    }),
    MdDefinePlugin(CONSTS),
  ],
  theme,
})
