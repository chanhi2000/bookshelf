import type { UserConfig } from "vuepress";
import { defineUserConfig } from "vuepress";
import { addViteOptimizeDepsInclude } from "@vuepress/helper";
import { getDirname, path } from 'vuepress/utils'

/*
import { registerComponentsPlugin } from '@vuepress/plugin-register-components';
import MdDefinePlugin from 'vuepress-plugin-markdown-define2';
const { description, version } = require('../../package.json')
const CONSTS = {
  __VERSION__: version
}
*/
const __dirname = getDirname(import.meta.url)

const imgLogoPath = '/bookshelf/assets/icon/favicon.svg'

export const config = (
  name: string,
  config: UserConfig,
): UserConfig => {
  const base = name.replace(/\d+$/, "");
  const docsBase = !!base
      ? (`/bookshelf/${base}/` as `/${string}/`)
      : "/bookshelf/";

  return defineUserConfig({
    // base: "/bookshelf/",
    base: docsBase,
    dest: "./dist",
    head: [['link', { rel: 'icon', href: imgLogoPath }]],
    lang: "en-US",
    /* extendsBundlerOptions: (bundlerOptions: unknown, app): void => {
      addViteOptimizeDepsInclude(bundlerOptions, app, [
        "three",
        "three/examples/jsm/controls/OrbitControls",
        "three/examples/jsm/loaders/STLLoader",
      ]);
    }, */
    title: "📚Bookshelf",
    // theme,
    plugins: [
      /* registerComponentsPlugin({
        componentsDir: path.resolve(__dirname, '../../shared/src/components'),
      }),
      MdDefinePlugin(CONSTS), */
    ],
    shouldPrefetch: false,
    shouldPreload: false,
    clientConfigFile: path.resolve(__dirname, './client.js'),

    ...config,
  });
};